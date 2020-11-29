import React from "react";
import { Spring, Transition, animated } from "react-spring/renderprops";
import "./style.css";

const hide = { opacity: 0 };
const show = { opacity: 1 };
export default class FlipCard extends React.Component {
  state = { flipped: false };
  click = () => this.setState((state) => ({ flipped: !state.flipped }));
  render() {
    const { flipped } = this.state;
    const { front, back, height = 200, width = 200 } = this.props;
    return (
      <Spring
        native
        to={{
          transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        }}
      >
        {(props) => (
          <animated.div
            class="flipCard"
            onClick={this.click}
            style={{ height: height, width: width, ...props }}
          >
            <Transition
              native
              unique
              items={flipped}
              from={hide}
              enter={show}
              leave={hide}
            >
              {(flipped) => ({ opacity }) => (
                <animated.div
                  style={{
                    transform: `rotateX(${flipped ? 180 : 0}deg)`,
                    opacity: opacity.interpolate({
                      range: [0, 0.5, 1],
                      output: [0, 0, 1],
                    }),
                  }}
                >
                  {flipped ? back : front}
                </animated.div>
              )}
            </Transition>
          </animated.div>
        )}
      </Spring>
    );
  }
}
