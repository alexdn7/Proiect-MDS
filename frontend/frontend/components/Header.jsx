import { HStack, Box, Button } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRFill, RiAdminFill } from "react-icons/ri";
import { FaTicketSimple } from "react-icons/fa6";
import { IoTicketSharp } from "react-icons/io5";
export default function Header() {
  return (
    <HStack
      justifyContent="space-between"
      paddingX="2%"
      margin="0"
      alignItems="center"
      height="100%"
    >
      <Box>Logo</Box>
      <HStack alignContent={"center"}>
        <Button leftIcon={<IoTicketSharp />} colorScheme="teal" variant="solid">
          Tickets
        </Button>
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
        >
          Sign out
        </Button>
      </HStack>
    </HStack>
  );
}
