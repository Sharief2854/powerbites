import { enqueueSnackbar, SnackbarProvider } from "notistack";
import api from "../../../api/axiosConfig";
import { PrimaryButton } from "../../../Components/Common/Buttons";
import { replace } from "react-router-dom";

export default function PaymentButton({
  amount,
  addressId,
  coupon_id = "",
}) {
  const handlePayment = async () => {
    try {
      const { data: order } = await api.post(
        "/payment/create-order",
        {
          amount
        }
      );

      const options = {
        key: "rzp_test_T2CRpgA1UJwni6",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Powerbites",
        description: "Order Payment",

        handler: async function (response) {
          try {
            const { data } = await api.post(
              "/payment/verify-payment",
              {
                ...response,
                amount,
                addressId,
                coupon_id,
              }
            );

            if (data.success) {
              navigate('/customer/orderlist',{replace:true})
              enqueueSnackbar(
                "Payment successful",
                {
                  variant: "success",
                }
              );
            } else {
              enqueueSnackbar(
                "Payment verification failed",
                {
                  variant: "error",
                }
              );
            }
          } catch (error) {
            console.error(error);

            enqueueSnackbar(
              "Payment verification failed",
              {
                variant: "error",
              }
            );
          }
        },        
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error(response.error);

        enqueueSnackbar(
          response.error.description ||
            "Payment failed",
          {
            variant: "error"
          }
        );
      });

      razorpay.open();
    } catch (error) {
      console.error(error);

      enqueueSnackbar(
        "Unable to initiate payment",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <>
      <SnackbarProvider/>

      <PrimaryButton
        onClick={handlePayment}
        sx={{
          mt: 3,
          maxWidth: "60%",
        }}
      >
        Pay Now
      </PrimaryButton>
    </>
  );
}