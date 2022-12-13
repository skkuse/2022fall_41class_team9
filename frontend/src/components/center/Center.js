import Editor from "@monaco-editor/react";
import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import CenterFooter from "./centerFooter/CenterFooter";
import CenterHeader from "./centerHeader/CenterHeader";
import ExecuteResult from "./ExecuteResult";
import GradingResults from "./GradingResults";
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
} from "../../atoms";
import { Rnd } from "react-rnd";
import { DiffEditor } from "@monaco-editor/react";
import { useParams } from "react-router-dom";

const CenterContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;
  display: flex;
  flex-direction: column;
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
  const [currentProblemInfo, setCurrentProblemInfo] = useRecoilState(
    currentProblemInfoState
  );
  const [savePart, setSavePart] = useRecoilState(savePartState);
  const action = useRecoilValue(actionState);
  const theme = useRecoilValue(themeState);
  const [test, setTest] = useRecoilState(testState);
  const diffEditorRef = useRef(null);
  const monacoObjects = useRef(null);
  const editorWrapper = useRef();
  const editorCode = useRef("");

  const { probId } = useParams();

  function handleDiffEditorDidMount(editor, monaco) {
    diffEditorRef.current = editor;
  }

  const handleEditorChange = useCallback(
    (value, event) => {
      setSavePart((prev) => {
        localStorage.setItem(prev, value);
        return prev;
      });
      setTest(value);
      if (!monacoObjects.current) return;
    },
    [savePart]
  );

  const handleEditor = (editor, monaco) => {
    monacoObjects.current = {
      editor,
      monaco,
    };

    editorCode.current = editor;
    editorCode.current.setValue(localStorage.getItem(1));
    setTest(localStorage.getItem(1));
  };

  const handleQuestionChange = () => {
    setCurrentProblemInfo((prev) => {
      editorCode.current.setValue(
        JSON.parse(JSON.stringify(prev.skeleton).replaceAll("\\\\", "\\"))
      );
      return prev;
    });
  };

  useEffect(() => {
    if (!monacoObjects.current) return;
    const { monaco, editor } = monacoObjects.current;
    if (probId !== localStorage.getItem("prevProbId")) {
      editor.setValue(
        JSON.parse(
          JSON.stringify(currentProblemInfo.skeleton).replaceAll("\\\\", "\\")
        )
      );
      localStorage.setItem("prevProbId", probId);
    }
    console.log("caleed");

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
    window.addEventListener("questionChange", handleQuestionChange);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("dragResize", handleWindowDragResize);
      window.removeEventListener("questionChange", handleQuestionChange);
      //reset save part
      setSavePart(1);
    };
  }, [monacoObjects.current, theme, currentProblemInfo]);

  return (
    <CenterContainer>
      <CenterHeader editor={editorCode} />
      <CenterEditor ref={editorWrapper}>
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
              onMount={handleDiffEditorDidMount}
              theme={theme ? "cobalt" : "idle"}
              options={{
                fontSize: fontSize,
                minimap: { enabled: false },
                renderOverviewRuler: false,
              }}
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
    </CenterContainer>
  );
}

export default Center;
