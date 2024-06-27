import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SouthIcon from '@mui/icons-material/South';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from "@mui/material/styles";
import brandLogo from "@/assets/images/brandLogo.svg";
import { Box, Grid } from "@mui/material";
import TextView from "../Atoms/TextView/TextView";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const [activeUserPage, setActiveUserPage] = useState("wallet");
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  useEffect(() => {
    switch (window.location.pathname) {
      case "/deposit":
        setActiveUserPage("deposit");
        break;
      case "/withdraw":
        setActiveUserPage("withdraw");
        break;
      case "/transfer":
        setActiveUserPage("transfer");
        break;
      case "/wallet":
      default:
        setActiveUserPage("wallet");
    }
  }, [window.location.pathname]);
  const navigationhandler = (path: string) => {
    setActiveUserPage(path);
    navigate(`/${path}`);
  };
  return (
    <Box sx={{ color: theme.palette.grey[100], borderBottomColor: theme.palette.grey[200], borderBottomWidth: 1, borderStyle: "solid" }}>
      <Grid container p={2} px={4} justifyContent={"space-between"} alignItems={"center"}>
        <Grid alignItems={"center"} container gap={5} item xs={12}>
          <Grid item xs={2}>
            <img src={brandLogo} alt="Logo" style={{ marginRight: 10 }} />
          </Grid>
          <Grid item>
            <TextView style={{ cursor: "pointer" }} color={activeUserPage === "wallet" ? theme.palette.primary.main : theme.palette.grey[700]} onClick={() => navigationhandler("wallet")}            variant="Regular_14" fontWeight="Medium">
              Wallet
            </TextView>
          </Grid>{" "}
          <Grid item>
            <TextView component={"p"} style={{ cursor: "pointer", display: "flex", gap: 1, alignItems: "center" }} color={activeUserPage === "deposit" ? theme.palette.primary.main : theme.palette.grey[700]} onClick={() => navigationhandler("deposit")}            variant="Regular_14" fontWeight="Medium">
              Deposit
              <ArrowUpwardIcon sx={{fontSize:16}} />
            </TextView>

          </Grid>
          <Grid item>
            <TextView
              style={{ cursor: "pointer", display: "flex", gap: 1, alignItems: "center" }}
              color={activeUserPage === "withdraw" ? theme.palette.primary.main : theme.palette.grey[700]}
              onClick={() => navigationhandler("withdraw")}
              variant="Regular_14"
              fontWeight="Medium"
              component={"p"}
            >
              Withdraw
              <ArrowDownwardIcon sx={{fontSize:16}} />
            </TextView>

          </Grid>
          <Grid item>
            <TextView
              style={{ cursor: "pointer" }}
              color={activeUserPage === "transfer" ? theme.palette.primary.main : theme.palette.grey[700]}
              onClick={() => navigationhandler("transfer")}
              variant="Regular_14"
              fontWeight="Medium"
            >
              Transfer
            </TextView>
          </Grid>
        </Grid>
        {/* <Grid xs={0.5} item>
          <IconButton edge="end" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
            <Avatar style={{ backgroundColor: "#FFD700", color: "#000",fontSize:12 }}>A</Avatar>
            <ArrowDropDownIcon style={{ color: "#FFD700" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default NavBar;
