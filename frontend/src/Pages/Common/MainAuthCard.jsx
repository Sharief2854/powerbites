import { Box, Grid } from '@mui/material'
import React from 'react'

function MainAuthCard({leftContent, rightContent, spacing = 3}) {


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
    <Grid container spacing={spacing} 
    
    sx={{
        bgcolor:'green',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
        width:'100%',
        
    }}
    >
      {/* Left Column */}
      <Grid  xs={12} md={6} sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' ,bgcolor:'pink'}}>
          {leftContent}
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid  xs={12} md={6} sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%',bgcolor:'blue' }}>
         {rightContent}
        </Box>
      </Grid>
    </Grid>
  )
}

export default MainAuthCard
