import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllTickets } from "../services/TicketService";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAndSetTickets();
  }, []);

  function getAndSetTickets() {
    getAllTickets()
      .then((response) => {
        console.log(response.data);
        setTickets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      {tickets.length === 0 ? (
        <Flex justifyContent={"center"}></Flex>
      ) : (
        <Grid
          templateColumns="33% 33% 33%"
          padding="20px"
          gap="10px"
          width="100%"
        >
          {tickets.map((ticket) => (
            <GridItem padding="2" backgroundColor="teal" key={ticket.id}>
              <HStack justifyContent={"center"}>
                <Heading overflowX="auto scroll">
                  {ticket.title.length >= 25
                    ? ticket.title.substring(0, 25) + "..."
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
                <Text>Created by: <Link to="/users/">{ticket.createdBy.name}</Link> </Text>
                <Text>Assigned to: <Link to="/users/">{ticket.assignedTo.name}</Link> </Text>
              </HStack>
              <Text>Status: {ticket.status} </Text>
              <HStack justifyContent="center" marginTop="2">
                <Button size="sm" backgroundColor="#FCCF00">
                  View details
                </Button>
                <Button size="sm" backgroundColor="red">
                  Delete
                </Button>
              </HStack>
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
}
