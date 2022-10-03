import { useState } from "react";
import styled from "styled-components";

import SubmitResultChild from "./SubmitResultChild";

const SubmitResultContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const SubmitResultNavBar = styled.div`
  height: 50px;
  background-color: #414e5a;
  border-bottom: solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const NavBarTitle = styled.div``;
const PlagiarismRate = styled.div`
  color: red;
`;

// export type OpenedContentType = "result" | "explanation" | "related";

// interface ContetType {
//   openedContent: OpenedContentType;
// }

const ExplanationContent = styled.div`
  display: ${(props) =>
    props.openedContent == "explanation" ? "flex" : "none"};
  background-color: bisque;
  flex: 1;
`;

const RelatedContent = styled.div`
  display: ${(props) => (props.openedContent == "related" ? "flex" : "none")};
  background-color: aqua;
  flex: 1;
`;

function SubmitResult() {
  const [openedContent, setOpenedContent] = useState("result");

  const handleNavBarClick = (type) => {
    setOpenedContent(type);
  };

  return (
    <SubmitResultContainer>
      <SubmitResultNavBar onClick={() => handleNavBarClick("result")}>
        <NavBarTitle>제출결과</NavBarTitle>
        <PlagiarismRate>표절률 20%</PlagiarismRate>
      </SubmitResultNavBar>
      <SubmitResultChild openedContent={openedContent}></SubmitResultChild>
      <SubmitResultNavBar onClick={() => handleNavBarClick("explanation")}>
        <NavBarTitle>코드 설명</NavBarTitle>
      </SubmitResultNavBar>
      <ExplanationContent openedContent={openedContent}></ExplanationContent>
      <SubmitResultNavBar onClick={() => handleNavBarClick("related")}>
        <NavBarTitle>관련 자료</NavBarTitle>
      </SubmitResultNavBar>
      <RelatedContent openedContent={openedContent}></RelatedContent>
    </SubmitResultContainer>
  );
}

export default SubmitResult;
