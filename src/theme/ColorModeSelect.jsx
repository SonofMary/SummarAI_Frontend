import { useState } from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function ColorModeSelect() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    document.body.style.background = mode === "light" ? "#121212" : "#fff";
  };

  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === "light" ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}
