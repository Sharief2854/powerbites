import { enqueueSnackbar, SnackbarProvider } from "notistack";
import api from "../../../api/axiosConfig";
import { PrimaryButton } from "../../../Components/Common/Buttons";

export default function PaymentButton({ amount }) {
  const handlePayment = async () => {
    const { data } = await api.post("/payment/create-order", {
      amount: `${amount}`,
    });

    const options = {
      key: process.env.RAZORPAY_KEY_ID,

      amount: data.amount,

      currency: "INR",

      order_id: data.id,
      handler: async function (response) {
        await api.post("/payment/verify-payment", response);
        enqueueSnackbar("payment successfull", { variant: "success" });
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();
  };

  return (
    <>
      <SnackbarProvider />
      <PrimaryButton onClick={handlePayment} sx={{ mt: 3, maxWidth: "60%" }}>
        Pay Now
      </PrimaryButton>
    </>
  );
}
