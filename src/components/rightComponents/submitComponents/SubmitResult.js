import { useState } from "react";
import styled from "styled-components";

import SubmitResultChild from "./SubmitResultChild";

const SubmitResultContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3b5939;
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: #f7f7b8;
`;

const SubmitResultNavBar = styled.div`
  height: 50px;
  background-color: #3b5939;
  border-bottom: 1px solid;
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

const ExplanationContent = styled.div`
  display: ${(props) =>
    props.openedContent == "explanation" ? "flex" : "none"};
  background-color: #3b5939;
  flex: 1;
`;

const RelatedContent = styled.div`
  display: ${(props) => (props.openedContent == "related" ? "flex" : "none")};
  background-color: #3b5939;
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
