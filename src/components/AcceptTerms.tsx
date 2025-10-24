import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./common/LanguageSelect";
import AppButton, { AppButtonType } from "./common/AppButton";

function AcceptTerms({ handleAcceptTerms }: { handleAcceptTerms: () => void }) {
  const [isNotAccepted, setIsNotAccepted] = useState(false);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      {isNotAccepted ? (
        <Box>
          <Typography>{t("terms.haveANiceDay")}</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            fontSize: "20px",
            margin: "30px",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mb: "30px",
            }}
          >
            <LanguageSelect />
          </Box>
          <Typography>
            {t("terms.terms", { gameName: t("gameName") })}
          </Typography>
          <Box height={30}></Box>

          <AppButton onClick={handleAcceptTerms} type={AppButtonType.GREEN}>
            {t("terms.accept")}
          </AppButton>
          <Box height={10}></Box>
          <AppButton
            onClick={() => {
              setIsNotAccepted(true);
            }}
            type={AppButtonType.RED}
          >
            {t("terms.decline")}
          </AppButton>
        </Box>
      )}
    </Box>
  );
}
export default AcceptTerms;
