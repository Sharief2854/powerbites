import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setData, deleteUser } from "../../Redux/Reducers/UserSlice";

function UserDetails() {
  const customers = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  async function getData() {
    try {
      const res = await axios.get(
        "http://localhost:4500/crudAdmin/getAllcustomers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setData(res.data));
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCustomer(id) {
    try {
      await axios.delete(
        `http://localhost:4500/crudAdmin/deletecustomer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(deleteUser(id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
    localStorage.setItem("token","admin")
  }, []);

  const filteredCustomers = customers?.filter((item) =>
    item.name?.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            textAlign: { xs: "center", sm: "left" },
            fontSize: { xs: "1.6rem", sm: "2rem" },
          }}
        >
          Users
        </Typography>

        <TextField
          fullWidth
          placeholder="Search customer by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Desktop Table */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <TableContainer component={Paper} elevation={1}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Verified</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCustomers?.length > 0 ? (
                  filteredCustomers.map((item) => (
                    <TableRow key={item._id} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.isVerified ? "Verified" : "Not Verified"}
                          color={item.isVerified ? "success" : "warning"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => deleteCustomer(item._id)}
                          sx={{ textTransform: "none" }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No customers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Mobile Card View */}
        <Stack spacing={2} sx={{ display: { xs: "flex", md: "none" } }}>
          {filteredCustomers?.length > 0 ? (
            filteredCustomers.map((item) => (
              <Paper
                key={item._id}
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {item.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mt: 0.5,
                    wordBreak: "break-word",
                  }}
                >
                  {item.email}
                </Typography>

                <Box sx={{ mt: 1.5, mb: 1.5 }}>
                  <Chip
                    label={item.isVerified ? "Verified" : "Not Verified"}
                    color={item.isVerified ? "success" : "warning"}
                    size="small"
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => deleteCustomer(item._id)}
                  sx={{
                    textTransform: "none",
                    mt: 1,
                  }}
                >
                  Delete
                </Button>
              </Paper>
            ))
          ) : (
            <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
              <Typography>No customers found</Typography>
            </Paper>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default UserDetails;