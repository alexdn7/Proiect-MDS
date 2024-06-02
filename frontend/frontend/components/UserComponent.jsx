import {
  Avatar,
  Button,
  Flex,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../services/UserService";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit, MdEmail } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function UserComponent({ userDetails }) {
  const { id } = useParams();
  const [updateState, setUpdateState] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getAndSetDetails();
  }, []);

  function getAndSetDetails() {
    getUserById(id)
      .then((response) => {
        console.log(response);
        setDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (details.length === 0 || !details.projects) {
    return <Heading>Content is loading, please wait...</Heading>;
  }

  return (
    <Flex
      justifyContent="center"
      width="100%"
      height="100%"
      minHeight="fit-content"
    >
      <HStack
        width="95%"
        alignSelf="center"
        paddingX="1%"
        justifyContent="space-around"
      >
        <VStack
          minWidth="fit-content"
          width="40%"
          border="2px solid black"
          boxShadow="0 0 5px 5px black"
          borderRadius="15px"
        >
          <Avatar />
          <VStack width="100%" maxWidth="fit-content">
            <h1 style={{ margin: 0, fontFamily: "halvetica" }}>{details.name}</h1>
            <Heading
              margin="0"
              color={details.role === "ADMIN" ? "red" : "orange"}
            >
              {details.role}
            </Heading>
            <Text>
              Member since {String(details.registeredOn).substring(0, 10)}
            </Text>
            <VStack marginBottom="10px">
              <Text margin="0">Contact: </Text>
              <Button
                leftIcon={<MdEmail />}
                isDisabled="true"
                _hover={{ transform: "scale(1.05)" }}
                bg="green"
                color="white"
              >
                {details.email}
              </Button>
            </VStack>
          </VStack>
        </VStack>

        <VStack
          minWidth="fit-content"
          width="50%"
          border="2px solid black"
          boxShadow="0 0 5px 5px black"
          borderRadius="15px"
        >
          <TableContainer minWidth="90%" width="fit-content">
            <Table width="100%" border="2px solid black">
              {details.projects.length > 0 ? (
                <>
                  <TableCaption placement="top" marginBottom="10px">
                    Member of the following projects
                  </TableCaption>
                  <Thead bg="black">
                    <Tr>
                      <Td borderRight="2px solid black">Project ID</Td>
                      <Td>Project title</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {details.projects.map((project) => (
                      <Tr key={project.project.id}>
                        <Td borderRight="2px solid black">
                          {project.project.id}
                        </Td>
                        <Td>{project.project.title}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </>
              ) : (
                "Not assigned to a project yet"
              )}
            </Table>
          </TableContainer>

          <Text margin="0">Actions</Text>
          <HStack marginBottom="5px">
            <Link to="/users">
              <Button bg="green" leftIcon={<RiArrowGoBackFill />}>
                Back
              </Button>
            </Link>

            {userDetails && userDetails.userId === id ? (
              <Button bg="orange" rightIcon={<MdEdit />}>
                Update account
              </Button>
            ) : null}

            {userDetails && userDetails.userId === id ? (
              <Button bg="red" leftIcon={<FaTrashCan />}>
                Delete account
              </Button>
            ) : null}
          </HStack>
        </VStack>
      </HStack>
    </Flex>
  );
}
