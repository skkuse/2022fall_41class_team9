import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  actionState,
  currentProblemInfoState,
  dialogOpenState,
  testState,
  userState,
  functionState,
} from "../../atoms";
import { executeCode, getAnalysis, gradeCode, submitCode } from "../../fetch";
import { FiUpload } from "react-icons/fi";
import { MdRefresh, MdContentCopy } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
const CenterFooterContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.bgColor};
  border-top: 1px solid ${({ theme }) => theme.primary};
`;
const FooterItems = styled.div`
  display: flex;
`;
const Item = styled.div`
  width: 30px;
  height: 30px;
  background-color: transparent;
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  font-size: 10px;
  text-align: center;
  border: none;
`;
const FooterBtns = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.color};
`;

function CenterFooter(props) {
  const setAction = useSetRecoilState(actionState);
  const setDialogOpen = useSetRecoilState(dialogOpenState);
  const userCode = useRecoilValue(testState);
  const setUserCode = useSetRecoilState(testState);
  const userInfo = useRecoilValue(userState);
  const setFunction = useSetRecoilState(functionState);
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  const [loaderOpen, setLoaderOpen] = useState(false);

  const { mutate: executeMutate } = useMutation(
    () => executeCode({ user_code: userCode }),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );
  const { mutate: gradingMutate } = useMutation(
    () => gradeCode({ user_code: userCode }),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );
  const { isLoading, mutate: submitMutate } = useMutation(
    () =>
      submitCode({
        user_id: userInfo.user_id,
        prob_id: currentProblemInfo.prob_id,
        user_code:
          "def solution(n):\n\n    a,b = 1,1\n    if n==1 or n==2:\n        return 1\n\n    for i in range(1,n):\n        a,b = b, a+b\n\n    print(a)\n    return a\nprint(solution(10))",
        // user_output: "useroutput",
        // counter: 0,
      }),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

  const getSubmissionResult = async (submitId) => {
    try {
      const response = await axios.get(`/onlinejudge/analysis/${submitId}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUploadBtnClick = (e) => {
    const reader = new FileReader();
    const userFile = e.target.files[0];
    reader.onload = () => {
      setUserCode(reader.result);
    };
    reader.readAsText(userFile);
    // setTest(test)
    setFunction("upload");
  };
  const handleRefreshBtnClick = () => {
    setFunction("refresh");
  };
  const handleCopyBtnClick = () => {
    setFunction("copy");
  };
  const handleDownloadBtnClick = () => {
    setFunction("download");
  };

  const handleExecuteBtnClick = () => {
    setAction("execute");
  };
  const handleGradingClick = () => {
    setAction("grading");
  };

  const handleSubmitBtnClick = () => {
    // setAction("submit");
    submitMutate({
      onSuccess: async (data) => {
        await getSubmissionResult();
      },
    });
    setLoaderOpen(true);
    // setDialogOpen(true);
  };

  const handleMoveBtnClick = () => {
    setLoaderOpen(false);
    setDialogOpen(true);
  };

  return (
    <CenterFooterContainer>
      <FooterItems>
        <Item>
          <input
            type="file"
            onChange={handleFileUploadBtnClick}
            accept=".py"
            style={{ display: "none" }}
            className="fileUpload"
          />
          <FiUpload
            onClick={() => {
              document.querySelector(".fileUpload").click();
            }}
            style={{ cursor: "pointer", width: "100%", height: "100%" }}
          ></FiUpload>
        </Item>
        <Item>
          <MdRefresh
            onClick={handleRefreshBtnClick}
            style={{ cursor: "pointer", width: "100%", height: "100%" }}
          ></MdRefresh>
        </Item>
        <Item>
          <MdContentCopy
            onClick={handleCopyBtnClick}
            style={{ cursor: "pointer", width: "100%", height: "100%" }}
          ></MdContentCopy>
        </Item>
        <Item>
          <BsDownload
            onClick={handleDownloadBtnClick}
            style={{ cursor: "pointer", width: "100%", height: "100%" }}
          ></BsDownload>
        </Item>
      </FooterItems>
      <FooterBtns>
        <Button
          color="inherit"
          variant="outlined"
          onClick={handleExecuteBtnClick}
        >
          실행
        </Button>
        <Button color="inherit" variant="outlined" onClick={handleGradingClick}>
          채점
        </Button>
        <Button
          color="inherit"
          onClick={handleSubmitBtnClick}
          variant="outlined"
        >
          제출
        </Button>
      </FooterBtns>
      <Dialog
        open={loaderOpen}
        // onClose={() => setLoaderOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ width: "500px" }} id="alert-dialog-title">
          {"제출 결과를 기다리는 중입니다"}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
          <CircularProgress color="inherit" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoaderOpen(false)}>Disagree</Button>
          <Button onClick={handleMoveBtnClick} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </CenterFooterContainer>
  );
}
export default CenterFooter;
