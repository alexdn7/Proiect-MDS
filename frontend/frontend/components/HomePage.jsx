import React, { useState, useEffect } from "react";
import { Flex, VStack, Heading, Grid, GridItem } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { getTicketsCount } from "../services/TicketService";
import { getUsersCount } from "../services/UserService";
import { PieChart } from "@mui/x-charts/PieChart";
import { getProjectsCount } from "../services/ProjectService";

export default function HomePage({ userDetails }) {
  const [ticketsCount, setTicketsCount] = useState(0);
  const [usersCount, setUsersCount] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsResponse = await getTicketsCount();
        const usersResponse = await getUsersCount();
        const projectsResponse = await getProjectsCount();

        setTicketsCount(ticketsResponse.data);
        setUsersCount(usersResponse.data.counts);
        setProjectsCount(projectsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex justifyContent="center" height="100%" minHeight="fit-content">
      <VStack
        alignSelf="center"
        width="70%"
        minWidth="fit-content"
        marginTop="30px"
        border="2px solid black"
        borderRadius="20px"
        boxShadow="5px 5px 5px 5px black"
        padding="10px"
      >
        <h1 style={{ textShadow: "5px 7p10px 5px black", margin: "0" }}>
          Welcome back, {userDetails.name}!
        </h1>

        <Grid
          templateColumns="1fr 1fr"
          gap="20px"
          width="95%"
          minWidth="fit-content"
        >
          <GridItem
            key="usersCount"
            border="2px solid black"
            boxShadow="5px 5px 5px 5px black"
            padding="20px"
            bg="green"
          >
            <VStack>
              {usersCount.length > 0 ? (
                <>
                  <Heading margin="0">
                    {usersCount[4].total} users in total.
                  </Heading>
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: usersCount[0].count,
                            label: "Admins",
                          },
                          {
                            id: 1,
                            value: usersCount[1].count,
                            label: "Testers",
                          },
                          {
                            id: 2,
                            value: usersCount[2].count,
                            label: "Developers",
                          },
                          {
                            id: 3,
                            value: usersCount[3].count,
                            label: "Managers ",
                          },
                        ],
                      },
                    ]}
                    width={500}
                    minWidth="fit-content"
                    height={200}
                  />
                </>
              ) : (
                <span>Loading...</span>
              )}
            </VStack>
          </GridItem>

          <GridItem
            key="ticketsByStatusCount"
            border="2px solid black"
            boxShadow="5px 5px 5px 5px black"
            padding="20px"
            bg="green"
          >
            <VStack>
              {ticketsCount &&
              ticketsCount.counts &&
              ticketsCount.counts.length > 0 ? (
                <>
                  <Heading margin="0">
                    {ticketsCount.counts[2].total} tickets in total.
                  </Heading>
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,

                            value: ticketsCount.counts[0][0].count,
                            label: "Created",
                          },
                          {
                            id: 1,
                            value: ticketsCount.counts[0][1].count,
                            label: "In progress",
                          },
                          {
                            id: 2,
                            value: ticketsCount.counts[0][2].count,
                            label: "Solved",
                          },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                </>
              ) : (
                <span>Loading...</span>
              )}
            </VStack>
          </GridItem>

          <GridItem
            key="ticketsByPriorityCount"
            border="2px solid black"
            boxShadow="5px 5px 5px 5px black"
            padding="20px"
            bg="green"
          >
            <VStack>
              {ticketsCount &&
              ticketsCount.counts &&
              ticketsCount.counts.length > 0 ? (
                <>
                  <Heading margin="0">
                    {ticketsCount.counts[2].total} tickets in total.
                  </Heading>
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,

                            value: ticketsCount.counts[1][0].count,
                            label: "LOW",
                          },
                          {
                            id: 1,
                            value: ticketsCount.counts[1][1].count,
                            label: "Medium",
                          },
                          {
                            id: 2,
                            value: ticketsCount.counts[1][2].count,
                            label: "High",
                          },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                </>
              ) : (
                <span>Loading...</span>
              )}
            </VStack>
          </GridItem>

          <GridItem
            key="projectsCount"
            border="2px solid black"
            boxShadow="5px 5px 5px 5px black"
            padding="20px"
            bg="green"
          >
            {projectsCount ? (
              <Heading>
                There are {projectsCount.total} project(s) in total
              </Heading>
            ) : (
              <span>Loading...</span>
            )}
          </GridItem>
        </Grid>
      </VStack>
    </Flex>
  );
}
