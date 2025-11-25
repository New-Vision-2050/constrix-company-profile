interface GradientOverlayProps {
  backgroundColor?: string;
  borderRadius?: string;
}

/**
 * A reusable gradient overlay component that renders a positioned absolute layer with customizable gradient background.
 * Commonly used as an overlay effect on cards, images, or containers.
 * 
 * @param {string} backgroundColor - The gradient or solid color background. Defaults to linear gradient from black to white (top to bottom)
 * @param {string} borderRadius - The border radius to match the parent container. Defaults to "10px"
 * @returns {JSX.Element} An absolutely positioned div with gradient overlay effect
 * 
 * @example
 * <GradientOverlay backgroundColor="linear-gradient(to bottom, #000000, #ffffff)" borderRadius="10px" />
 */
export default function GradientOverlay({
  backgroundColor = "linear-gradient(to bottom, #000000, #ffffff)",
  borderRadius = "10px",
}: GradientOverlayProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: "hidden",
        borderRadius: borderRadius,
        background: backgroundColor,
        transition: "opacity 0.3s ease-in-out",
      }}
    ></div>
  );
}
