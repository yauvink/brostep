import { Box } from "@mui/material";
import { motion } from "framer-motion";

function DetectingAnimation() {
  return (
    <Box
      sx={{
        // border: '2px solid red',
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20000,
        "& .motionDiv": {
          // border: '1px solid red',
        },
      }}
    >
      <motion.div
        className="motionDiv"
        animate={{
          x: [-70, 80, 120, -40, 0, -70],
          y: [-70, -30, 40, 60, -20, -70],
          // x: xArray,
          // y: yArray,
          // rotate: [0, 20, -20, 10, 0],
          rotate: [0, 20, -20, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          // ease: 'easeInOut',
          ease: "linear",
          // repeatDelay: 1,
        }}
      >
        <Box
          sx={{
            // border: "1px solid green",
            fontSize: "100px",
          }}
        >
          🔍︎
        </Box>
      </motion.div>
    </Box>
  );
}

export default DetectingAnimation;
