import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

function SuccessPaymentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "80%",
          maxWidth: "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 112,
            height: 112,
            borderRadius: "50%",
            background: "#E3FCEC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <svg
            width="65"
            height="65"
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <circle cx="32.5" cy="32.5" r="32.5" fill="#00CC88" />
            <path
              d="M19 35L31.5 47.5L49 25.5"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        <Typography sx={{ textAlign: "center" }}>
          {t("payment.success")}
        </Typography>
        <Button variant="contained" onClick={onClose}>
          {t("payment.close")}
        </Button>
      </Box>
    </Modal>
  );
}

export default React.memo(SuccessPaymentModal);
