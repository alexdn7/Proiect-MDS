import { HStack, Box, Button, Spacer, Divider } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRFill, RiAdminFill } from "react-icons/ri";
import { FaTicketSimple } from "react-icons/fa6";
import { IoTicketSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../src/Header.css";
import logo from "../assets/icons8-bug-tracking-32.png";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("token");
    navigate("/home");
  }

  return (
    <HStack
      justifyContent="space-between"
      paddingX="2%"
      padding="10px"
      alignItems="center"
      backgroundColor="#27374D"
      height="full"
      width="100%"
    >
      <Box>
        <img src={logo} />
      </Box>
      <HStack alignContent="center">
        <Link to="/tickets">
          <Button leftIcon={<IoTicketSharp />}>Tickets</Button>
        </Link>
        <Button leftIcon={<FaTicketSimple />}>My tickets</Button>
        <Button leftIcon={<RiAdminFill />}>Actions</Button>
        <Button leftIcon={<CgProfile />}>Profile</Button>
        <Button leftIcon={<RiLogoutBoxRFill />} onClick={() => handleLogout()}>
          Sign out
        </Button>
      </HStack>
    </HStack>
  );
}
