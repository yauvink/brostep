import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { iOsPadding } from "../utils/browser";
import tgStars from "../assets/tg_stars.svg";
import mark1 from "../assets/mark_1.svg";
import { useCallback, useState } from "react";
import { useApp } from "../providers/AppProvider/useApp";
import { createInvoiceLink, PaymentError } from "../services/requests";
import { openTelegramInvoice } from "../utils/telegram-payment";
import { UserMark } from "../constants/app.constants";
import { useGame } from "../providers/GameProvider";
import AppButton, { AppButtonType } from "./common/AppButton";

function AddGame({
  onClose,
  setSuccessPaymentModalOpen,
}: {
  onClose: () => void;
  setSuccessPaymentModalOpen: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const { authState } = useApp();
  const { updateGameState } = useGame();
  const [loading, setLoading] = useState(false);
  const [loadingServerHelper, setLoadingServerHelper] = useState(false);
  const handleBuyShield = useCallback(async () => {
    if (loading || !authState.accessToken) return;

    setLoading(true);
    try {
      // Create invoice link from backend
      const invoiceLink = await createInvoiceLink({
        title: t("addGame.shield.title"),
        description: t("addGame.shield.description"),
        payload: UserMark.SHIELD,
        amount: 1, // 1 Star
      });

      // Open payment in Telegram
      openTelegramInvoice(invoiceLink, {
        onSuccess: () => {
          // double update to ensure backend is ready
          setTimeout(() => {
            updateGameState();
            setTimeout(() => {
              updateGameState();
            }, 3000);
          }, 3000);

          setSuccessPaymentModalOpen(true);
          onClose();
        },
        onFailed: () => {
          toast.error(t("payment.failed"));
        },
        onCancelled: () => {
          // User cancelled, just reset loading state
          console.log("Payment cancelled by user");
        },
      });
    } catch (err) {
      console.error("Payment error:", err);

      if (err instanceof PaymentError) {
        if (err.statusCode === 401) {
          toast.error(t("payment.sessionExpired"));
        } else {
          toast.error(err.message);
        }
      } else {
        toast.error(t("payment.createFailed"));
      }
    } finally {
      setLoading(false);
    }
  }, [loading, authState.accessToken, t, onClose]);

  const handleBuyServerHelper = useCallback(async () => {
    if (loadingServerHelper || !authState.accessToken) return;

    setLoadingServerHelper(true);

    try {
      // Create invoice link from backend
      const invoiceLink = await createInvoiceLink({
        title: t("addGame.serverHelper.title"),
        description: t("addGame.serverHelper.description"),
        payload: UserMark.SERVER_HELPER,
        amount: 1, // 1 Star
      });

      // Open payment in Telegram
      openTelegramInvoice(invoiceLink, {
        onSuccess: () => {
          // double update to ensure backend is ready
          setTimeout(() => {
            updateGameState();
            setTimeout(() => {
              updateGameState();
            }, 3000);
          }, 3000);

          setSuccessPaymentModalOpen(true);
          onClose();
        },
        onFailed: () => {
          toast.error(t("payment.failed"));
        },
        onCancelled: () => {
          console.log("Payment cancelled by user");
        },
      });
    } catch (err) {
      console.error("Payment error:", err);

      if (err instanceof PaymentError) {
        if (err.statusCode === 401) {
          toast.error(t("payment.sessionExpired"));
        } else {
          toast.error(err.message);
        }
      } else {
        toast.error(t("payment.createFailed"));
      }
    } finally {
      setLoadingServerHelper(false);
    }
  }, [loadingServerHelper, authState.accessToken, t, onClose]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          maxHeight: "100%",
          width: "100%",
          maxWidth: "480px",
          position: "fixed",
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          overflow: "auto",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            paddingTop: `${iOsPadding()}px`,
            backgroundColor: "lightgrey",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            marginTop: "70px",
          }}
        >
          <Toolbar sx={{ height: "70px" }}>
            <IconButton
              edge="start"
              onClick={() => {
                onClose();
              }}
              sx={{ mr: 2, color: "black" }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ color: "#333", flexGrow: 1, fontWeight: "bold" }}
            >
              {t("addGame.title")}
            </Typography>
          </Toolbar>
        </Box>
        <Box
          sx={{
            // mt: `${iOsPadding() + 70}px`,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            color: "black",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  minWidth: 80,
                  minHeight: 80,
                  height: 80,
                  maxHeight: 80,
                  display: "flex",
                }}
              >
                <img width={80} height={80} src={mark1} alt="mark_1" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    textAlign: "left",
                  }}
                >
                  {t("addGame.shield.title")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "#666",
                    textAlign: "left",
                  }}
                >
                  {t("addGame.shield.description")}
                </Typography>
              </Box>
            </Box>
            <AppButton
              onClick={handleBuyShield}
              disabled={loading}
              type={AppButtonType.BLUE}
            >
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <img width={20} height={20} src={tgStars} alt="tg_stars" />
                  {t("addGame.shield.price")}
                </Box>
              )}
            </AppButton>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              width: "100%",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  minWidth: 80,
                  minHeight: 80,
                  height: 80,
                  maxHeight: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  flexShrink: 0,
                }}
              >
                🛠️
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    textAlign: "left",
                  }}
                >
                  {t("addGame.serverHelper.title")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "#666",
                    textAlign: "left",
                  }}
                >
                  {t("addGame.serverHelper.description")}
                </Typography>
              </Box>
            </Box>
            <AppButton
              onClick={handleBuyServerHelper}
              disabled={loadingServerHelper}
              type={AppButtonType.BLUE}
            >
              {loadingServerHelper ? (
                <CircularProgress size={20} />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <img width={20} height={20} src={tgStars} alt="tg_stars" />
                  {t("addGame.serverHelper.price")}
                </Box>
              )}
            </AppButton>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              width: "100%",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  minWidth: 80,
                  minHeight: 80,
                  height: 80,
                  maxHeight: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  flexShrink: 0,
                }}
              >
                🎮
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    textAlign: "left",
                  }}
                >
                  {t("addGame.customRoom.title")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "#666",
                    textAlign: "left",
                  }}
                >
                  {t("addGame.customRoom.description")}
                </Typography>
              </Box>
            </Box>
            <AppButton disabled type={AppButtonType.BLUE} onClick={() => {}}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <img width={20} height={20} src={tgStars} alt="tg_stars" />
                {t("addGame.customRoom.price")}
              </Box>
            </AppButton>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default AddGame;
