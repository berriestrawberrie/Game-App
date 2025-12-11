import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {/* Logout icon button */}
      <button onClick={() => setOpen(true)} title="Sign Out">
        <i className="fa-solid fa-door-open text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"></i>
      </button>

      {/* Confirmation dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>

        <DialogContent>
          <Typography>Are you sure you want to sign out?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
