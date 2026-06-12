import { Avatar, Box, Button, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useRef, useState } from "react";
import CustomerCard from "./CustomerCard";
import api from "../../api/axiosConfig";

function CustomerProfile() {
  const [user, setUser] = useState({
    name: "suresh",
    phone: "78965412369",
    password: "********",
  });
  const [image, setImage] = useState("");

  const firstletterName = user.name.charAt(0).toUpperCase();

  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

// if (file) {
//       setImage(URL.createObjectURL(file));
//     }    
    try {
        let id = "6a2a987342fbcdfda0a5c5b0";
      const response = await api.put(
        `/updateCustomerProfile/updatePhoto/6a2a987342fbcdfda0a5c5b0`,
        formData,
      );

      console.log(response.data);
      setImage(response.data.photo);
    } catch (error) {
      console.log(error);
    // }
  };
  }
  return (
    <Box>
      <CustomerCard>
        <Box>
          <Box
           
          >
            {/* Profile Image */}
            <Box sx={{ position: "relative", width: 120, height: 120 }}>
              {/* Profile Image */}
              <Avatar
                alt={firstletterName}
                src={image}
                sx={{ width: 120, height: 120, border: "2px solid #ddd" }}
              />
              {/* Pencil Button */}
              <IconButton
                color="primary"
                onClick={handleEditClick}
                sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  backgroundColor: "#673ab7",
                  color: "white",
                  "&:hover": { backgroundColor: "#5e35b1" },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
              />
            </Box>
          </Box>
          <Box>
            <Typography>Name : {user.name}</Typography>
            <Typography>Phone : {user.phone}</Typography>
            <Typography>Password : {user.password}</Typography>
            <Typography>Address : {user.address}</Typography>
          </Box>
        </Box>
      </CustomerCard>
    </Box>
  );
}

export default CustomerProfile;
