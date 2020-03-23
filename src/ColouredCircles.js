import React, { useRef, useEffect, useState, Fragment } from "react";
import useWindowDimensions from "./GetWindowDimensions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import "./styles.css";
import anime from "animejs";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 10vh;
  left: 10vh;
  z-index: 10;
  color: white;
`;

export default function ColouredCircles() {
  const canvasRef = useRef(null);
  const { height, width } = useWindowDimensions();
  const [closeClicked, setCloseClicked] = useState(false);
  const [lastClickedPos, setLastClickedPos] = useState({ x: 0, y: 0 });

  function fauxClick(x, y) {
    var fauxClick = new Event("mousedown");
    fauxClick.pageX = x;
    fauxClick.pageY = y;
    document.dispatchEvent(fauxClick);
    console.log("fauxClickRun");
  }

  useEffect(() => {
    var c = canvasRef.current;
    var ctx = c.getContext("2d");
    var cH;
    var cW;
    var lastBgColor = "";
    var bgColor = "#FF6138";
    var animations = [];
    var circles = [];
    var lastStartingPoint = { x: 0, y: 0 };
    var currentlyExpanded = false;

    var colorPicker = (function() {
      var colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
      var index = 0;
      function next() {
        index = index++ < colors.length - 1 ? index : 0;
        return colors[index];
      }
      function current() {
        return colors[index];
      }
      return {
        next: next,
        current: current
      };
    })();

    function removeAnimation(animation) {
      var index = animations.indexOf(animation);
      if (index > -1) animations.splice(index, 1);
    }

    function calcPageFillRadius(x, y) {
      var l = Math.max(x - 0, cW - x);
      var h = Math.max(y - 0, cH - y);
      return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
    }

    function addClickListeners() {
      document.addEventListener("touchstart", handleEvent);
      document.addEventListener("mousedown", handleEvent);
    }

    function handleEvent(e) {
      currentlyExpanded ? handleEventClose(e) : handleEventOpen(e);
    }

    const clickPosition = e => {
      var x = e.pageX;
      var y = e.pageY;
      lastStartingPoint = { x, y };
      console.log(lastStartingPoint);
    };

    function handleEventOpen(e) {
      if (e.touches) {
        e.preventDefault();
        e = e.touches[0];
      }
      lastBgColor = bgColor;
      var nextColor = colorPicker.next();
      var targetR = calcPageFillRadius(e.pageX, e.pageY);
      var minCoverDuration = 750;
      var pageFill = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: nextColor
      });
      var fillAnimation = anime({
        targets: pageFill,
        r: targetR,
        duration: Math.max(targetR / 2, minCoverDuration),
        easing: "easeOutQuart",
        complete: function() {
          bgColor = pageFill.fill;
          clickPosition(e);
          removeAnimation(fillAnimation);
        }
      });
      animations.push(fillAnimation);
      currentlyExpanded = true;
    }

    function handleEventClose(e) {
      if (e.touches) {
        e.preventDefault();
        e = e.touches[0];
      }
      var currentColor = colorPicker.current();
      var nextColor = colorPicker.next();
      var targetR = calcPageFillRadius(e.pageX, e.pageY);
      var minCoverDuration = 750;
      bgColor = lastBgColor;
      var lastCircle = new Circle({
        x: lastStartingPoint.x,
        y: lastStartingPoint.y,
        r: targetR,
        fill: currentColor
      });
      var shrinkAnimation = anime({
        targets: lastCircle,
        r: 0,
        duration: Math.max(targetR / 2, minCoverDuration),
        easing: "easeOutQuart",
        complete: function() {
          removeAnimation(shrinkAnimation);
        }
      });
      animations.push(shrinkAnimation);
      currentlyExpanded = false;
    }

    function extend(a, b) {
      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          a[key] = b[key];
        }
      }
      return a;
    }

    var Circle = function(opts) {
      extend(this, opts);
    };

    Circle.prototype.draw = function() {
      ctx.globalAlpha = this.opacity || 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      if (this.stroke) {
        ctx.strokeStyle = this.stroke.color;
        ctx.lineWidth = this.stroke.width;
        ctx.stroke();
      }
      if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
      }
      ctx.closePath();
      ctx.globalAlpha = 1;
    };

    var animate = anime({
      duration: Infinity,
      update: function() {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, cW, cH);
        animations.forEach(function(anim) {
          anim.animatables.forEach(function(animatable) {
            animatable.target.draw();
          });
        });
      }
    });

    var resizeCanvas = function() {
      cW = window.innerWidth;
      cH = window.innerHeight;
      c.width = cW;
      c.height = cH;
      //ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    (function init() {
      resizeCanvas();
      console.log("init ran");
      if (window.CP) {
        // CodePen's loop detection was causin' problems
        // and I have no idea why, so...
        window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;
      }
      window.addEventListener("resize", resizeCanvas);
      addClickListeners();
      if (!!window.location.pathname.match(/fullcpgrid/)) {
      }
    })();
  });

  return (
    <Fragment>
      <Typography>
        width: {width} ~ height: {height} ~ wDPR: {window.devicePixelRatio}
      </Typography>
      <Typography>
        width: {window.innerWidth} ~ height: {window.innerHeight}
      </Typography>
      <StyledIconButton
        onClick={() => {
          fauxClick(200, 200);
        }}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <CloseIcon />
      </StyledIconButton>
      <canvas
        onClick={e => setLastClickedPos({ x: e.clientX, y: e.clientY })}
        ref={canvasRef}
        id="c"
      />
    </Fragment>
  );
}
