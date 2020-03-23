import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SplitText from "./SplitText";
import Typography from "@material-ui/core/Typography";
import "./styles.css";
import styled from "styled-components";
import anime from "animejs";

const StyledGrid = styled(Grid)`
  .paperTemplate {
    padding: 10px;
    text-align: "center";
    height: ${props => props.height};
    color: #333;
    border-radius: 0;
    background-color: ${props => props.bgColor || "palevioletred"};
    box-shadow: none;
  }
`;

const StyledSplitText = styled(SplitText)`
  position: relative;
  display: inline-block;
  padding-top: 0.2em;
  padding-right: 0.05em;
  padding-bottom: 0.1em;
  overflow: hidden;
`;

const StyledTypographyLeft = styled(Typography)`
  position: relative;
  display: inline-block;
  padding-top: 0.2em;
  padding-right: 0.05em;
  padding-bottom: 0.1em;
  overflow: hidden;
  top: 10vh;
  left: 5vw;
`;

const tl = anime.timeline({
  loop: true,
  delay: 1000
});

const animation = () => {
  tl.add({
    targets: ".textly .letter",
    translateY: ["1.1em", 0],
    translateZ: 0,
    opacity: [0, 1],
    duration: 750,
    easing: "spring(2, 100, 50, 25)",
    delay: (el, i) => 30 * i
  }).add({
    targets: "#dialogue1",
    opacity: 0,
    duration: 1000,
    easing: "easeInQuad"
  });
};

export default function SGridItemTemplate(props) {
  useEffect(() => {
    animation();
  });
  return (
    <StyledGrid
      item
      height={props.height}
      bgColor={props.bgColor}
      xs={12}
      sm={6}
    >
      <Paper className="paperTemplate">
        <StyledTypographyLeft
          component="span"
          className="textly"
          id="dialogue1"
          variant="body1"
          gutterBottom
        >
          <StyledSplitText
            className="textWrapper"
            copy={props.title}
            role="heading"
          />
        </StyledTypographyLeft>
      </Paper>
    </StyledGrid>
  );
}
