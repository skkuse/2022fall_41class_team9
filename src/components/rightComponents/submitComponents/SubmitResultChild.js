import { useState } from "react";
import styled from "styled-components";

// interface ResultContentType {
//   openedContent: OpenedContentType;
// }

const ResultContentContainer = styled.div`
  display: ${(props) => (props.openedContent == "result" ? "flex" : "none")};

  flex: 1;
  flex-direction: column;
`;

const OverallScore = styled.div`
  background-color: whitesmoke;
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

// type ScoreCheckBackgroungType = "blue" | "green" | "yellow";

// interface NavBarOptionType {
//   backgroundColor: ScoreCheckBackgroungType;
// }

const NavBarOption = styled.div`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

const ScoreCheckContent = styled.div`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

function SubmitResultChild({ openedContent }) {
  const [scoreCheckBackground, setScoreCheckBackground] = useState("blue");

  return (
    <ResultContentContainer openedContent={openedContent}>
      <OverallScore></OverallScore>
      <ScoreCheck>
        <ScoreCheckNavbar>
          <NavBarOption
            backgroundColor="blue"
            onClick={() => setScoreCheckBackground("blue")}
          ></NavBarOption>
          <NavBarOption
            backgroundColor="green"
            onClick={() => setScoreCheckBackground("green")}
          ></NavBarOption>
          <NavBarOption
            backgroundColor="yellow"
            onClick={() => setScoreCheckBackground("yellow")}
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
