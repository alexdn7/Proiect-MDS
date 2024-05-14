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
      padding="30px"
      alignItems="center"
      height="full"
      width="auto full"
    >
      <Box>
        <img src={logo} />
      </Box>
      <HStack alignContent="center">
        <Link to="/tickets">
          <Button leftIcon={<IoTicketSharp />}>Tickets</Button>
        </Link>
        <Button leftIcon={<FaTicketSimple />}>My tickets</Button>
        <Link to="/auth/actions">
          <Button leftIcon={<RiAdminFill />}>Actions</Button>
        </Link>
        <Button leftIcon={<CgProfile />}>Profile</Button>
        <Button leftIcon={<RiLogoutBoxRFill />} onClick={() => handleLogout()}>
          Sign out
        </Button>
      </HStack>
    </HStack>
  );
}
