import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteTicket, getAllTickets } from "../services/TicketService";
import { Link, useLocation } from "react-router-dom";
import { getAllUsers } from "../services/UserService";

export default function TicketsList({ userDetails }) {
  const [tickets, setTickets] = useState([]);
  const [filteringOptions, setFilteringOptions] = useState({});
  const [users, setUsers] = useState([]);
  const queryOption = useLocation().search;

  useEffect(() => {
    getAndSetTickets();

    if (queryOption) {
      console.log(queryOption);
      if (queryOption.includes("createdByUserId")) {
        console.log(queryOption);
        setFilteringOptions((prevOptions) => {
          const filtering = {
            ...prevOptions,
            ["createdByUserId"]: queryOption.substring(17),
          };
          console.log(filtering);
          getAndSetTickets(filtering);
          return filtering;
        });
      }

      if (queryOption.includes("assignedToUserId")) {
        console.log(queryOption);
        setFilteringOptions((prevOptions) => {
          const filtering = {
            ...prevOptions,
            ["assignedToUserId"]: queryOption.substring(18),
          };
          console.log(filtering);
          getAndSetTickets(filtering);
          return filtering;
        });
      }
    }
  }, [queryOption]);

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
    <Flex justifyContent="center" width="100%" height="auto">
      <VStack
        width="90%"
        height="auto full"
        justifyContent="center"
        border="2px solid black"
        boxShadow="0px 0px 10px 5px black"
        paddingY="1%"
        marginTop="2%"
        borderRadius="20px"
      >
        <Heading>All tickets</Heading>
        <HStack
          width="93%"
          paddingX="2%"
          height="auto full"
          borderRadius="30px"
          border="2px solid black"
          boxShadow="5px 5px 5px 5px black"
        >
          <h3>Filter</h3>
          <Spacer />
          <select
            onClick={() => getAndSetUsers()}
            onChange={(e) => handleChange(e, "createdByUserId")}
            defaultValue=""
            style={{ width: 15 + "%", borderRadius: "5px", height: "25px" }}
          >
            <option disabled value="">
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
          </select>

          <select
            onChange={(e) => handleChange(e, "priority")}
            defaultValue=""
            style={{ width: 15 + "%", borderRadius: "5px", height: "25px" }}
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
          </select>

          <select
            defaultValue=""
            onClick={() => getAndSetUsers()}
            onChange={(e) => handleChange(e, "assignedToUserId")}
            style={{ width: 15 + "%", borderRadius: "5px", height: "25px" }}
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
          </select>

          <select
            defaultValue=""
            onChange={(e) => handleChange(e, "status")}
            style={{ width: 15 + "%", borderRadius: "5px", height: "25px" }}
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
          </select>
          <Button onClick={() => (setFilteringOptions({}), getAndSetTickets())}>
            Remove filters
          </Button>
        </HStack>

        <Grid templateColumns="32.5% 32.5% 33%" paddingY="2%" width="100%">
          {tickets.length === 0 ? (
            <Heading gridColumnStart={1} gridColumnEnd={4}>
              There are no tickets, refresh your page or remove your filters!
            </Heading>
          ) : null}
          {tickets.map((ticket) => (
            <GridItem
              border="2px solid black"
              boxShadow="0px 1px 5px 5px black"
              key={ticket.id}
              height="auto full"
              alignContent="space-evenly"
              marginLeft="5%"
              paddingY="2%"
              borderRadius="15px"
              marginBottom="5%"
              minWidth="fit-content"
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
                  <Button size="sm" backgroundColor="green">
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
      </VStack>
    </Flex>
  );
}
