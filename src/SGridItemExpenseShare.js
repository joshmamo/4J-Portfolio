import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./styles.css";
import styled from "styled-components";

const StyledPaper1 = styled(Paper)`
  padding: 10px;
  text-align: "center";
  height: 500px;
  color: #333;
  border-radius: 0;
  background-color: #ef9a9a;
  box-shadow: none;
`;

export default function SGridItemTemplate(props) {
  return (
    <Grid item xs={6}>
      <StyledPaper1>{props.title}</StyledPaper1>
    </Grid>
  );
}
