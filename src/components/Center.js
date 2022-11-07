import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import styled from "styled-components";
import CenterFooter from "./centerComponents/CenterFooter";
import CenterHeader from "./centerComponents/CenterHeader";

import cobaltTheme from "monaco-themes/themes/Cobalt2.json";
import idleTheme from "monaco-themes/themes/IDLE.json";
import { useRecoilValue } from "recoil";
import { actionState, themeState } from "../atoms";

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

const Terminal = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.terminal};
  bottom: 0;
`;

function Center() {
  const action = useRecoilValue(actionState);
  const theme = useRecoilValue(themeState);
  const monaco = useMonaco();

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

      <CenterFooter />
      <Terminal action={action} />
    </CenterContainer>
  );
}

export default Center;
