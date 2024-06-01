import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteProject,
  getProjectById,
  removeUserFromProject,
  updateProject,
} from "../services/ProjectService";
import { useEffect, useState } from "react";
import { MdCancel, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getAllUsers } from "../services/UserService";

export default function ProjectComponent({ userDetails }) {
  const [details, setDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [newMembers, setNewMembers] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAndSetDetails();
  }, [projectId]);

  async function getAndSetDetails() {
    try {
      const response = await getProjectById(projectId);
      setDetails(response.data);
    } catch (error) {
      console.error(error);
    }
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

  if (!details) {
    return <div>Page is loading, please wait...</div>;
  }

  async function handleDeleteProject(projectId) {
    try {
      await deleteProject(projectId);
      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdate() {
    try {
      let updatedDetails = { ...details };
      delete updatedDetails.members;
      delete updatedDetails.managedByUser;

      updatedDetails["members"] = newMembers;

      const response = await updateProject(projectId, updatedDetails);
      setUpdateState(false);
      getAndSetDetails();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveUser(userId) {
    try {
      const response = await removeUserFromProject(projectId, userId);
      getAndSetDetails();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex width="100%" justifyContent="center" alignContent="center">
      <VStack
        width="80%"
        border="2px solid black"
        boxShadow="0px 0px 10px 10px black"
        borderRadius="15px"
        marginTop="50px"
      >
        <Heading>Project with ID {details.id}.</Heading>
        {updateState ? (
          <FormControl justifyContent={"center"} width="90%">
            <FormLabel>Title</FormLabel>
            <InputGroup width="100%">
              <Input
                placeholder={details.title}
                value={details.title}
                _placeholder={{ color: "black" }}
                onChange={(e) =>
                  setDetails({ ...details, title: e.target.value })
                }
                as="textarea"
                height="auto"
                width="80%"
                overflowY="scroll"
              />
              <InputRightAddon paddingX="10px">
                {String(details.title).length}/300
              </InputRightAddon>
            </InputGroup>
          </FormControl>
        ) : (
          <h1>{details.title}</h1>
        )}
        <h2> ~~~ Description ~~~ </h2>
        {updateState ? (
          <FormControl justifyContent={"center"} width="90%">
            <FormLabel>Title</FormLabel>
            <InputGroup width="100%">
              <Input
                placeholder={details.description}
                value={details.description}
                _placeholder={{ color: "black" }}
                onChange={(e) =>
                  setDetails({ ...details, description: e.target.value })
                }
                as="textarea"
                height="auto"
                width="80%"
                overflowY="scroll"
              />
              <InputRightAddon paddingX="10px">
                {String(details.description).length}/1000
              </InputRightAddon>
            </InputGroup>
          </FormControl>
        ) : (
          <Text>{details.description}</Text>
        )}
        <Divider />
        <Text>
          Managed by {""}
          <Link
            to={`/users/${details.managedByUserId}`}
            style={{ textDecoration: "none", color: "limegreen" }}
          >
            {details.managedByUser.name}.
          </Link>
        </Text>

        <Table width="90%" border="2px solid black">
          <Thead backgroundColor="black">
            <Tr>
              <Td width="30%">Name</Td>
              <Td width="10%">Role</Td>
              <Td width="30%">Email</Td>
              <Td width="30%">Actions</Td>
            </Tr>
          </Thead>
          <Tbody>
            {details.members.map((member) => (
              <Tr key={member.user.id}>
                <Td>{member.user.name}</Td>
                <Td>{member.user.role}</Td>
                <Td>{member.user.email}</Td>
                <Td>
                  <HStack justifyContent="center">
                    <Link to={`/users/${member.user.id}`}>
                      <Button>Profile</Button>
                    </Link>
                    {userDetails.role === "MANAGER" ||
                    userDetails.role === "ADMIN" ? (
                      <Button onClick={() => handleRemoveUser(member.user.id)}>
                        Remove
                      </Button>
                    ) : null}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {updateState ? (
          <HStack width="90%">
            <Button onClick={() => getAndSetUsers()}>Add new members</Button>
            <FormControl width="70%">
              <FormLabel htmlFor="selectMembers">Select Members</FormLabel>
              <InputGroup>
                <select
                  size="3"
                  style={{ width: 100 + "%" }}
                  id="selectMembers"
                  multiple={true}
                  onChange={(e) => {
                    const selectedOptions = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setNewMembers((prevMembers) => {
                      let newMembersTemp = [...prevMembers];

                      selectedOptions.forEach((option) => {
                        if (!newMembersTemp.includes(option)) {
                          newMembersTemp.push(option);
                        }
                      });

                      newMembers.forEach((option) => {
                        if (!selectedOptions.includes(option)) {
                          newMembersTemp = newMembersTemp.filter(
                            (item) => item != option
                          );
                        }
                      });
                      return newMembersTemp;
                    });
                  }}
                >
                  {users.map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                      disabled={details.members.some(
                        (member) => member.user.id === user.id
                      )}
                    >
                      {user.name} - {user.role}
                    </option>
                  ))}
                </select>
              </InputGroup>
            </FormControl>
          </HStack>
        ) : null}
        <VStack marginBottom="15px">
          <Text>Actions</Text>
          <HStack width="90%">
            <Link to="/projects">
              <Button leftIcon={<IoMdArrowRoundBack />}>Back</Button>
            </Link>
            {userDetails.role === "ADMIN" || userDetails.role === "MANAGER" ? (
              <>
                {updateState ? (
                  <>
                    <Button
                      onClick={() => {
                        setUpdateState(false);
                        getAndSetDetails();
                      }}
                      rightIcon={<MdCancel />}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleUpdate()}
                      rightIcon={<MdSave />}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setUpdateState(true);
                    }}
                    rightIcon={<MdEdit />}
                  >
                    Update
                  </Button>
                )}
                <Button
                  onClick={() => handleDeleteProject(details.id)}
                  rightIcon={<MdDelete />}
                >
                  Delete
                </Button>
              </>
            ) : null}
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
}
