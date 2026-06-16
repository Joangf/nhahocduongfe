import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";

export default function DraggableDialog({
  onClose,
  onAccept,
  title = "Xác nhận",
  content = "Bạn chắc chắn?",
  open = false,
}: any) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={onAccept}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
