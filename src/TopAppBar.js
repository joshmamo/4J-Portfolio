import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SplitText from "./SplitText.js";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  background-color: #1a1a1a;
  position: relative;
  color: white;
  box-shadow: none;
  display: flex;
  justify-content: center;
  & .MuiAppBar-root {
  }
`;

const StyledSplitText = styled(SplitText)`
  flex-grow: 1;
`;

const StyledType = styled(Typography)`
  flex-grow: 1;
`;

const StyledIconButton = styled(IconButton)`
  opacity: 0;
  cursor: default;
`;

export default function TopAppBar() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledIconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </StyledIconButton>
        <StyledSplitText
          className="textWrapper"
          copy="4J Showcase"
          role="heading"
        />
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </StyledAppBar>
  );
}
