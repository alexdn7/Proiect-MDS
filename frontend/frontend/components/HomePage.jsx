import { Flex, VStack, Heading } from "@chakra-ui/react";

export default function HomePage({ userDetails }) {
  if (!userDetails) {
    return <Heading>Content is loading, please wait...</Heading>;
  }

  return (
    <>
      <Flex justifyContent="center">
        <VStack bg="teal" width="90%" marginTop="30px">
          <Heading>Welcome back, {userDetails.name}!</Heading>
        </VStack>
      </Flex>
    </>
  );
}
