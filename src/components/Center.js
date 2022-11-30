import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState, useRef, Suspense } from "react";
import styled from "styled-components";
import CenterFooter from "./centerComponents/CenterFooter";
import CenterHeader from "./centerComponents/CenterHeader";

import ExecuteResult from "./rightComponents/executeComponents/ExecuteResult";
import GradingResults from "./rightComponents/gradingComponents/GradingResults";
import cobaltTheme from "monaco-themes/themes/Cobalt2.json";
import idleTheme from "monaco-themes/themes/IDLE.json";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  actionState,
  themeState,
  savePartState,
  saveState,
  submitResultState,
  testState,
  executefinishState,
} from "../atoms";
import { Rnd } from "react-rnd";
import { useMutation, useQuery } from "react-query";
import { executeCode, getUserInfo } from "../fetch";
import { act } from "react-dom/test-utils";

const CenterContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CenterEditor = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
`;

const BottomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 450px;

  bottom: 0;
  left: 0;
`;

const Terminal = styled.div`
  width: 100%;
  height: 0;
  flex: 1;
  background-color: ${({ theme }) => theme.terminal};
  bottom: 0;
`;

function Center() {
  const editorCode = useRef("");

  const handleEditor = (editor) => {
    editorCode.current = editor;
  };
  const [executeFinish, setExecuteFinish] = useRecoilState(executefinishState);

  const [firstCode, setFirstCode] = useState("");
  const [secondCode, setSecondCode] = useState("");
  const [thirdCode, setThirdCode] = useState("");

  const [test, setTest] = useRecoilState(testState);
  const savePart = useRecoilValue(savePartState);
  const handleEditorChange = (value, event) => {
    console.log(value);
    setTest(value);
    // setCode(editorCode.current.getValue());
  };

  const handleGrading = () => {};

  const action = useRecoilValue(actionState);
  const theme = useRecoilValue(themeState);
  // const isSave = useRecoilValue(saveState);
  // const code = useRecoilValue(codeState);
  const submitResult = useRecoilValue(submitResultState);

  // const setExecuteResult = useSetRecoilState(executeResultState);
  // const gradingResultAction = useSetRecoilState(gradingResultState);
  // const submitResultAction = useSetRecoilState(submitResultState);

  const monaco = useMonaco();

  const [resize, setResize] = useState({ height: 51 });

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

  // if (executeFinish === true) {
  //   editorCode.current.setValue(test);
  // }
  // setInterval(() => {
  //   localStorage.setItem(savePart, test);
  // }, 10000);
  return (
    <CenterContainer>
      <CenterHeader editor={editorCode} />

      <CenterEditor>
        <Editor
          width={"100%"}
          defaultLanguage="python"
          defaultValue={localStorage.getItem(1)}
          onChange={handleEditorChange}
          onMount={handleEditor}
        ></Editor>
      </CenterEditor>

      {/* <BottomContainer> */}
      <Rnd
        default={{ x: 0, y: window.innerHeight - 102 }}
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
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
        }}
        minWidth="100%"
        minHeight="40px"
        maxHeight="80%"
        onResizeStop={(e, direction, ref, delta, position) => {
          setResize({
            height: ref.style.height,
          });
        }}
      >
        <CenterFooter editorCode={editorCode} />
        <Terminal>
          {action === "execute" ? (
            <ExecuteResult editorCode={editorCode}></ExecuteResult>
          ) : (
            <GradingResults></GradingResults>
          )}
        </Terminal>
      </Rnd>
      {/* </BottomContainer> */}

      {}
    </CenterContainer>
  );
}

export default Center;
