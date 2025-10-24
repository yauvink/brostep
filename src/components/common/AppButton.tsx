import React, { useMemo } from "react";
import { Box, Button } from "@mui/material";

export enum AppButtonType {
  BLUE = "blue",
  YELLOW = "yellow",
  GREEN = "green",
  RED = "red",
}

function AppButton({
  children,
  disabled,
  type,
  onClick,
}: {
  disabled?: boolean;
  type: AppButtonType;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const styles = useMemo(() => {
    switch (type) {
      case AppButtonType.BLUE: {
        return {
          background: "linear-gradient(180deg,#4c80af,#4074a3)",
          boxShadow:
            "inset 0 -5px 0 0 #2b5b8b,0 3px 0 0 rgba(0,0,0,.3),inset 0 -6px 0 0 #4b7eac,inset 0 1px 0 0 #5d90bb",
        };
      }
      case AppButtonType.YELLOW: {
        return {
          background: "#ffb800",
          boxShadow:
            "inset 0 -2px 2px 0 #cd6b00,inset 0 -5px 0 0 #bb6201,0 3px 0 0 rgba(0,0,0,.3),inset 0 -6px 0 0 #d78600,inset 0 1px 0 0 #ffdd36",
        };
      }
      case AppButtonType.GREEN: {
        return {
          background: "#73d600",
          boxShadow:
            "inset 0 -2px 2px 0 #367405,inset 0 -5px 0 0 #2a6200,inset 0 1px 0 0 #9fff00,inset 0 -6px 0 0 #5a9f0d,inset 0 -7px 2px 0 #80cb31",
        };
      }
      case AppButtonType.RED: {
        return {
          background: "linear-gradient(rgb(252, 102, 55), rgb(207, 59, 30))",
          boxShadow:
            "rgb(148, 34, 0) 0px -2px 0px 0px inset, rgb(148, 34, 0) 0px -3px 0px 0px inset, rgb(196, 87, 55) 0px 1px 0px 0px inset",
        };
      }
    }
  }, [type]);
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sx={{
        border: "2px solid rgba(0,9,38,.698)",
        borderRadius: "8px",
        background: styles.background,
        boxShadow: styles.boxShadow,
        padding: "5px 4px 10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderRadius: "6px",
          boxShadow: "0 0 10px 1px rgba(0,0,0,.4)",
          color: "white",
          padding: "5px 15px 2px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            background: "hsla(0,0%,100%,.8)",
            borderRadius: "10px 1px",
            width: "7px",
            height: "7px",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        ></Box>
        {children}
      </Box>
    </Button>
  );
}

export default React.memo(AppButton);
