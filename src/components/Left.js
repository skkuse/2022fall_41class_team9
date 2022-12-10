import { maxWidth } from "@mui/system";
import { useState } from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import QuestionInfo from "./leftComponents/QuestionInfo";

import TestCaseInfo from "./leftComponents/TestCase";

const event = new Event("dragResize");

const LeftContCont = styled.div`
  position: relative;
  height: 100%;
`;
const LeftContainer = styled.div`
  position: relative;
  /* width: 450px; */
  /* display: flex; */
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  height: 100%;
  width: 400px;
  /* width: ${(props) => (props.isOpen ? "400px" : "0px")}; */
  display: ${(props) => (props.isOpen ? "flex" : "none")};
`;

const ResizeBtn = styled.button`
  position: absolute;
  z-index: 5;
  height: 30px;
  width: 10px;
  background-color: beige;
  top: 50%;
  right: -20px;
`;

function Left() {
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const handleResizeBtnClick = () => {
    setIsLeftOpen(!isLeftOpen);
    dispatchEvent(event);
  };
  return (
    <LeftContCont>
      <LeftContainer isOpen={isLeftOpen}>
        <QuestionInfo></QuestionInfo>
        <TestCaseInfo></TestCaseInfo>
      </LeftContainer>
      <ResizeBtn onClick={handleResizeBtnClick} />
    </LeftContCont>
  );
}

export default Left;
