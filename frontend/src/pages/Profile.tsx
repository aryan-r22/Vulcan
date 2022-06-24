import { Box } from "@mui/material";
import React from "react";
import Banner from "../components/Banner";
import ProjectInfoBackerLayout from "../layouts/ProjectInfoBackerLayout";

type Props = {};

const Profile = (props: Props) => {
  return (
    <Box>
      <Banner heading={"My Portfolio"} />
      <ProjectInfoBackerLayout />
    </Box>
  );
};

export default Profile;
