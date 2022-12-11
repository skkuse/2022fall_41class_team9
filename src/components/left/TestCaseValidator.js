import { Button, CircularProgress } from "@mui/material";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentProblemInfoState, savePartState, testState } from "../../atoms";
import { validateTestCase } from "../../fetch";

const ValidatorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MiniNavBar = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  justify-content: space-between;
  padding-right: 15px;
  border-bottom: 0.7px solid ${({ theme }) => theme.borderColor};
  border-top: 0.7px solid ${({ theme }) => theme.primary};
`;

const MiniNavBarTitle = styled.div``;

const ValidateContainer = styled.div`
  display: flex;
  height: 100%;
  width: 30%;
  justify-content: end;
`;
const ValidateResult = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.status === "pass" ? "#03b6fc" : "#e34b67")};
`;

const MainContent = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;
  white-space: pre-line;
`;

const BasicContent = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InputContent = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const OutputContent = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const ValidateLoader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.isLoading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

function TestCaseValidator({ validateResult, setValidateResult, id }) {
  const userCode = useRecoilValue(testState);
  const savePart = useRecoilValue(savePartState);
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);

  const { isLoading, mutate } = useMutation(
    (tcNum) => validateTestCase(userCode, currentProblemInfo.prob_id, tcNum),
    {
      onSuccess: (data, variables) => {
        console.log(data);

        setValidateResult((prev) => ({
          ...prev,
          [variables]: { show: true, ...data },
        }));
      },
      onError: (error) => console.log(error),
    }
  );

  const handleValidateBtnClick = (tcNum) => {
    localStorage.setItem(savePart, userCode);
    mutate(tcNum);
  };

  return (
    <ValidatorContainer>
      <MiniNavBar>
        <MiniNavBarTitle>{`테스트케이스 ${id}`}</MiniNavBarTitle>
        <ValidateContainer>
          <ValidateResult status={validateResult.status}>
            {validateResult.show ? validateResult.status : ""}
          </ValidateResult>

          <Button
            variant="contained"
            onClick={() => handleValidateBtnClick(id - 1)}
          >
            테스트
          </Button>
        </ValidateContainer>
      </MiniNavBar>
      <MainContent>
        <BasicContent>
          <InputContent>{`입력값:  ${validateResult.input}`}</InputContent>
          <OutputContent>{`기댓값:  ${validateResult.output}`}</OutputContent>
        </BasicContent>
        {validateResult.show ? (
          <InputContent>{`코드 결과: ${validateResult.userOutput}`}</InputContent>
        ) : null}

        <ValidateLoader isLoading={isLoading}>
          <CircularProgress color="inherit" />
        </ValidateLoader>
      </MainContent>
    </ValidatorContainer>
  );
}

export default TestCaseValidator;
