import {
  Flex,
  VStack,
  Heading,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";

export default function HomePage({ userDetails }) {
  const [count, setCount] = useState(0);
  if (!userDetails) {
    return <Heading>Content is loading, please wait...</Heading>;
  }

  return (
    <>
      <Flex justifyContent="center">
        <VStack
          width="80%"
          minWidth="fit-content"
          marginTop="30px"
          border="2px solid black"
          borderRadius="20px"
          boxShadow="5px 5px 5px 5px black"
        >
          <Heading>Welcome back, {userDetails.name}!</Heading>

          <Grid templateColumns="1fr 1fr" gap="20px">
            <GridItem
              key="usersCount"
              border="2px solid black"
              boxShadow="5px 5px 5px 5px black"
              padding="20px"
              bg="red"
            >
              <VStack>
                <FaUser />
                <Heading>100 tickets created</Heading>
              </VStack>
            </GridItem>
            <GridItem
              key="usersCount"
              border="2px solid black"
              boxShadow="5px 5px 5px 5px black"
              padding="20px"
              bg="darkred"
            >
              <VStack>
                <FaUser />
                <Heading>100 tickets</Heading>
              </VStack>
            </GridItem>
            <GridItem
              key="usersCount"
              border="2px solid black"
              boxShadow="5px 5px 5px 5px black"
              padding="20px"
              bg="green"
            >
              <VStack>
                <FaUser />
                <Heading>100 users</Heading>
              </VStack>
            </GridItem>
            <GridItem
              key="usersCount"
              border="2px solid black"
              boxShadow="5px 5px 5px 5px black"
              padding="20px"
              bg="green"
            >
              <VStack>
                <FaUser />
                <Heading>100 tickets created</Heading>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Flex>
    </>
  );
}
