import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { dialogOpenState } from "../../../atoms";

function SubmitDialog({ open, setOpen, isDataLoading }) {
  const setDialogOpen = useSetRecoilState(dialogOpenState);

  const handleMoveBtnClick = () => {
    setOpen(false);
    setDialogOpen(true);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ width: "500px" }} id="alert-dialog-title">
        {isDataLoading
          ? "제출 결과를 기다리는 중입니다"
          : "검사가 완료되었습니다"}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isDataLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <div>세부 제출 결과를 보러 가시겠습니까?</div>
        )}
      </DialogContent>
      <DialogActions>
        {isDataLoading ? null : (
          <>
            <Button onClick={() => setOpen(false)}>아니요</Button>
            <Button onClick={handleMoveBtnClick} autoFocus>
              네
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default SubmitDialog;
