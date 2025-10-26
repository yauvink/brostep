import React from "react";
import { Person } from "@mui/icons-material";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import { APP_VIEW } from "../../constants/app.constants";
import { useApp } from "../../providers/AppProvider";
import { iOsPadding } from "../../utils/browser";
import { useTelegram } from "../../providers/TelegramProvider/useTelegram";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";

function AppHeader() {
  const { telegramUser } = useTelegram();
  const { setAppView } = useApp();
  const { t } = useTranslation();

  return (
    <AppBar
      // position="static"
      sx={{
        paddingTop: `${iOsPadding()}px`,
        // backgroundColor: 'transparent',
        backgroundColor: "rgba(255,255,255,1)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ height: "70px" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#333",
            flexGrow: 1,
            fontWeight: "bold",
            lineHeight: "normal",
          }}
        >
          {t("gameTitle", { gameName: t("gameName") })}
        </Typography>
        <LanguageSelect />
        <IconButton
          color="inherit"
          onClick={() => setAppView(APP_VIEW.PROFILE)}
          sx={{
            color: "#333",
            padding: 0,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
          }}
        >
          {telegramUser?.photo_url ? (
            <Avatar
              src={telegramUser.photo_url}
              alt="Profile"
              sx={{
                width: 50,
                height: 50,
                border: "2px solid rgba(0,0,0,0.1)",
              }}
            />
          ) : (
            <Person />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(AppHeader);
