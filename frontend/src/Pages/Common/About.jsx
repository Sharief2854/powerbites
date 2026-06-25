import { Box, ImageList, Stack,Button, Typography } from '@mui/material'
import * as React from 'react'
import { useEffect, useState } from 'react'
import api from '../../api/axiosConfig'
import { getInfo } from '../../Redux/Slices/AdminSlice/CompanyInfoSlice'
import { PrimaryButton } from '../../Components/Common/Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function About() {

  const [developers, setDevelopers] = useState([])
  const company = useSelector((state) => state.companyInfo.info)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const first = async () => {
    try {
      let res = await api.get("/developer")
      setDevelopers(res.data.data)
      console.log(res.data.data);
      
    } catch (error) {
      console.log(error.message)
    }
  }

  const second = async () => {
    try {
      let res = await api.get("/company/get")
      dispatch(getInfo(res.data.data))
    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
    first()
    second()
    
  }, [])
  
  return (
    <Box>
        <Box
  sx={{
    bgcolor: "#ffffff",
    minHeight: "100vh",
    py: 6,
    px: { xs: 2, md: 8 },
  }}
>
  <Box textAlign="center" mb={8}>
    <Typography
      variant="h3"
      sx={{
        color: "#3E1A89",
        fontWeight: 800,
        mb: 2,
      }}
    >
      Powerbites Enterprises
    </Typography>

    <Typography
      variant="h6"
      sx={{
        maxWidth: 800,
        mx: "auto",
        color: "#3E1A89",
        opacity: 0.8,
      }}
    >
      Delivering quality, trust, and excellence through certified
      homemade food products and customer-focused services.
    </Typography>
  </Box>

  <Box mb={8}>
    <Typography
      variant="h4"
      sx={{
        color: "#3E1A89",
        fontWeight: 700,
        mb: 3,
      }}
    >
      About Us
    </Typography>

    <Typography
      sx={{
        color: "#3E1A89",
        fontSize: "1.05rem",
        lineHeight: 1.9,
      }}
    >
      Powerbites Enterprises is committed to delivering quality food
      products while maintaining the highest standards of safety,
      hygiene, and customer satisfaction. Our mission is to provide
      authentic products backed by industry certifications and
      transparent business practices.
    </Typography>
  </Box>

  <Box mb={8}>
    <Typography
      variant="h4"
      sx={{
        color: "#3E1A89",
        fontWeight: 700,
        mb: 3,
      }}
    >
      Certifications & Compliance
    </Typography>

    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      {company?.certification?.map((cert) => (
        <Box
          key={cert}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 3,
            bgcolor: "#3E1A89",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          {cert}
        </Box>
      ))}
    </Stack>

    <Box
      sx={{
        mt: 3,
        p: 3,
        border: "2px solid #3E1A89",
        borderRadius: 4,
      }}
    >
      <Typography sx={{ color: "#3E1A89", fontWeight: 700 }}>
        Business License
      </Typography>

      <Typography sx={{ color: "#3E1A89", mt: 1 }}>
        {company?.licence || "Not Available"}
      </Typography>
    </Box>
  </Box>

  <Box mb={8}>
    <Typography
      variant="h4"
      sx={{
        color: "#3E1A89",
        fontWeight: 700,
        mb: 3,
      }}
    >
      Gallery
    </Typography>

    <Typography sx={{ color: "#3E1A89", mb: 3 }}>
      Explore our products, facilities, and achievements through our
      company gallery.
    </Typography>

    <Box
      sx={{
        height: 300,
        borderRadius: 5,
        border: "2px dashed #3E1A89",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ImageList variant='masonry' src={company?.image || "/upload/.jpeg"} cols={3} gap={4}/>
    </Box>
  </Box>
  
  <Box
    sx={{
      mt: 10,
      p: 5,
      borderRadius: 6,
      background:'#e7e6e9',
      color: "#141517",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        mb: 4,
        textAlign: "center",
      }}
    >
      Website Developed By
    </Typography>

    <Stack
      spacing={4}
      alignItems="center"
    >
     {developers && developers?.map((dev, index) => {
  const imageFirst = index % 2 === 0;

  return (
    <Box
      key={dev.email}
      sx={{
        mb: 8,
        p: 4,
        borderRadius: 6,
        background:
          "linear-gradient(135deg,#3E1A89 0%, #5222B5 100%)",
        color: "#fff",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: imageFirst ? "row" : "row-reverse",
        }}
        spacing={5}
        alignItems="center"
      >
        <Box
          component="img"
          src={`${dev.image}`}
          alt={dev.name}
          sx={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            objectFit: "cover",
            border: "5px solid #fff",
            flexShrink: 0,
            boxShadow: "0 10px 30px rgba(0,0,0,.2)",
          }}
        />

        <Box flex={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            {dev?.name}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              mb: 2,
            }}
          >
            {dev.role ?? "Developer"}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            📧 {dev.email ?? "Not Available"}
          </Typography>

          <Typography sx={{ mb: 3 }}>
            📞 {dev.phone}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            useFlexGap
          >
            <PrimaryButton
              href={`mailto:${dev.email}`}
              target="_blank"
              sx={{
                bgcolor: "#fff",
                color: "#3E1A89",
              }}
            >
              Email
            </PrimaryButton>

            <PrimaryButton
              href={`tel:${dev.phone}`}
              sx={{
                bgcolor: "#fff",
                color: "#3E1A89",
              }}
            >
              Call
            </PrimaryButton>

            {dev.github && (
              <PrimaryButton
                href={dev.github}
                target="_blank"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                }}
              >
                GitHub
              </PrimaryButton>
            )}

            {dev.linkedin && (
              <PrimaryButton
                href={dev.linkedin}
                target="_blank"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                }}
              >
                LinkedIn
              </PrimaryButton>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
})}
    </Stack>
  </Box>
</Box>
    </Box>
  )
}
