import { useEffect, useState } from "react";
import {
  deleteTicket,
  getTicketById,
  updateTicket,
} from "../services/TicketService";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Flex,
  HStack,
  VStack,
  Text,
  Spacer,
  Divider,
  Select,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightAddon,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { getProjectMembers } from "../services/ProjectService";

export default function TicketComponent({ userDetails }) {
  const [details, setDetails] = useState(null);
  const [updateState, setUpdateState] = useState(false);
  const { id } = useParams();
  const [projectMembers, setProjectMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAndSetDetails();
  }, [id]);

  async function getAndSetDetails() {
    try {
      const response = await getTicketById(id);
      setDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!details) {
    return <div>Page is loading, please wait...</div>;
  }

  async function handleUpdate() {
    try {
      const response = await updateTicket(id, details);
      setUpdateState(false);
      getAndSetDetails();
    } catch (error) {
      console.error(error);
    }
  }

  async function getAndSetProjectInfo() {
    await getProjectMembers(details.projectId)
      .then((response) => {
        console.log(response.data);
        setProjectMembers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function isInputValid() {
    if (
      String(details.description).length > 1000 ||
      String(details.title).length > 300
    ) {
      return false;
    }
    return true;
  }

  async function handleDeleteTicket(ticketId) {
    try {
      await deleteTicket(ticketId);
      navigate("/tickets");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex justifyContent="center">
      <VStack
        width="60%"
        border="1px solid black"
        boxShadow="0px 0px 10px 10px black"
        zIndex="1"
        marginTop="30px"
        paddingY="10px"
      >
        {updateState &&
        (userDetails.role === "ADMIN" ||
          (userDetails.role === "TESTER" &&
            details.createdByUserId === userDetails.userId)) ? (
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
              />
              <InputRightAddon paddingX="10px">
                {String(details.title).length}/300
              </InputRightAddon>
            </InputGroup>
          </FormControl>
        ) : (
          <Heading size="lg">{details.title}</Heading>
        )}
        <Divider />
        <VStack alignItems="flex-start" width="90%">
          <Text textDecoration="none">
            Created by{" "}
            <Link to={`/users/${details.createdByUserId}`}>
              {details.createdBy.name}
            </Link>{" "}
            on {""}
            {format(new Date(details.createdOn), "dd.MM.yyyy HH:mm:ss")}.
          </Text>

          {updateState &&
          (userDetails.role === "ADMIN" ||
            (userDetails.role === "TESTER" &&
              details.createdByUserId === userDetails.userId)) ? (
            <HStack width="100%">
              <Text>Assign to </Text>
              <Select
                onClick={() => getAndSetProjectInfo()}
                value={details.assignedToUserId}
                onChange={(e) => {
                  setDetails({
                    ...details,
                    assignedToUserId: e.target.value,
                  });
                }}
                width="60%"
                alignSelf="center"
              >
                <option disabled value="">
                  Choose developer
                </option>

                {projectMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} - {member.role}
                  </option>
                ))}
              </Select>
            </HStack>
          ) : (
            <Text>
              Assigned to{" "}
              <Link to={`/users/${details.assignedToUserId}`}>
                {details.assignedTo.name}
              </Link>
              .
            </Text>
          )}

          <Text>
            Project:{" "}
            <Link to={`/projects/${details.projectId}`}>
              {details.project.title.length > 80
                ? String(details.project.title).substring(0, 80) + "..."
                : details.project.title}
            </Link>
            .
          </Text>
        </VStack>

        <Divider bg="black" />
        {updateState &&
        (userDetails.role === "ADMIN" ||
          (userDetails.role === "TESTER" &&
            details.createdByUserId === userDetails.userId)) ? (
          <FormControl justifyContent="center" width="90%">
            <FormLabel>Description</FormLabel>
            <InputGroup width="100%">
              <Input
                placeholder={details.description}
                value={details.description}
                _placeholder={{ color: "black" }}
                onChange={(e) =>
                  setDetails({ ...details, description: e.target.value })
                }
                as={"textarea"}
                height="auto"
                width="80%"
              />
              <InputRightAddon paddingX="10px">
               {String(details.description).length}/1000
              </InputRightAddon>
            </InputGroup>
          </FormControl>
        ) : (
          <Text width="90%">{details.description}</Text>
        )}
        <Divider bg="black" />
        <HStack width="90%">
          {updateState &&
          (userDetails.role === "ADMIN" ||
            (userDetails.role === "TESTER" &&
              details.createdByUserId === userDetails.userId)) ? (
            <FormControl>
              <FormLabel>Priority</FormLabel>
              <InputGroup>
                <Select
                  value={details.priority}
                  onChange={(e) => {
                    setDetails({
                      ...details,
                      priority: e.target.value,
                    });
                  }}
                  width="50%"
                >
                  <option disabled>Select priority</option>
                  <option>LOW</option>
                  <option>MEDIUM</option>
                  <option>HIGH</option>
                </Select>
              </InputGroup>
            </FormControl>
          ) : (
            <VStack>
              <Text>Priority</Text>
              <Text
                color={
                  details.priority === "HIGH"
                    ? "red"
                    : details.priority === "MEDIUM"
                    ? "orange"
                    : "yellow"
                }
              >
                {details.priority}
              </Text>
            </VStack>
          )}
          <Spacer />
          {updateState &&
          (userDetails.role === "ADMIN" ||
            (userDetails.role === "TESTER" &&
              details.createdByUserId === userDetails.userId) ||
            (userDetails.role === "DEVELOPER" &&
              userDetails.userId === details.assignedToUserId)) ? (
            <FormControl width="50%">
              <FormLabel>Status</FormLabel>
              <InputGroup>
                <Select
                  value={details.status}
                  onChange={(e) => {
                    setDetails({
                      ...details,
                      status: e.target.value,
                    });
                  }}
                >
                  <option disabled>Select status</option>
                  <option>CREATED</option>
                  <option>IN_PROGRESS</option>
                  <option>SOLVED</option>
                </Select>
              </InputGroup>
            </FormControl>
          ) : (
            <VStack>
              <Text>Status:</Text>
              <Text
                color={
                  details.status === "CREATED"
                    ? "yellow"
                    : details.status === "IN_PROGRESS"
                    ? "orange"
                    : "red"
                }
              >
                {details.status}
              </Text>
            </VStack>
          )}
        </HStack>
        <HStack>
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
                isDisabled={!isInputValid()}
              >
                {!isInputValid() ? (
                  <Text textColor="red">
                    To many characters, try to reduce your fields
                  </Text>
                ) : (
                  "Save"
                )}
              </Button>
            </>
          ) : (
            <>
              <Link to="/tickets">
                <Button leftIcon={<IoMdArrowRoundBack />}>Go back</Button>
              </Link>
              {userDetails.role === "ADMIN" ||
              (userDetails.role === "TESTER" &&
                details.createdByUserId === userDetails.userId) ||
              (userDetails.role === "DEVELOPER" &&
                details.assignedToUserId === userDetails.userId) ? (
                <Button
                  onClick={() => setUpdateState(true)}
                  rightIcon={<MdEdit />}
                >
                  Edit
                </Button>
              ) : null}
            </>
          )}
          {userDetails.role === "ADMIN" ||
          (userDetails.role === "TESTER" &&
            details.createdByUserId === userDetails.userId) ? (
            <Button
              rightIcon={<FaTrashCan />}
              onClick={() => handleDeleteTicket(id)}
            >
              Delete
            </Button>
          ) : null}
        </HStack>
      </VStack>
    </Flex>
  );
}
