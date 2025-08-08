import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/images/cheese-no-bg.png";

const DashboardLayout = () => {

  const theme = useTheme();

  console.log("DashboardLayout theme:", theme);

  return (
    <>
      <Box 
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,.25)",
          height: "100vh",
          width: 100
          }}>

            <Stack direction="column" alignItems={"center"} sx={{width: "100%"}}>

              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  height: 64,
                  width: 64,
                  borderRadius: 1.5,
                }}>

                  <img 
                    src={Logo}
                    alt="Logo"
                    sx={{
                      height: 100,
                    }}
                  />

              </Box>

            </Stack>

      </Box>
      <Outlet />
    </>
  );
};

export default DashboardLayout;