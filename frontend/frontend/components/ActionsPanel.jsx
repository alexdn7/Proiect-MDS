import { Button, Flex, HStack, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ActionsPanel({ userDetails }) {
  return (
    <Flex justifyContent="center" width="100%" height="auto full" paddingY="5%">
      <VStack
        width="80%"
        border="2px solid black"
        boxShadow="0px 0px 10px 5px black"
      >
        <Heading>Hello, {userDetails.name}!</Heading>
        <Heading>You're registered as a {userDetails.role}.</Heading>
        <Heading>-- Available actions are -- </Heading>
        <HStack width="90%">
          <VStack width="50%">
            <Heading>Tickets</Heading>
            <HStack>
              {userDetails.role === "TESTER" || userDetails.role === "ADMIN" ? (
                <Link to="/tickets/add">
                  <Button>Create a new ticket</Button>
                </Link>
              ) : null}
              <Link to="/tickets">
                <Button>View all tickets</Button>
              </Link>

              {["TESTER", "ADMIN", "DEVELOPER"].includes(userDetails.role) ? (
                <Link to={`/tickets/`}>
                  <Button>View my tickets</Button>
                </Link>
              ) : null}
            </HStack>
          </VStack>
          <VStack width="50%">
            <Heading>Projects</Heading>
            <HStack>
              {userDetails.role === "MANAGER" ||
              userDetails.role === "ADMIN" ? (
                <Link to="/projects/add">
                  <Button>Create a new project</Button>
                </Link>
              ) : null}
              <Link to="/projects">
                <Button>View all projects</Button>
              </Link>
              {userDetails.role === "MANAGER" ? (
                <Button>View my project</Button>
              ) : null}
            </HStack>
          </VStack>
        </HStack>
        <HStack width="90%">
          <VStack width="50%">
            <Heading>Users</Heading>
          </VStack>
        </HStack>
      </VStack>
    </Flex>
  );
}
