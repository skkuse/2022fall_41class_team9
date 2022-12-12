import { Button } from "@mui/material";
import axios from "axios";
import { useMutation } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  actionState,
  currentProblemInfoState,
  doneSubmitState,
  executeResultState,
  gradingResultState,
  savePartState,
  submitResultState,
  testState,
  userState,
} from "../../../atoms";
import { ERROR_CODE_RESULT } from "../../../constants/DummyData";
import { executeCode, gradeCode, submitCode } from "../../../fetch";

const FooterBtns = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.color};
`;

function MainButtons({
  setSubmitDialogOpen,
  setResetDialogOpen,
  setIsDataLoading,
  setIsCompileError,
}) {
  // 현재 작업 중인 editor에 저장된 code에 관한 state
  const userCode = useRecoilValue(testState);
  // 사용자에 관한 state
  const userInfo = useRecoilValue(userState);
  // 현재 작업중인 editor에 관한 state
  const savePart = useRecoilValue(savePartState);
  // 문제 정보에 관한 state
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  // 코드 불러오기, 초기화, 복사, 다운로드에 관한 state
  const setAction = useSetRecoilState(actionState);
  // 실행 결과에 관한 state
  const setExecuteResult = useSetRecoilState(executeResultState);
  // 채점 결과에 관한 state
  const setGradingResult = useSetRecoilState(gradingResultState);
  // 제출 결과에 관한 state
  const setSubmitResult = useSetRecoilState(submitResultState);
  // 제출 실행 결과 유무에 관한 state
  const [doneSubmit, setDoneSubmit] = useRecoilState(doneSubmitState);

  // 코드 실행
  const { mutate: executeMutate } = useMutation(
    () => executeCode({ user_code: userCode }),
    {
      onSuccess: (data) => {
        // console.log(data);
        setExecuteResult({ ...data, code: userCode });
      },
      onError: (error) => console.log(error),
    }
  );
  // 코드 채점
  const { mutate: gradingMutate } = useMutation(
    () => gradeCode(userCode, currentProblemInfo.prob_id),
    {
      onSuccess: (data) => {
        // console.log(data);
        setGradingResult(data);
      },
      onError: (error) => console.log(error),
    }
  );
  // 코드 제출
  const { mutate: submitMutate } = useMutation((_) =>
    submitCode({
      user_id: userInfo.user_id,
      prob_id: currentProblemInfo.prob_id,
      user_code: userCode,
    })
  );
  // 제출 결과 받기
  const getSubmissionResult = async (submitId) => {
    try {
      const response = await axios.get(`/onlinejudge/analysis2/${submitId}`);
      // console.log(response.data);
      setIsDataLoading(false);
      setSubmitResult(response.data);
      setDoneSubmit(true);
      setAction("submit");
    } catch (error) {
      // console.log(error);
      setIsDataLoading(false);
      setSubmitResult(ERROR_CODE_RESULT);
      setDoneSubmit(true);
      setIsCompileError(true);
      setAction("submit");
    }
  };
  // 실행 버튼 클릭
  const handleExecuteBtnClick = () => {
    localStorage.setItem(savePart, userCode);
    setAction("execute");
    executeMutate();
  };
  // 채점 버튼 클릭
  const handleGradingClick = () => {
    localStorage.setItem(savePart, userCode);
    setAction("grading");
    gradingMutate();
  };

  // 제출 버튼 클릭
  const handleSubmitBtnClick = async () => {
    submitMutate("", {
      onSuccess: async (data) => {
        console.log(data);
        setSubmitDialogOpen(true);
        setIsDataLoading(true);
        await getSubmissionResult(data.submit_id);
      },

      onError: (error) => {
        alert(error.response.data.error);
      },
    });
  };
  // 다시 풀어보기 버튼 클릭
  const handleRestartBtnClick = () => {
    setResetDialogOpen(true);
  };

  return (
    <FooterBtns>
      {/* 제출 버튼을 클릭했다면 doneSubmit, 아니라면 실행, 채점, 제출 버튼을 보여준다/ */}
      {doneSubmit ? (
        <Button
          color="primary"
          variant="contained"
          onClick={handleRestartBtnClick}
        >
          다시 풀어보기
        </Button>
      ) : (
        <>
          <Button
            color="primary"
            variant="contained"
            onClick={handleExecuteBtnClick}
          >
            실행
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleGradingClick}
          >
            채점
          </Button>
          <Button
            color="primary"
            onClick={handleSubmitBtnClick}
            variant="contained"
          >
            제출
          </Button>
        </>
      )}
    </FooterBtns>
  );
}

export default MainButtons;
