import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./styles.css";
import styled from "styled-components";
import useWindowDimensions from "./GetWindowDimensions";

const StyledGrid = styled(Grid)``;

const StyledPaper1 = styled(Paper)`
  padding: 10px;
  text-align: "center";
  height: 500px;
  color: #333;
  border-radius: 0;
  background-color: #ef9a9a;
  box-shadow: none;
`;

const StyledPaper2 = styled(Paper)`
  padding: 10px;
  text-align: "center";
  height: 500px;
  color: #333;
  border-radius: 0;
  background-color: #e1bee7;
  box-shadow: none;
`;

const StyledPaper3 = styled(Paper)`
  padding: 10px;
  text-align: "center";
  height: 500px;
  color: #333;
  border-radius: 0;
  background-color: #c5cae9;
  box-shadow: none;
`;

export default function ShowcaseGrid() {
  const { height, width } = useWindowDimensions();

  return (
    <StyledGrid container spacing={0}>
      <Grid item xs={12}>
        <StyledPaper1>
          width: {width} ~ height: {height}
        </StyledPaper1>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledPaper2 xs={6}>xs=6</StyledPaper2>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledPaper3>xs=6</StyledPaper3>
      </Grid>
      <Grid item xs={3}>
        <StyledPaper1>xs=3</StyledPaper1>
      </Grid>
      <Grid item xs={3}>
        <StyledPaper2>xs=3</StyledPaper2>
      </Grid>
      <Grid item xs={3}>
        <StyledPaper3>xs=3</StyledPaper3>
      </Grid>
      <Grid item xs={3}>
        <StyledPaper1>xs=3</StyledPaper1>
      </Grid>
    </StyledGrid>
  );
}
