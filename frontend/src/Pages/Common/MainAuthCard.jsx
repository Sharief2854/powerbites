import { Box, Grid } from "@mui/material";
import React from "react";

function MainAuthCard({ leftContent, rightContent }) {
  return (
    //     <Box sx={{
    //         height:'100vh',
    //         display:'flex',
    //         justifyContent:'center',
    //         alignItems:'center',
    //     }}>
    //       <Grid container spacing={0.5}
    //       sx={{
    //          width: "100%",
    //         maxWidth: 500,
    //       }}
    //       >
    //   <Grid size="grow" sx={{
    //     bgcolor:'red',
    //     p:5
    //     }}>
    //     <Box>size=grow</Box>
    //   </Grid>
    //   <Grid size="grow" sx={{bgcolor:'blue'}}>
    //     <Box>size=grow</Box>
    //   </Grid>
    // </Grid>
    //     </Box>
    <Grid
      container
      sx={{
        maxWidth: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
       
        
      }}
    >
      {/* Left Column */}
      <Grid xs={12} md={6} sx={{ display: "flex" }}>
        <Box
          sx={{
            flex: 1,
            width: "450px",
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            minHeight: 650,
            p: 2,
            bgcolor: "rgba(255, 192, 203, 0.15)", // Transparent tint style accent
            color: "white",
          }}
        >
          {leftContent}
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid xs={12} md={6} sx={{ display: "flex" }}>
        <Box
          sx={{
            flex: 1,
            width: "450px",
            minHeight: 650,
            p: 2,
            backgroundColor:'white',
          }}
        >
          {rightContent}
        </Box>
      </Grid>
    </Grid>
  );
}

export default MainAuthCard;
