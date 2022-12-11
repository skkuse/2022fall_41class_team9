import Editor from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import CenterFooter from "./centerComponents/CenterFooter";
import CenterHeader from "./centerComponents/CenterHeader";

import ExecuteResult from "./rightComponents/executeComponents/ExecuteResult";
import GradingResults from "./rightComponents/gradingComponents/GradingResults";
import cobaltTheme from "monaco-themes/themes/Cobalt2.json";
import idleTheme from "monaco-themes/themes/IDLE.json";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  actionState,
  themeState,
  savePartState,
  testState,
  currentProblemInfoState,
  fontSizeState,
} from "../atoms";
import { Rnd } from "react-rnd";
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

  flex: 1;
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
  const [resize, setResize] = useState({ height: 251 });
  const [editorY, setEditorY] = useState(window.innerHeight - 302);
  const fontSize = useRecoilValue(fontSizeState);
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  const savePart = useRecoilValue(savePartState);
  const action = useRecoilValue(actionState);
  const theme = useRecoilValue(themeState);
  const [test, setTest] = useRecoilState(testState);
  const diffEditorRef = useRef(null);
  const monacoObjects = useRef(null);
  const editorWrapper = useRef();
  const editorCode = useRef("");

  function handleEditorDidMount(editor, monaco) {
    diffEditorRef.current = editor;
  }

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

  const autoSave = () => {
    localStorage.setItem(savePart, test);
  };

  setInterval(autoSave, 10000);

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

    const handleWindowResize = () => {
      editor.layout({});
      setEditorY(window.innerHeight - 302);
    };
    const handleWindowDragResize = () => {
      editor.layout({});
    };

    monaco.editor.defineTheme("cobalt", cobaltTheme);
    monaco.editor.defineTheme("idle", idleTheme);

    if (theme) {
      monaco.editor.setTheme("cobalt");
    } else {
      monaco.editor.setTheme("idle");
    }
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("dragResize", handleWindowDragResize);
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
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("dragResize", handleWindowDragResize);
    };
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
        default={{ x: 0, y: editorY }}
        style={{
          top: editorY,

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
        bounds="parent"
        minWidth="100%"
        minHeight="45px"
        onResizeStop={(e, direction, ref, delta, position) => {
          console.log("hi");
          setResize({
            height: ref.style.height,
          });
        }}
      >
        <CenterFooter editorCode={editorCode} />
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
