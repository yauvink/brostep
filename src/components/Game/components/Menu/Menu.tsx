import { useState } from 'react';
import {
  Box,
  Menu as MuiMenu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import MenuButton from './MenuButton';
import { useTranslation } from 'react-i18next';
import { leaveGameRoom } from '../../../../services/requests';
import { useGame } from '../../../../providers/GameProvider';

function Menu() {
  const { t } = useTranslation();
  const { selectedGameRoom } = useGame();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleItem1Click = () => {
    // TODO: Implement Item 1 functionality
    handleMenuClose();
  };

  const handleItem2Click = () => {
    // TODO: Implement Item 2 functionality
    handleMenuClose();
  };

  const handleLeaveClick = () => {
    handleMenuClose();
    setConfirmDialogOpen(true);
    setError(null);
  };

  const handleConfirmClose = () => {
    if (!loading) {
      setConfirmDialogOpen(false);
      setError(null);
    }
  };

  const handleLeaveConfirm = async () => {
    if (!selectedGameRoom) return;

    setLoading(true);
    setError(null);

    try {
      await leaveGameRoom(selectedGameRoom);
      // TODO: Handle success response
      setConfirmDialogOpen(false);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || t('menu.leaveError');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <MenuButton onClick={handleMenuClick} />
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleItem1Click}>{t('menu.item1')}</MenuItem>
        <MenuItem onClick={handleItem2Click}>{t('menu.item2')}</MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLeaveClick}
          sx={{
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.08)',
            },
          }}
        >
          <ExitToApp sx={{ mr: 1 }} />
          {t('menu.leaveGame')}
        </MenuItem>
      </MuiMenu>

      <Dialog open={confirmDialogOpen} onClose={handleConfirmClose} maxWidth="xs" fullWidth>
        <DialogTitle>{t('menu.confirmLeaveTitle')}</DialogTitle>
        <DialogContent>
          <Typography>{t('menu.confirmLeaveMessage')}</Typography>
          {error && (
            <Typography color="error" sx={{ mt: 2, fontSize: '0.875rem' }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={handleConfirmClose} disabled={loading} variant="outlined">
            {t('menu.stay')}
          </Button>
          <Button
            onClick={handleLeaveConfirm}
            disabled={loading}
            variant="contained"
            color="error"
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {t('menu.leave')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Menu;
