import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ProjectCard from "../components/ProjectCard";

type Props = {
  projectGroup: string;
};

const ProjectsLayout = ({ projectGroup }: Props) => {
  return (
    <Box flexGrow={1} paddingY={2}>
      <Grid container justifyContent={"space-between"}>
        <Typography sx={{ color: "#fff" }} variant="h5">
          {projectGroup}
        </Typography>
        <Typography sx={{ color: "#fff" }}>See all</Typography>
      </Grid>
      <Grid container spacing={4} paddingY={2}>
        {[1, 2, 3].map((idx) => {
          return (
            <Grid key={idx} item xs={12} sm={6} md={4} xl={3}>
              <ProjectCard />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProjectsLayout;
