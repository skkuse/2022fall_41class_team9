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
}) {
  const userCode = useRecoilValue(testState);
  const userInfo = useRecoilValue(userState);
  const savePart = useRecoilValue(savePartState);
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  const setAction = useSetRecoilState(actionState);
  const setExecuteResult = useSetRecoilState(executeResultState);
  const setGradingResult = useSetRecoilState(gradingResultState);
  const setSubmitResult = useSetRecoilState(submitResultState);
  const [doneSubmit, setDoneSubmit] = useRecoilState(doneSubmitState);

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

  const { mutate: submitMutate } = useMutation(
    (_) =>
      submitCode({
        user_id: userInfo.user_id,
        prob_id: currentProblemInfo.prob_id,
        user_code: userCode,
      }),
    {
      onError: (error) => console.log(error),
    }
  );

  const getSubmissionResult = async (submitId) => {
    try {
      const response = await axios.get(`/onlinejudge/analysis2/${submitId}`);
      console.log(response.data);
      setIsDataLoading(false);
      setSubmitResult(response.data);
      setDoneSubmit(true);
      setAction("submit");
    } catch (error) {
      console.log(error);
      setIsDataLoading(false);
      setSubmitResult(ERROR_CODE_RESULT);
      setDoneSubmit(true);
      setAction("submit");
    }
  };

  const handleExecuteBtnClick = () => {
    localStorage.setItem(savePart, userCode);
    setAction("execute");
    executeMutate();
  };

  const handleGradingClick = () => {
    localStorage.setItem(savePart, userCode);
    setAction("grading");

    gradingMutate();
  };

  const handleSubmitBtnClick = async () => {
    setSubmitDialogOpen(true);
    setIsDataLoading(true);
    submitMutate("", {
      onSuccess: async (data) => {
        console.log(data);
        await getSubmissionResult(data.submit_id);
      },
    });
  };

  const handleRestartBtnClick = () => {
    setResetDialogOpen(true);
  };

  return (
    <FooterBtns>
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
