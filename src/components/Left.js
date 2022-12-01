import { maxWidth } from "@mui/system";
import { useState } from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import QuestionInfo from "./leftComponents/QuestionInfo";

import TestCaseInfo from "./leftComponents/TestCase";

const LeftContainer = styled.div`
  position: relative;
  /* width: 450px; */
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  height: 100%;
`;

function Left() {
  const [resize, setResize] = useState({ width: "450px" });
  return (
    <LeftContainer>
      <Rnd
        // default={{
        //   x: 0,
        //   y: 0,
        //   width: 320,
        //   height: 200,
        // }}
        style={{
          position: "relative",
          // top: "100%",
          // bottom: 0,
          // left: 0,
          display: "flex",
          flexDirection: "column",
        }}
        disableDragging
        enableResizing={{
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: false,
          right: false,
          top: false,
          topLeft: false,
          topRight: false,
        }}
        size={{
          width: resize.width,
        }}
        minHeight="100%"
        minWidth="300px"
        maxWidth="1500px"
        onResizeStop={(e, direction, ref, delta, position) => {
          setResize({
            width: ref.style.width,
          });
        }}
      >
        <QuestionInfo></QuestionInfo>
        <TestCaseInfo></TestCaseInfo>
      </Rnd>
    </LeftContainer>
  );
}

export default Left;
