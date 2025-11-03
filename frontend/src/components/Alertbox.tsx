import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm?: () => void; 
};

export default function Alertbox({ open, onClose, title, message, onConfirm }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="font-semibold">{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>

      <DialogActions>
        {onConfirm ? (
          // If onConfirm exists → show Delete Confirmation UI
          <>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={onConfirm} variant="contained" color="error">
              Delete
            </Button>
          </>
        ) : (
          // Otherwise → regular OK modal
          <Button onClick={onClose} variant="contained">
            OK
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
