import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Card, CardContent } from "@material-ui/core";

gsap.registerPlugin(Draggable);

function DraggableComponent() {
  let drag = useRef(null);
  let path = useRef(null);

  useEffect(() => {
    let pathLength = path.current.getTotalLength();
    // let startPoint=path.current.getPointAtLength(0);
    let years = 1929,
      parts = [];
    function splitpath() {
      for (var i = 0; i < pathLength - 15; i += 5) {
        parts.push(years);
        years++;
      }
      // console.log(parts);
    }
    splitpath();

    function printYear(point) {
      document.getElementById("demo").innerHTML = parts[point];
    }

    function knowPoint(value) {
      // console.log(Math.round(value / 5) * 5);

      printYear((Math.round(value / 5) * 5) / 5);
      return Math.round(value / 5) * 5;
    }

    Draggable.create(drag.current, {
      liveSnap: knowPoint,

      type: "x",
      bounds: path.current,
    });
  });

  return (
    <Card>
      <CardContent>
        <svg
          width="539"
          height="397"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            id="poster"
            x="90"
            y="100"
            height="200"
            width="475"
            fill="yellow"
          />

          <g>
            <path
              id="path"
              ref={path}
              d="M90 300 h 475"
              fill="red"
              stroke="red"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <circle
              id="drag"
              ref={drag}
              cx="100"
              cy="300"
              r="10"
              stroke="black"
              strokeWidth="3"
              fill="green"
            />
          </g>
        </svg>
        <p id="demo"></p>
      </CardContent>
    </Card>
  );
}

export default DraggableComponent;
