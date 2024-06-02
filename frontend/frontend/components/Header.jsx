import { HStack, Box, Button, Spacer, Divider } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRFill, RiAdminFill } from "react-icons/ri";
import { FaTicketSimple } from "react-icons/fa6";
import { IoTicketSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../src/Header.css";

export default function Header({ userDetails }) {
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("token");
    navigate("/home");
  }

  return (
    <HStack padding="30px" height="fit-content" width="auto full">
      <Spacer />
      <HStack>
        <Link to="/tickets">
          <Button leftIcon={<IoTicketSharp />}>Tickets</Button>
        </Link>
        <Link
          to={
            userDetails.role === "TESTER" || userDetails.role === "ADMIN"
              ? `/tickets?createdByUserId=${userDetails.userId}`
              : userDetails.role === "DEVELOPER"
              ? `/tickets?assignedToUserId=${userDetails.userId}`
              : null
          }
        >
          <Button leftIcon={<FaTicketSimple />}>My tickets</Button>
        </Link>
        <Link to="/auth/actions">
          <Button leftIcon={<RiAdminFill />}>Actions</Button>
        </Link>

        <Link to={`/users/${userDetails.userId}`}>
          <Button leftIcon={<CgProfile />}>Profile</Button>
        </Link>
        
        <Button leftIcon={<RiLogoutBoxRFill />} onClick={() => handleLogout()}>
          Sign out
        </Button>
      </HStack>
    </HStack>
  );
}
