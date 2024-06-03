import { Button, Divider, Flex, HStack, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ActionsPanel({ userDetails }) {
  return (
    <Flex justifyContent="center" width="100%" height="auto full" paddingY="5%">
      <VStack
        width="80%"
        border="2px solid black"
        boxShadow="0px 0px 10px 5px black"
        borderRadius="20px"
        paddingY="20px"
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
                  <Button bg="green">Create a new ticket</Button>
                </Link>
              ) : null}
              <Link to="/tickets">
                <Button bg="orange">View all tickets</Button>
              </Link>

              {["TESTER", "ADMIN", "DEVELOPER"].includes(userDetails.role) ? (
                <Link
                  to={
                    userDetails.role === "TESTER" ||
                    userDetails.role === "ADMIN"
                      ? `/tickets?createdByUserId=${userDetails.userId}`
                      : userDetails.role === "DEVELOPER"
                      ? `/tickets?assignedToUserId=${userDetails.userId}`
                      : null
                  }
                >
                  <Button bg="darkorange">View my tickets</Button>
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
                  <Button bg="green">Create a new project</Button>
                </Link>
              ) : null}
              <Link to="/projects">
                <Button bg="orange">View all projects</Button>
              </Link>
              {userDetails.role === "MANAGER" ? (
                <Button bg="darkorange">View my project</Button>
              ) : null}
            </HStack>
          </VStack>
        </HStack>
        
        <HStack width="90%">
          <VStack width="50%">
            <Heading>Users</Heading>
            <HStack>
              <Link to="/users">
                <Button bg="orange">View all users</Button>
              </Link>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Flex>
  );
}
