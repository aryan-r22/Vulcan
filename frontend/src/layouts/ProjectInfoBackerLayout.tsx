import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ProjectCard from "../components/ProjectCard";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {};

const ProjectInfoBackerLayout = (props: Props) => {
  const matches = useMediaQuery("(min-width:1000px)");

  return (
    <Box flexGrow={1} paddingY={2}>
      <Grid container justifyContent={"space-between"}>
        <Typography sx={{ color: "#fff" }} variant="h5">
          {"My Backed Projects"}
        </Typography>
        <Typography sx={{ color: "#fff" }}>See all</Typography>
      </Grid>
      <Grid container spacing={4} marginLeft={0} width="100%" paddingY={2}>
        {[1, 2, 3].map((idx) => {
          return (
            <Grid key={idx} item width="100%" sx={{ paddingLeft: "0 !important" }}>
              <Box
                display={"flex"}
                sx={{
                  boxShadow: `${idx % 2 ? "0px 10px 20px rgba(0, 0, 0, 0.5)" : ""}`,
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <ProjectCard backer />
                  </Grid>
                  <Grid item xs={12} sm>
                    <Box
                      display="flex"
                      flexDirection="column"
                      padding={matches ? 8 : 2}
                      justifyContent="space-around"
                      height="100% !important"
                      sx={{ background: `${idx % 2 ? "#2C2F48" : "transparent"}` }}
                    >
                      <Typography variant="h6" fontWeight={600} sx={{ color: "#fff" }}>
                        INVESTMENT SUMMARY
                      </Typography>
                      <Typography sx={{ color: "#fff" }}>Type: Utility Token</Typography>
                      <Typography sx={{ color: "#fff" }}>Valuation (pre-money): £1.2M</Typography>
                      <Typography sx={{ color: "#fff" }}>Tokens offered: 5.74%</Typography>
                      <Typography sx={{ color: "#fff" }}>Token price: £0.96</Typography>
                      <Typography sx={{ color: "#fff" }}>SEIS</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProjectInfoBackerLayout;
