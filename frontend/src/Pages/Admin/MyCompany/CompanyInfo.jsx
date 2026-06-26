import {
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { PrimaryButton } from "../../../Components/Common/Buttons";
import api from "../../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../../../Redux/Slices/AdminSlice/CompanyInfoSlice";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function CompanyInfo() {
  const company = useSelector((state) => state.companyInfo.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getCompanyInfo() {
    try {
      let res = await api.get("/company/get");
      dispatch(getInfo(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getCompanyInfo();
  }, []);

  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <Typography variant="h6" color="initial">
          My Company Info
        </Typography>
        {company?._id && (
          <IconButton
            onClick={() => navigate(`/admin/infoupdate/${company?._id}`)}
            sx={{ position: "absolute", right: 0, top: 0 }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>
      <Box>
        {company?._id ? (
          <Box
            maxWidth="lg"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 5,
                overflow: "hidden",
                background: "#FFFFFF",
              },
            }}
          >
            <Box
              sx={{
                background: "#3E1A89",
                color: "#FFFFFF",
                p: 4,
                position: "relative",
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar
                  src={company?.companyImage}
                  sx={{
                    width: 90,
                    height: 90,
                    border: "4px solid #FFFFFF",
                  }}
                />

                <Box flex={1}>
                  <Typography variant="h4" fontWeight={700}>
                    {company?.companyName}
                  </Typography>

                  <Typography sx={{ opacity: 0.8, mt: 1 }}>
                    Founded by {company?.founder}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <DialogContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: "1px solid rgba(62,26,137,0.1)",
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="#3E1A89"
                      gutterBottom
                    >
                      Company Overview
                    </Typography>

                    <Typography color="text.secondary">
                      {company?.companyDescription}
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: "1px solid rgba(62,26,137,0.1)",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="#3E1A89"
                      mb={2}
                    >
                      Certifications
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {company?.certification?.map((cert, index) => (
                        <Chip
                          key={index}
                          label={cert}
                          sx={{
                            background: "#3E1A89",
                            color: "#FFFFFF",
                            mb: 1,
                          }}
                        />
                      ))}
                    </Stack>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        border: "1px solid rgba(62,26,137,0.1)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color="#3E1A89"
                        mb={2}
                      >
                        Contact Details
                      </Typography>

                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="caption">EMAIL</Typography>
                          <Typography fontWeight={600}>
                            {company?.email}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="caption">PHONE</Typography>
                          <Typography fontWeight={600}>
                            {company?.phone}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="caption">FOUNDER</Typography>
                          <Typography fontWeight={600}>
                            {company?.founder}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        border: "1px solid rgba(62,26,137,0.1)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color="#3E1A89"
                        mb={2}
                      >
                        License
                      </Typography>

                      <Typography fontWeight={600}>
                        {company?.licence || "Not Available"}
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        border: "1px solid rgba(62,26,137,0.1)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color="#3E1A89"
                        mb={2}
                      >
                        Socials
                      </Typography>
                      <Stack
                      gap={1}
                        direction="row"
                        sx={{ mt: 1, flexWrap: "wrap" }}
                        // spacing={2}
                      >
                        {Object.keys(company?.socialMedia || {}).map(
                          (item, index) => (
                            <PrimaryButton
                              fullWidth
                              key={index}
                              variant="outlined"
                              sx={{ borderColor: "#3E1A89",mr:1,mb:1 }}
                              onClick={() =>
                                window.open(company?.socialMedia[item])
                              }
                            >
                              {item}
                            </PrimaryButton>
                          ),
                        )}
                      </Stack>
                    </Paper>
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
          </Box>
        ) : (
          <Stack sx={{ alignItems: "center" }}>
            <Typography variant="h5" color="initial">
              Add Company Details
            </Typography>
            <PrimaryButton
              onClick={() => navigate(`/admin/infoupdate/add`)}
            >
              +{/* <AddIcon /> */}
            </PrimaryButton>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
