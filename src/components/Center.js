import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import styled from "styled-components";
import CenterFooter from "./centerComponents/CenterFooter";
import CenterHeader from "./centerComponents/CenterHeader";
import tomorrowTheme from "monaco-themes/themes/Tomorrow.json";

const CenterContainer = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;
`;

const CenterEditor = styled.div`
  width: 100%;
  height: 80%;
  margin: 0 auto;
`;

const CenterLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
`;

function Center() {
  const monaco = useMonaco();

  // useEffect(() => {
  //   if (!monaco) return;

  //   monaco.editor.defineTheme("tomorrow", tomorrowTheme);
  //   monaco.editor.setTheme("tomorrow");
  // }, [monaco]);

  return (
    <CenterContainer>
      <CenterHeader />
      <CenterLine></CenterLine>
      <CenterEditor>
        <Editor></Editor>
      </CenterEditor>
      <CenterLine></CenterLine>
      <CenterFooter />
    </CenterContainer>
  );
}

export default Center;
