import React, { Fragment, useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ReplayIcon from "@material-ui/icons/Replay";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./styles.css";
import anime from "animejs";
import styled from "styled-components";

const StyledBox = styled(Box)`
  display: inline-block;
  line-height: 1em;
  white-space: pre;
  will-change: transform;
`;

export default function SplitText(props) {
  return (
    <Typography component="span" aria-label={props.copy} role={props.role}>
      {props.copy.split("").map(function(char, index) {
        return (
          <StyledBox
            component="span"
            className="letter"
            aria-hidden="true"
            key={index}
          >
            {char}
          </StyledBox>
        );
      })}
    </Typography>
  );
}
