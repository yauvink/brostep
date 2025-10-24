import { Box, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

function MenuButton({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "10px",
        right: "20px",
        zIndex: 100,
      }}
    >
      <IconButton
        color="inherit"
        onClick={onClick}
        sx={{
          color: "#333",
          padding: 0,
          border: "2px solid rgba(0,0,0,0.5)",
          backgroundColor: "rgba(255,255,255,0.5)",
          width: "50px",
          height: "50px",
          marginRight: "10px",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
}

export default MenuButton;
