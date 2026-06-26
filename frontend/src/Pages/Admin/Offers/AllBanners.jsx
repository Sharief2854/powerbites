import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import React from 'react'
import { AutoCarousel } from './Offers';
import LocalOfferIcon from "@mui/icons-material/LocalOffer";


export default function OfferPreviewBanner({
    backgroundOptions,
  offer,
  actions,
  editable = false,
  existingImages = [],
  onRemoveExistingImage = () => {},
  onRemoveNewImage = () => {},
}) {
    console.log(backgroundOptions);
    
  const selectedBg =
    backgroundOptions?.find((item) => item.name === offer.background) || backgroundOptions[0];

  const images = Array.isArray(offer?.images) ? offer.images : [];

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        background: selectedBg.bg,
        boxShadow: "0 12px 35px rgba(0,0,0,0.10)",
        mt: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: { xs: "auto", md: 360 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: "100%",
            px: { xs: 3, sm: 5, md: 7 },
            py: { xs: 4, sm: 5, md: 4 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            justifyContent={{ xs: "center", md: "flex-start" }}
            sx={{ mb: 2 }}
          >
            <Chip
              icon={
                <LocalOfferIcon
                  sx={{ color: `${selectedBg.chipColor} !important` }}
                />
              }
              label={offer?.status || "inactive"}
              sx={{
                bgcolor: selectedBg.chipBg,
                color: selectedBg.chipColor,
                fontWeight: 700,
              }}
            />
            <Chip
              label={offer?.background || selectedBg.name}
              sx={{
                bgcolor: selectedBg.chipBg,
                color: selectedBg.chipColor,
                fontWeight: 700,
              }}
            />
          </Stack>

          <Typography
            sx={{
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3.4rem" },
              fontWeight: 800,
              color: selectedBg.textColor,
              lineHeight: 1.1,
              mb: 1,
            }}
          >
            {offer?.title || "Special Offer Title"}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.7rem", md: "2rem" },
              fontWeight: 700,
              color: selectedBg.subTextColor,
              mb: 3,
            }}
          >
            {offer?.description || "Offer description will appear here."}
          </Typography>

          <Box
            sx={{
              display: "inline-block",
              backgroundColor: selectedBg.offerBg,
              color: selectedBg.offerText,
              px: { xs: 2.5, sm: 3.5, md: 4 },
              py: { xs: 1.5, sm: 2, md: 2.2 },
              borderRadius: 3,
              boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.4rem", sm: "1.9rem", md: "2rem" },
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Use Code: {offer?.code || "SAVE20"}
            </Typography>
          </Box>

          {actions && (
            <Stack
              direction="row"
              spacing={1.5}
              flexWrap="wrap"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ mt: 3 }}
            >
              {actions}
            </Stack>
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 2, sm: 3, md: 4 },
            pb: { xs: 4, md: 0 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 420, md: 500 },
            }}
          >
            <AutoCarousel
              images={images}
              editable={editable}
              existingImages={existingImages}
              onRemoveExistingImage={onRemoveExistingImage}
              onRemoveNewImage={onRemoveNewImage}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
