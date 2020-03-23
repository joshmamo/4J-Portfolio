import React from "react";
import ColouredCircles from "./ColouredCircles";
import TopAppBar from "./TopAppBar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./styles.css";
import styled from "styled-components";
import ShowcaseGrid from "./ShowcaseGrid";
import SGridItemTemplate from "./SGridItemTemplate";
import SGridItemExpenseShare from "./SGridItemExpenseShare";

const StyledTypography = styled(Typography)`
  display: inline;
  position: relative;
`;

const StyledColouredCircles = styled(ColouredCircles)``;

export default function App() {
  return (
    <div className="App">
      <TopAppBar />
      {/* <StyledColouredCircles /> */}
      <Grid container spacing={0}>
        <SGridItemTemplate
          height="80vh"
          bgColor="#e1bee7"
          title="Test Grid Item Props"
        />

        <SGridItemTemplate
          height="80vh"
          bgColor="#c5cae9"
          title="Test Grid Item Props #2"
        />
        <SGridItemExpenseShare title="Test Grid Item Props2" />
      </Grid>
    </div>
  );
}
