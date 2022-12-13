import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import ResetDialog from "./ResetDialog";
import SubmitDialog from "./SubmitDialog";
import UtilButtons from "./UtilButtons";
import MainButtons from "./MainButtons";

const CenterFooterContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 16px;
  padding-right: 40px;
  background-color: ${({ theme }) => theme.bgColor};
  border-top: 1px solid ${({ theme }) => theme.primary};
  gap: 60px;

  @media screen and (max-width: 1100px) {
    gap: 30px;
  }
  @media screen and (max-width: 600px) {
    gap: 10px;
  }
`;

function CenterFooter({ editorCode }) {
  // 세부 제출결과에 관한 state
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  // 제출한 후 결과값을 받는 동안 생성되는 loading에 관한 state
  const [isDataLoading, setIsDataLoading] = useState(true);
  //코드 다시 풀어보기 모달 open state
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  //코드 클립보드 복사시 나타나는 모달 open state
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  //코드가 컴파일시 에러인지 state
  const [isCompileError, setIsCompileError] = useState(false);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  return (
    <CenterFooterContainer>
      <UtilButtons editorCode={editorCode} setSnackBarOpen={setSnackBarOpen} />
      <MainButtons
        setSubmitDialogOpen={setSubmitDialogOpen}
        setResetDialogOpen={setResetDialogOpen}
        setIsDataLoading={setIsDataLoading}
        setIsCompileError={setIsCompileError}
      />
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          코드를 클립보드에 복사했습니다!
        </Alert>
      </Snackbar>

      <SubmitDialog
        open={submitDialogOpen}
        setOpen={setSubmitDialogOpen}
        isDataLoading={isDataLoading}
        isCompileError={isCompileError}
      />
      <ResetDialog open={resetDialogOpen} setOpen={setResetDialogOpen} />
    </CenterFooterContainer>
  );
}
export default CenterFooter;
