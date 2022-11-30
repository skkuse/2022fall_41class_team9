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
import { executeCode, getUserInfo, searchRelated } from "../fetch";
import { act } from "react-dom/test-utils";

import { DiffEditor } from "@monaco-editor/react";
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
  height: 100%;
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
  overflow: scroll;
`;

function Center() {
  const diffEditorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    diffEditorRef.current = editor;
  }

  function showOriginalValue() {
    alert(diffEditorRef.current.getOriginalEditor().getValue());
  }

  function showModifiedValue() {
    alert(diffEditorRef.current.getModifiedEditor().getValue());
  }
  const editorWrapper = useRef();
  const editorCode = useRef("");

  const handleEditor = (editor) => {
    editorCode.current = editor;
    editorCode.current.setValue(localStorage.getItem(1));
    setTest(localStorage.getItem(1));
  };

  const [test, setTest] = useRecoilState(testState);
  const savePart = useRecoilValue(savePartState);
  const handleEditorChange = (value, event) => {
    // console.log(value);
    setTest(value);
    // setCode(editorCode.current.getValue());
  };

  // const { data } = useQuery("searchRelated", searchRelated, {
  //   onSuccess: (data) => console.log(data),
  //   onError: (error) => console.log(error),
  // });

  const action = useRecoilValue(actionState);
  const theme = useRecoilValue(themeState);
  const submitResult = useRecoilValue(submitResultState);

  const monaco = useMonaco();

  const [resize, setResize] = useState({ height: 51 });
  const data = "asdasjdnajsndjasndjandjsn";
  useEffect(() => {
    console.log(3);
    if (!monaco) {
      console.log(2);
      return;
    } else {
      console.log(1);
      monaco.editor.defineTheme("cobalt", cobaltTheme);
      monaco.editor.defineTheme("idle", idleTheme);
      if (theme) {
        monaco.editor.setTheme("cobalt");
      } else {
        monaco.editor.setTheme("idle");
      }
    }
  }, [monaco, theme, action]);

  // if (executeFinish === true) {
  //   editorCode.current.setValue(test);
  // }
  // setInterval(() => {
  //   localStorage.setItem(savePart, test);
  // }, 10000);
  return (
    <CenterContainer>
      <CenterHeader editor={editorCode} />
      <CenterEditor
        ref={editorWrapper}
        // onResizeStop={() => console.log("hello")}
      >
        {action === "submit" ? (
          <div>
            {/* <button onClick={showOriginalValue}>show original value</button>
            <button onClick={showModifiedValue}>show modified value</button> */}
            <DiffEditor
              height="90vh"
              language="python"
              original={test}
              modified={submitResult.codeDiff.answerCoder}
              onMount={handleEditorDidMount}
              theme={theme ? "cobalt" : "idle"}
            />
          </div>
        ) : (
          <Editor
            width="100%"
            defaultLanguage="python"
            defaultValue="base code"
            onChange={handleEditorChange}
            onMount={handleEditor}
            theme={theme ? "cobalt" : "idle"}
          ></Editor>
        )}
      </CenterEditor>

      {/* <BottomContainer> */}
      <Rnd
        default={{ x: 0, y: window.innerHeight - 102 }}
        style={{
          position: "absolute",
          top: "100%",
          bottom: 0,
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
        minHeight="45px"
        maxHeight="80%"
        onResizeStop={(e, direction, ref, delta, position) => {
          setResize({
            height: ref.style.height,
          });
        }}
      >
        <CenterFooter
          editorCode={editorCode}
          resize={resize}
          setResize={setResize}
        />
        <Terminal>
          {action === "execute" ? (
            <ExecuteResult></ExecuteResult>
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
