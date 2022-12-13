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

function SubmitDialog({ open, setOpen, isDataLoading, isCompileError }) {
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
          : "제출이 완료되었습니다"}
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
        ) : isCompileError ? (
          <div>컴파일 에러가 발생했습니다.</div>
        ) : (
          <div>검사에 성공하였습니다.</div>
        )}
      </DialogContent>
      <DialogActions>
        {isDataLoading ? null : (
          <>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default SubmitDialog;
