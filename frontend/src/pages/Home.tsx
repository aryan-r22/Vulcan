import { Box } from "@mui/material";
import React from "react";
import Banner from "../components/Banner";
import ProjectsLayout from "../layouts/ProjectsLayout";

type Props = {};

const Home = (props: Props) => {
  return (
    <Box>
      <Banner heading={"Find your VcFi community"} />
      <ProjectsLayout projectGroup="Featured Projects" />
      <ProjectsLayout projectGroup="Popular Right Now" />
      <ProjectsLayout projectGroup="Recently Added" />
    </Box>
  );
};

export default Home;
