import { Grid, styled } from "@mui/material";
import Box from "@mui/material/Box";
import BannerImage from "../assets/banner.png";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  heading: string;
};

const StyledImg = styled("img")(({ theme }) => ({
  borderRadius: 10,
  boxShadow: "0 0 10px #000",
}));

const Banner = ({ heading }: Props) => {
  const matches = useMediaQuery("(min-width:600px)");

  const StyledText = styled("div")(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: `${matches ? "24px" : "12px"}`,
    fontWeight: "600",
    textAlign: "center",
  }));

  return (
    <Box flexGrow={1} marginY={2}>
      <Grid container justifyContent={"center"}>
        <Grid sx={{ position: "relative" }} item xs={12} md={12}>
          <StyledImg width="100%" src={BannerImage} alt="Banner" />
          <StyledText>{heading}</StyledText>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Banner;
