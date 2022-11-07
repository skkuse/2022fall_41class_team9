import { useState } from "react";
import styled from "styled-components";

const ResultContentContainer = styled.div`
  display: ${(props) => (props.openedContent === "result" ? "flex" : "none")};

  flex: 1;
  flex-direction: column;
`;

const OverallScore = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  flex: 4;
`;

const ScoreCheck = styled.div`
  background-color: bisque;
  flex: 6;
  display: flex;
  flex-direction: column;
`;

const ScoreCheckNavbar = styled.div`
  height: 35px;
  background-color: grey;
  display: flex;
`;

const NavBarOption = styled.div`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

const ScoreCheckContent = styled.div`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

function SubmitResultChild({ openedContent }) {
  const [scoreCheckBackground, setScoreCheckBackground] = useState("#f7f7b8");

  return (
    <ResultContentContainer openedContent={openedContent}>
      <OverallScore></OverallScore>
      <ScoreCheck>
        <ScoreCheckNavbar>
          <NavBarOption
            backgroundColor="#f7f7b8"
            onClick={() => setScoreCheckBackground("#f7f7b8")}
          ></NavBarOption>
          <NavBarOption
            backgroundColor="green"
            onClick={() => setScoreCheckBackground("green")}
          ></NavBarOption>
          <NavBarOption
            backgroundColor="#A9D600"
            onClick={() => setScoreCheckBackground("#A9D600")}
          ></NavBarOption>
        </ScoreCheckNavbar>
        <ScoreCheckContent
          backgroundColor={scoreCheckBackground}
        ></ScoreCheckContent>
      </ScoreCheck>
    </ResultContentContainer>
  );
}

export default SubmitResultChild;
