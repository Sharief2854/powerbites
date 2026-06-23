import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../Components/Common/Buttons";

export default function ItemCard({
  currentImage,
  addItem,
  setCurrentImage,
  imagePath,
  item,
  cartBtn,
}) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 340,
        mx: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        overflow: "hidden",
        background: "linear-gradient(180deg,#ffffff 0%,#fafbff 100%)",
        border: "1px solid #E5E7EB",
        transition: "all .3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          p: 2,
          pb: 1,
        }}
      >
        <Chip
          label={item.stock > 0 ? "In Stock" : "Out of Stock"}
          size="small"
          color={item.stock > 0 ? "success" : "error"}
          sx={{
            position: "absolute",
            zIndex: 2,
            top: 20,
            left: 20,
            fontWeight: 700,
          }}
        />

        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            gap: 1,
            borderRadius: 4,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          onScroll={(e) => {
            const index = Math.round(
              e.target.scrollLeft / e.target.clientWidth,
            );

            setCurrentImage((prev) => ({
              ...prev,
              [item._id]: index,
            }));
          }}
        >
          {item?.image?.map((img, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "100%",
                scrollSnapAlign: "center",
                height: 240,
                borderRadius: 4,
                overflow: "hidden",
                background: "#f5f5f5",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/customer/productpage/${item._id}`)}
            >
              <Box
                component="img"
                src={`${img}`}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: 1.5,
            display: "flex",
            justifyContent: "center",
            gap: 0.75,
          }}
        >
          {item.image?.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: currentImage[item._id] === index ? 15 : 8,
                height: 8,
                borderRadius: 999,
                transition: ".3s",
                backgroundColor:
                  currentImage[item._id] === index ? "#4a32aa" : "#817a7a",
              }}
            />
          ))}
        </Box>
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          px: 3,
          pt: 1,
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => navigate(`/customer/productpage/${item._id}`)}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#111827",
            textAlign: "center",
            mb: 1,
          }}
        >
          {item.name}
        </Typography>

        <Typography
          sx={{
            color: "#6B7280",
            fontSize: "0.9rem",
            textAlign: "center",
            minHeight: 60,
          }}
        >
          {item.description}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#3E1A89",
            }}
          >
            ₹{item.price}
          </Typography>
          {/* 
      <Typography
        sx={{
          color: "#9CA3AF",
          fontSize: ".85rem",
        }}
      >
        {item.stock}
      </Typography> */}
        </Box>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
          gap: 1,
          flexDirection: "column",
        }}
      >
        <PrimaryButton
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            cartBtn ? navigate("/customer/cart") : addItem(item._id);
          }}
          sx={{
            py: 1.2,
            borderRadius: 3,
            background: "linear-gradient(135deg,#3E1A89,#5A2DC7)",
          }}
        >
          {cartBtn ? "Go To Cart" : "Add To Cart"}
        </PrimaryButton>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate(`/customer/productpage/${item._id}`)}
          sx={{
            borderRadius: 3,
            py: 1.2,
            borderColor: "#3E1A89",
            color: "#3E1A89",
            fontWeight: 700,
          }}
        >
          View Product
        </Button>
      </CardActions>
    </Card>
  );
}
