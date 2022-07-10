import { Box, Grid, LinearProgress } from "@mui/material";
import React from "react";

type Props = {
  loading: boolean;
};

const Loader = ({ loading }: Props) => {
  return loading ? (
    <Grid>
      <LinearProgress />
    </Grid>
  ) : (
    <div></div>
  );
};

export default Loader;
