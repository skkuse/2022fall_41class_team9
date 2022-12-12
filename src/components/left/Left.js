import { useState } from "react";
import styled from "styled-components";
import QuestionInfo from "./QuestionInfo";
import TestCaseInfo from "./TestCase";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const LeftContCont = styled.div`
  position: relative;
  height: 100%;
`;
const LeftContainer = styled.div`
  position: relative;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  height: 100%;
  width: 400px;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
`;

const ResizeBtn = styled.button`
  position: absolute;
  z-index: 200;
  height: 40px;
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
  // 문제, 참조/제약사항, 테스트케이스 창 open 유무
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  // tablet 크기 layout
  const isTablet = useMediaQuery({
    query: "(max-width:1080px)",
  });

  useEffect(() => {
    if (isTablet) {
      setIsLeftOpen(false);
    }
  }, [isTablet]);

  const handleResizeBtnClick = () => {
    setIsLeftOpen(!isLeftOpen);
    dispatchEvent(event);
  };
  return (
    <LeftContCont>
      <LeftContainer isOpen={isLeftOpen}>
        <QuestionInfo />
        <TestCaseInfo />
      </LeftContainer>
      <ResizeBtn onClick={handleResizeBtnClick}>
        {isLeftOpen ? <MdNavigateBefore /> : <MdNavigateNext />}
      </ResizeBtn>
    </LeftContCont>
  );
}

export default Left;
