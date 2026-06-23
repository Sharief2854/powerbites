import React from 'react'

export default function AdminProductPage() {
  return (
    <div>
        <Box sx={{ width: "80%", margin: "auto", padding: "20px" }}>
        <SnackbarProvider />
        <Typography align="center" variant="h4" gutterBottom>
          Update Product Details
        </Typography>
        <Stack component="form" onSubmit={updateProducts}></Stack>
        </Box>
    </div>
  )
}
