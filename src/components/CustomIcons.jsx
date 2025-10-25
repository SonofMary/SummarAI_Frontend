import { Box } from "@mui/material";
import { Facebook, Google, Twitter } from "@mui/icons-material";

export default function CustomIcons() {
  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
      <Facebook sx={{ cursor: "pointer" }} />
      <Google sx={{ cursor: "pointer" }} />
      <Twitter sx={{ cursor: "pointer" }} />
    </Box>
  );
}
