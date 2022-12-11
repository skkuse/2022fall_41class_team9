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
  currentProblemInfoState,
  fontSizeState,
  editorAtomState,
} from "../atoms";
import { Rnd } from "react-rnd";
import { useMutation, useQuery } from "react-query";

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
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

function Center() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const diffEditorRef = useRef(null);
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);

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

  const [test, setTest] = useRecoilState(testState);
  const savePart = useRecoilValue(savePartState);
  const handleEditorChange = (value, event) => {
    setTest(value);
    if (!monacoObjects.current) return;
    // console.log("called");
    const { monaco, editor } = monacoObjects.current;
    // const r = new monaco.Range(1, 0, 2, 0);

    // editor.deltaDecorations(
    //   editor.getModel().getAllDecorations(),
    //   editor.setModel().getAllDecorations()
    // );
  };

  const action = useRecoilValue(actionState);
  const theme = useRecoilValue(themeState);
  const submitResult = useRecoilValue(submitResultState);

  // const monaco = useMonaco();

  const [resize, setResize] = useState({ height: 51 });

  const monacoObjects = useRef(null);

  const setEditorAtom = useSetRecoilState(editorAtomState);

  const handleEditor = (editor, monaco) => {
    monacoObjects.current = {
      editor,
      monaco,
    };

    editorCode.current = editor;
    if (!localStorage.getItem(1)) {
      editorCode.current.setValue(
        JSON.parse(
          JSON.stringify(currentProblemInfo.skeleton).replaceAll("\\\\", "\\")
        )
      );
      setTest(
        JSON.parse(
          JSON.stringify(currentProblemInfo.skeleton).replaceAll("\\\\", "\\")
        )
      );
      return;
    }
    editorCode.current.setValue(localStorage.getItem(1));
    setTest(localStorage.getItem(1));
  };
  useEffect(() => {
    if (!monacoObjects.current) return;
    const { monaco, editor } = monacoObjects.current;
    // setEditorAtom(editor);
    // console.log(editor);

    monaco.editor.defineTheme("cobalt", cobaltTheme);
    monaco.editor.defineTheme("idle", idleTheme);
    // console.log(theme);
    if (theme) {
      monaco.editor.setTheme("cobalt");
    } else {
      monaco.editor.setTheme("idle");
    }
    window.addEventListener("resize", () => {
      editor.layout({});
    });
    window.addEventListener("dragResize", () => {
      console.log("resize");
      editor.layout({});
    });
    // const r = new monaco.Range(1, 0, 2, 0);
    // editor.deltaDecorations(
    //   [],
    //   [
    //     {
    //       range: r,
    //       options: {
    //         inlineClassName: "a",
    //       },
    //     },
    //   ]
    // );

    // if (!monaco) {
    //   return;
    // } else {
    //   monaco.editor.defineTheme("cobalt", cobaltTheme);
    //   monaco.editor.defineTheme("idle", idleTheme);
    //   if (theme) {
    //     monaco.editor.setTheme("cobalt");
    //   } else {
    //     monaco.editor.setTheme("idle");
    //   }
    // }
  }, [monacoObjects.current, theme, action]);

  return (
    <CenterContainer>
      <CenterHeader editor={editorCode} />
      <CenterEditor
        ref={editorWrapper}
        // onResizeStop={() => console.log("hello")}
      >
        {action === "submit" ? (
          <div>
            <DiffEditor
              height="90vh"
              language="python"
              original={test}
              modified={JSON.parse(
                JSON.stringify(currentProblemInfo.answer_code).replaceAll(
                  "\\\\",
                  "\\"
                )
              )}
              onMount={handleEditorDidMount}
              theme={theme ? "cobalt" : "idle"}
              options={{
                fontSize: fontSize,
                minimap: { enabled: false },
                renderOverviewRuler: false,
              }}

              // editorDidMount={handleEditorDidMount}
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
            options={{
              fontSize: fontSize,
              renderLineHighlight: "3",
              minimap: { enabled: false },
            }}
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
    </CenterContainer>
  );
}

export default Center;
