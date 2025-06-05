// ### Colors

// - Black: `rgba(0, 0, 0, 0.8)`
// - Green: `rgb(93, 175, 116)`
// - White: `rgb(255, 255, 255)`

type ColorProps = "Black" | "Green" | "White";

const Colors: Record<ColorProps, string> = {
  Black: `rgba(0, 0, 0, 0.8)`,
  Green: `rgb(93, 175, 116)`,
  White: `rgb(255, 255, 255)`,
};

export type { ColorProps };

export { Colors };
