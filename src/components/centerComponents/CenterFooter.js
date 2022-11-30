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
  executeResultState,
  gradingResultState,
  submitResultState,
} from "../../atoms";
import {
  executeCode,
  getAnalysis,
  getPastSubmitResult,
  gradeCode,
  submitCode,
} from "../../fetch";
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
  gap: 15px;
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
  margin-left: 24px;
`;
const FooterBtns = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.color};
`;

function CenterFooter({ editorCode, resize, setResize }) {
  const setAction = useSetRecoilState(actionState);
  const setDialogOpen = useSetRecoilState(dialogOpenState);
  const [userCode, setUserCode] = useRecoilState(testState);
  const userInfo = useRecoilValue(userState);

  const currentProblemInfo = useRecoilValue(currentProblemInfoState);

  const [loaderOpen, setLoaderOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [executeResult, setExecuteResult] = useRecoilState(executeResultState);
  const [gradingResult, setGradingResult] = useRecoilState(gradingResultState);
  const setSubmitResult = useSetRecoilState(submitResultState);

  const { mutate: executeMutate } = useMutation(
    () => executeCode({ user_code: userCode }),
    {
      onSuccess: (data) => {
        console.log(data);
        setExecuteResult({ ...data, code: userCode });
      },
      onError: (error) => console.log(error),
    }
  );
  const { mutate: gradingMutate } = useMutation(
    () => gradeCode(userCode, currentProblemInfo.prob_id),
    {
      onSuccess: (data) => {
        console.log(data);
        setGradingResult(data);
      },
      onError: (error) => console.log(error),
    }
  );
  const { isLoading, mutate: submitMutate } = useMutation(
    (_) =>
      submitCode({
        user_id: userInfo.user_id,
        prob_id: currentProblemInfo.prob_id,
        user_code:
          "def solution(n):\n\n    a,b = 1,1\n    if n==1 or n==2:\n        return 1\n\n    for i in range(1,n):\n        a,b = b, a+b\n\n    print(a)\n    return a\nprint(solution(10))",
      }),
    {
      onError: (error) => console.log(error),
    }
  );

  const getSubmissionResult = async (submitId) => {
    try {
      const response = await axios.get(`/onlinejudge/analysis2/${submitId}`);
      console.log(response.data);
      // console.log(response.data.efficiency);
      // console.log(JSON.parse(response.data.efficiency));
      setIsDataLoading(false);
      setSubmitResult(response.data);
      // console.log(JSON.parse(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUploadBtnClick = (e) => {
    const reader = new FileReader();
    const userFile = e.target.files[0];
    reader.onload = () => {
      setUserCode(reader.result);
      editorCode.current.setValue(reader.result);
      console.log(reader.result);
    };
    reader.readAsText(userFile);
  };

  const handleRefreshBtnClick = () => {
    editorCode.current.setValue("base code");
  };

  const handleCopyBtnClick = () => {
    navigator.clipboard.writeText(userCode);
  };

  const handleDownloadBtnClick = () => {
    const downloadTag = document.createElement("a");
    const fileName = "code.py";
    const code = new Blob([userCode], {
      type: "text/plain",
    });
    downloadTag.href = URL.createObjectURL(code);
    downloadTag.download = fileName;
    document.body.appendChild(downloadTag);
    downloadTag.click();
  };

  const handleExecuteBtnClick = () => {
    setAction("execute");
    executeMutate();
    // getExecutionResult();
  };
  const handleGradingClick = () => {
    setAction("grading");
    // getGradeResult();
    gradingMutate();
  };

  const handleSubmitBtnClick = async () => {
    setLoaderOpen(true);

    submitMutate("", {
      onSuccess: async (data) => {
        console.log(data);
        await getSubmissionResult(data.submit_id);
      },
    });

    // await getSubmissionResult(18);

    // setDialogOpen(true);
  };
  // const { data: pastData } = useQuery(
  //   "getPastSubmitResult",
  //   () => getPastSubmitResult(1, 1),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );
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
          {isDataLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <div>결과를 보러 가시겠습니까?</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoaderOpen(false)}>아니요</Button>
          <Button onClick={handleMoveBtnClick} autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>
    </CenterFooterContainer>
  );
}
export default CenterFooter;
