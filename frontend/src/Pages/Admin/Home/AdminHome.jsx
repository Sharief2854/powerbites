import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'

function Overview() {
  return (
    <>
    <Grid container spacing={3}>
          {['Total Sales', 'Active Orders', 'Total Products', 'Total Revenue'].map((title, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: '20px',
                  border: '1px solid #E5E7EB',
                  bgcolor: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 25px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#1E1154',fontSize:{xs:10,sm:30} }}>
                  {index === 3 ? '$24,500' : Math.floor(Math.random() * 800) + 120}
                </Typography>
                <Typography variant="caption" color="#22C55E" sx={{ fontWeight: 600 }}>
                  +12.5% from last month
                </Typography>
              </Paper>
            </Grid>
          ))}

          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: '20px',
                border: '1px solid #E5E7EB',
                bgcolor: '#ffffff',
                minHeight: '420px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1E1154' }}>
                Recent Orders
              </Typography>
              <Typography color="text.secondary">
                Your data tables, charts, or custom components will go here.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
    </>
  )
}

export default Overview