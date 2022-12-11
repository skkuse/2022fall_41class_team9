import { useState } from "react";
import styled from "styled-components";
import QuestionInfo from "./leftComponents/QuestionInfo";
import TestCaseInfo from "./leftComponents/TestCase";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { motion } from "framer-motion";

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
  height: 40px;
  /* width: 10px; */
  font-size: 20px;

  top: 50%;
  right: -21px;
  padding: 0;
  background-color: transparent;
  border: 1px solid black;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

function Left({ event }) {
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
      <ResizeBtn onClick={handleResizeBtnClick}>
        {isLeftOpen ? <MdNavigateBefore /> : <MdNavigateNext />}
      </ResizeBtn>
    </LeftContCont>
  );
}

export default Left;
