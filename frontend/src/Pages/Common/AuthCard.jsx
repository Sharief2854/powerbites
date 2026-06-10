import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

function AuthCard({ title, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 3 },
          }}
        >
          <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          >
            {title}
        </Typography>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
}

export default AuthCard;
