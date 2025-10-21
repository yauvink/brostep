import { Box, Typography } from "@mui/material";
import type { GameUser } from "../../providers/GameProvider/GameProvider";
import mark1 from "../../assets/mark_1.svg";
import { useMemo } from "react";
import { UserMark } from "../../constants/app.constants";

function UserMarks({ user }: { user: GameUser }) {
  const userShieldMarks = useMemo(() => {
    return user.marks.filter((mark) => {
      return mark.includes(UserMark.SHIELD);
    });
  }, [user]);

  const userServerHelperMarks = useMemo(() => {
    return user.marks.filter((mark) => {
      return mark.includes(UserMark.SERVER_HELPER);
    });
  }, [user]);

  return (
    <>
      {userShieldMarks.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 10000,
            left: 15,
            top: -20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <img width={30} src={mark1} alt="mark_1" />
          <Box
            sx={{
              position: "absolute",
              borderRadius: "50%",
              backgroundColor: "black",
              padding: "2px",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {userShieldMarks.length}
          </Box>
        </Box>
      )}

      {userServerHelperMarks.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 10000,
            left: -15,
            top: -5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <span style={{ fontSize: "30px" }}>🛠️</span>
          <Typography
            sx={{
              position: "absolute",
              borderRadius: "50%",
              backgroundColor: "black",
              padding: "2px",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {userServerHelperMarks.length}
          </Typography>
        </Box>
      )}
    </>
  );
}
export default UserMarks;
