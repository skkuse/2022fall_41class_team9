import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ResetDialog({ open, setOpen }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResetBtnClick = () => {
    window.location.reload();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle> */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          문제를 초기화하고 다시 풀어보시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>아니요</Button>
        <Button onClick={handleResetBtnClick} autoFocus>
          네
        </Button>
      </DialogActions>
    </Dialog>
  );
}
