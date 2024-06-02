import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
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
import { getUserById, updateUser } from "../services/UserService";
import { FaTrashCan } from "react-icons/fa6";
import { MdCancel, MdEdit, MdEmail, MdSave } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function UserComponent({ userDetails }) {
  const { id } = useParams();
  const [updateState, setUpdateState] = useState(false);
  const [passwords, setPassword] = useState({
    password: "",
    confirmedPassword: "",
  });
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

  function handleUpdate() {
    try {
      const userDto = { ...details, password: passwords.password };
      delete userDto.projects;

      const response = updateUser(id, userDto);
      setUpdateState(false);
      getAndSetDetails();
    } catch (error) {
      console.error(error);
    }
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
      <VStack
        width={updateState ? "60%" : "90%"}
        boxShadow="0 0 10px 10px black"
        border="2px solid black"
        borderRadius="15px"
        alignSelf="center"
        paddingY="20px"
      >
        {!updateState ? (
          <HStack
            width="95%"
            alignSelf="center"
            paddingX="1%"
            justifyContent="space-around"
          >
            <VStack minWidth="fit-content" width="40%" borderRadius="15px">
              <Avatar />
              <VStack width="100%" maxWidth="fit-content">
                <h1 style={{ margin: 0, fontFamily: "halvetica" }}>
                  {details.name}
                </h1>
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
                    isDisabled={true}
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
              width="55%"
              paddingY="2%"
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
                          <Tr
                            key={project.project.id}
                            _hover={{ bg: "green" }}
                            onClick={() =>
                              (window.location.href = `/projects/${project.project.id}`)
                            }
                          >
                            <Td
                              borderRight="2px solid black"
                              width="40%"
                              minWidth="fit-content"
                            >
                              {project.project.id}
                            </Td>
                            <Td width="60%" minWidth="fit-content">
                              {project.project.title}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </>
                  ) : (
                    "Not assigned to a project yet"
                  )}
                </Table>
              </TableContainer>

              <Heading marginBottom="0">Actions</Heading>
              <HStack marginBottom="5px">
                <Link to="/users">
                  <Button bg="green" leftIcon={<RiArrowGoBackFill />}>
                    Back
                  </Button>
                </Link>

                {userDetails && userDetails.userId === id ? (
                  <Button
                    bg="orange"
                    rightIcon={<MdEdit />}
                    onClick={() => setUpdateState(true)}
                  >
                    Update account
                  </Button>
                ) : null}

                {userDetails &&
                (userDetails.userId === id || userDetails.role === "ADMIN") ? (
                  <Button bg="red" leftIcon={<FaTrashCan />}>
                    Delete {userDetails.userId === id ? "account" : "user"}
                  </Button>
                ) : null}
              </HStack>
            </VStack>
          </HStack>
        ) : (
          <VStack width="100%">
            <Heading>Change account details</Heading>

            <FormControl width="50%" minWidth="fit-content" isRequired="true">
              <FormLabel htmlFor="changeName">New name</FormLabel>
              <InputGroup>
                <Input
                  borderRadius="2px"
                  width="100%"
                  id="changeName"
                  type="text"
                  placeholder={details.name}
                  value={details.name}
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>

            <FormControl width="50%">
              <FormLabel htmlFor="changeEmail">Email</FormLabel>
              <InputGroup>
                <Input
                  borderRadius="2px"
                  width="100%"
                  id="changeName"
                  type="text"
                  value={userDetails.email}
                  isReadOnly={true}
                />
              </InputGroup>
            </FormControl>

            <FormControl width="50%" isRequired="true">
              <FormLabel htmlFor="changePassword">New password</FormLabel>
              <InputGroup>
                <Input
                  borderRadius="2px"
                  width="100%"
                  id="changePassword"
                  placeholder="Insert your new password"
                  type="text"
                  value={passwords.password}
                  onChange={(e) =>
                    setPassword({ ...passwords, password: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>

            <FormControl width="50%" isRequired="true">
              <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
              <InputGroup>
                <Input
                  borderRadius="2px"
                  width="100%"
                  id="confirmPassword"
                  type="text"
                  placeholder="Confirm your new password"
                  value={passwords.confirmedPassword}
                  onChange={(e) =>
                    setPassword({
                      ...passwords,
                      confirmedPassword: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FormControl>

            <HStack marginTop="20px">
              <Link to="/users">
                <Button bg="green" leftIcon={<RiArrowGoBackFill />}>
                  Back
                </Button>
              </Link>

              <Button
                leftIcon={<MdCancel />}
                bg="orange"
                onClick={() => {
                  setUpdateState(false);
                  setPassword({ password: "", confirmedPassword: "" });
                  getAndSetDetails();
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={() => handleUpdate()}
                rightIcon={<MdSave />}
                bg="red"
              >
                Save
              </Button>
            </HStack>
          </VStack>
        )}
      </VStack>
    </Flex>
  );
}
