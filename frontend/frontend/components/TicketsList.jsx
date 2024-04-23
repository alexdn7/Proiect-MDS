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
                <Heading overflowX="auto scroll">{ticket.title}</Heading>
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
                <Text>{ticket.description}</Text>
              </Box>
              <Text>Created by: {ticket.createdBy.name} </Text>
              <Text>Project: {ticket.project.title} </Text>
              <Text>Assigned to: {ticket.assignedTo.name} </Text>
              <Text>Status: {ticket.status} </Text>
              <HStack justifyContent="center" marginTop="2">
                <Button size="sm" backgroundColor="orange">View details</Button>
                <Button size="sm" backgroundColor="red">Delete</Button>
              </HStack>
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
}
