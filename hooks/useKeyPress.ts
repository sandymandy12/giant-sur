import { useState, useEffect } from "react";

export const useKeyPress = (
  targetKey: string,
  element: HTMLInputElement,
  metaKey?: string
) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleKeyup = (event: any) => {
      if (event.key === targetKey && (!metaKey || event[metaKey])) {
        isPressed ? element.focus() : element.blur();
        console.log(isPressed ? "hotkey [OFF]" : "hotkey [ON]");
        setIsPressed((prev) => !prev);
      }
    };

    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [isPressed]);

  return { isPressed, setIsPressed };
};
