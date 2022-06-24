import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, styled } from "@mui/material";
import CardImage from "../assets/cardImg.png";

type Props = {
  backer?: boolean;
};

const ProjectCard = ({ backer }: Props) => {
  const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: "400px",
    borderRadius: `${backer ? "0px" : "20px"}`,
    boxShadow: `${backer ? "0" : "0px 10px 20px rgba(0, 0, 0, 0.5)"}`,
  }));

  const StyledCardContent = styled(CardContent)(({ theme }) => ({
    background:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), conic-gradient(from 187.44deg at 50.78% 32.63%, #F449F4 0deg, #0019C0 148.13deg, #7976E8 250.02deg, #F449F4 360deg)",
    boxShadow: "inset 0px 1px 0px rgba(255, 255, 255, 0.7)",
    color: "#fff",
  }));

  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia component="img" height="140" image={CardImage} />
        <StyledCardContent>
          <Typography sx={{ color: "#fff" }} gutterBottom variant="h5" component="div">
            VR
          </Typography>
          <Typography sx={{ color: "#fff" }} variant="body2">
            Great place to hang out and meet new fans. Always sharing the newest info.
          </Typography>
          <Box display="flex" sx={{ marginTop: "12px", justifyContent: "space-between" }}>
            <Typography sx={{ color: "#ddd" }} variant="body2">
              109,789 Online
            </Typography>
            <Typography sx={{ color: "#ddd" }} variant="body2">
              109,789 Members
            </Typography>
          </Box>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProjectCard;
