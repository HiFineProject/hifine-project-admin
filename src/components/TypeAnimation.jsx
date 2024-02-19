import { TypeAnimation } from "react-type-animation";

const AnimationComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "W",
        1000,
        "Welcome to",
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "Welcome to Admin HiFine",
        1000,
        "Welcome to Admin HiFine. Data is the fuel",
        1000,
        "Welcome to Admin HiFine. Data is the fuel and power to drive innovative products and services.",
        1000,
      ]}
      wrapper="span"
      speed={30}
      style={{ fontSize: "2em", display: "inline-block" }}
      repeat={Infinity}
    />
  );
};

export default AnimationComponent;
