import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import styled from "styled-components";
import CenterFooter from "./centerComponents/CenterFooter";
import CenterHeader from "./centerComponents/CenterHeader";

import cobaltTheme from "monaco-themes/themes/Cobalt2.json";
import idleTheme from "monaco-themes/themes/IDLE.json";
import { useRecoilValue } from "recoil";
import { actionState, themeState } from "../atoms";
import { useState } from "react";
import { Rnd } from "react-rnd";

const CenterContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CenterEditor = styled.div`
  width: 100%;
  flex: 1;
`;

const BottomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 290px;
  background-color: aliceblue;
  bottom: 0;
  left: 0;
`;

const Terminal = styled.div`
  width: 100%;
  height: 250px;
  flex: 1;
  background-color: ${({ theme }) => theme.terminal};
  bottom: 0;
`;

function Center() {
  const action = useRecoilValue(actionState);
  const theme = useRecoilValue(themeState);
  const monaco = useMonaco();

  const [resize, setResize] = useState({ height: 290 });

  useEffect(() => {
    if (!monaco) {
      return;
    } else {
      monaco.editor.defineTheme("cobalt", cobaltTheme);
      monaco.editor.defineTheme("idle", idleTheme);
      if (theme) {
        monaco.editor.setTheme("cobalt");
      } else {
        monaco.editor.setTheme("idle");
      }
    }
  }, [monaco, theme]);

  return (
    <CenterContainer>
      <CenterHeader />
      <CenterEditor>
        <Editor defaultLanguage="python"></Editor>
      </CenterEditor>
      {/* <CenterFooter /> */}
      <BottomContainer>
        <Rnd
          style={{
            position: "absolute",

            backgroundColor: "beige",
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
            top: true,
            topLeft: false,
            topRight: false,
          }}
          size={{
            height: resize.height,
            width: "100%",
          }}
          minWidth="100%"
          maxHeight="800px"
          onResizeStop={(e, direction, ref, delta, position) => {
            setResize({
              height: ref.style.height,
            });
          }}
        >
          <CenterFooter />
          <Terminal></Terminal>
        </Rnd>
      </BottomContainer>
    </CenterContainer>
  );
}

export default Center;
