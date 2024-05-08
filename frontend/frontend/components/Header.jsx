import { HStack, Box, Button } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRFill, RiAdminFill } from "react-icons/ri";
import { FaTicketSimple } from "react-icons/fa6";
import { IoTicketSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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
      backgroundColor="teal"
      height="full"
    >
      <Box>Logo</Box>
      <HStack alignContent={"center"}>
        <Link to="/tickets">
          <Button
            leftIcon={<IoTicketSharp />}
            colorScheme="teal"
            variant="solid"
          >
            Tickets
          </Button>
        </Link>
        <Button
          leftIcon={<FaTicketSimple />}
          colorScheme="teal"
          variant="solid"
        >
          My tickets
        </Button>
        <Button leftIcon={<RiAdminFill />} colorScheme="teal" variant="solid">
          Actions
        </Button>
        <Button leftIcon={<CgProfile />} colorScheme="teal" variant="solid">
          Profile
        </Button>
        <Button
          leftIcon={<RiLogoutBoxRFill />}
          colorScheme="teal"
          variant="solid"
          onClick={() => handleLogout()}
        >
          Sign out
        </Button>
      </HStack>
    </HStack>
  );
}
