import { useColor } from "color-thief-react";

export default function useDominantColor(image) {
  const { data: color, loading } = useColor(image, "hex", {
    crossOrigin: "anonymous",
  });
  return loading ? "#000000" : color || "#000000";
}
