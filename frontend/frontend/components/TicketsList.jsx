import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteTicket, getAllTickets } from "../services/TicketService";
import { Link } from "react-router-dom";
import { getAllUsers } from "../services/UserService";

export default function TicketsList({ userDetails }) {
  const [tickets, setTickets] = useState([]);
  const [filteringOptions, setFilteringOptions] = useState({});
  const [users, setUsers] = useState([]);
  console.log(userDetails);
  useEffect(() => {
    getAndSetTickets();
  }, []);

  function getAndSetTickets(filteringOptions) {
    getAllTickets(filteringOptions)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getAndSetUsers() {
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleChange(e, filteringCriteria) {
    if (
      !["assignedToUserId", "priority", "createdByUserId", "status"].includes(
        filteringCriteria
      )
    ) {
      console.error("Incorrect filtering criteria");
      return;
    }
    setFilteringOptions((prevOptions) => {
      const filtering = {
        ...prevOptions,
        [filteringCriteria]: e.target.value,
      };
      getAndSetTickets(filtering);
      return filtering;
    });
  }

  async function handleDeleteTicket(ticketId) {
    try {
      await deleteTicket(ticketId);
      getAndSetTickets();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex justifyContent="center" width="100%" height="100%">
      <VStack
        width="20%"
        padding="10px"
        backgroundColor="teal"
      >
        <VStack width="100%" justifyContent="center" height="100vh">
          <Heading>Filter results</Heading>
          <Select
            backgroundColor="white"
            onClick={() => getAndSetUsers()}
            onChange={(e) => handleChange(e, "createdByUserId")}
            defaultValue=""
            width="80%"
          >
            <option disabled value="" key="">
              Created by
            </option>
            {users.length === 0 ? (
              <option disabled>There are no users, try again!</option>
            ) : null}
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
          <Select
            backgroundColor="white"
            onChange={(e) => handleChange(e, "priority")}
            defaultValue=""
            width="80%"
          >
            <option disabled value="">
              Priority
            </option>
            <option key="LOW" value="LOW">
              LOW
            </option>
            <option key="MEDIUM" value="MEDIUM">
              MEDIUM
            </option>
            <option key="HIGH" value="HIGH">
              HIGH
            </option>
          </Select>
          <Select
            backgroundColor="white"
            defaultValue=""
            onClick={() => getAndSetUsers()}
            onChange={(e) => handleChange(e, "assignedToUserId")}
            width="80%"
          >
            <option disabled value="" key="">
              Assigned to
            </option>
            {users.length === 0 ? (
              <option disabled>There are no users, try again!</option>
            ) : null}
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
          <Select
            backgroundColor="white"
            defaultValue=""
            onChange={(e) => handleChange(e, "status")}
            width="80%"
          >
            <option disabled value="">
              Status
            </option>
            <option key="CREATED" value="CREATED">
              Created
            </option>
            <option key="IN_PROGRESS" value="IN_PROGRESS">
              IN_PROGRESS
            </option>
            <option key="SOLVED" value="SOLVED">
              SOLVED
            </option>
          </Select>
          <Button onClick={() => (setFilteringOptions({}), getAndSetTickets())}>
            Remove filters
          </Button>
        </VStack>
      </VStack>
      <Grid
        templateColumns="33% 33% 33%"
        padding="20px"
        gap="10px"
        width="100%"
      >
        {tickets.length === 0 ? (
          <Heading alignSelf="center">
            There are no tickets, try again or remove your filter!
          </Heading>
        ) : null}
        {tickets.map((ticket) => (
          <GridItem
            backgroundColor="teal"
            key={ticket.id}
            height="auto full"
            maxHeight="40%"
            alignContent="space-evenly"
          >
            <HStack justifyContent="center">
              <Heading overflowX="auto scroll">
                {ticket.title.length >= 15
                  ? ticket.title.substring(0, 15) + "..."
                  : ticket.title}
              </Heading>
              <Badge
                alignSelf={"center"}
                backgroundColor={
                  ticket.priority === "HIGH"
                    ? "red"
                    : ticket.priority === "MEDIUM"
                    ? "orange"
                    : "green"
                }
              >
                {ticket.priority}
              </Badge>
            </HStack>
            <Box overflowX="auto scroll">
              <Text>
                {ticket.description.length > 100
                  ? ticket.description.substring(0, 100) + "..."
                  : ticket.description}
              </Text>
            </Box>
            <Text>Project: {ticket.project.title} </Text>
            <HStack justifyContent="center">
              <Text>
                Created by:{" "}
                <Link to={`/users/${ticket.createdByUserId}`}>
                  {ticket.createdBy.name}
                </Link>{" "}
              </Text>
              <Text>
                | Assigned to:{" "}
                <Link to={`/users/${ticket.assignedToUserId}`}>
                  {ticket.assignedTo.name}
                </Link>{" "}
              </Text>
            </HStack>
            <Text>Status: {ticket.status} </Text>
            <HStack justifyContent="center" marginTop="2">
              <Link to={`/tickets/${ticket.id}`}>
                <Button size="sm" backgroundColor="whitesmoke">
                  View details
                </Button>
              </Link>
              {userDetails.role == "ADMIN" ||
              (userDetails.role === "TESTER" &&
                ticket.createdByUserId === userDetails.userId) ? (
                <Button
                  size="sm"
                  backgroundColor="red"
                  onClick={() => handleDeleteTicket(ticket.id)}
                >
                  Delete
                </Button>
              ) : null}
            </HStack>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}
