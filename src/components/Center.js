import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import CenterFooter from "./centerComponents/CenterFooter";
import CenterHeader from "./centerComponents/CenterHeader";

import ExecuteResult from "./rightComponents/executeComponents/ExecuteResult";
import GradingResults from "./rightComponents/gradingComponents/GradingResults";
import cobaltTheme from "monaco-themes/themes/Cobalt2.json";
import idleTheme from "monaco-themes/themes/IDLE.json";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  actionState,
  themeState,
  savePartState,
  saveState,
  executeResultState,
  gradingResultState,
  submitResultState,
} from "../atoms";
import { Rnd } from "react-rnd";
import { useMutation, useQuery } from "react-query";
import { executeCode, getUserInfo } from "../fetch";

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
  const editorCode = useRef("");

  // const {data} = useQuery("getUsers", ()=>getUserInfo("nickel"), {onError:(error) => conso});
  const { mutate: executeMutate } = useMutation(
    () => executeCode(editorCode.current.getValue()),
    {
      onSuccess: (data) => {
        setExecuteResult(data);
      },
    }
  );
  const handleEditorCode = (editor) => {
    editorCode.current = editor;
  };
  const handleEditorCodeChange = () => {
    console.log(editorCode.current.getValue());
  };

  const handleExecute = () => {
    executeMutate();
  };
  const handleGrading = () => {};

  const action = useRecoilValue(actionState);
  const theme = useRecoilValue(themeState);
  const savePart = useRecoilValue(savePartState);
  const isSave = useRecoilValue(saveState);
  const setExecuteResult = useSetRecoilState(executeResultState);
  const gradingResultAction = useSetRecoilState(gradingResultState);
  const submitResultAction = useSetRecoilState(submitResultState);

  const monaco = useMonaco();

  const [resize, setResize] = useState({ height: 250 });

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

  if (action === "execute") {
    handleExecute();
  } else if (action === "grading") {
    handleGrading();
  }
  return (
    <CenterContainer>
      <CenterHeader />
      <CenterEditor>
        <Editor
          defaultLanguage="python"
          defaultValue="base code"
          onMount={handleEditorCode}
          onChange={handleEditorCodeChange}
        ></Editor>
      </CenterEditor>
      <CenterFooter />

      {/* <div>
        {" "}
        <Rnd
          style={{
            position: "relative",
            backgroundColor: "beige",
            transform: "",
            
          }}
          disableDragging
          size={{ height: resize.height }}
          minWidth="100%"
          
          onResizeStop={(e, direction, ref, delta, position) => {
            setResize({
              
              height: ref.style.height,
              
            });
          }}
        >
          001
        </Rnd>
      </div> */}

      <Terminal action={action}>
        {/* {" "}
        <Rnd
          style={{
            position: "relative",
            // backgroundColor: "beige",
            transform: "",
            // width: "100%",
          }}
          size={{ height: resize.height }}
          minWidth="100%"
          // onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setResize({
              // width: ref.style.width,
              height: ref.style.height,
              // ...position,
            });
          }}
        >
          001
        </Rnd> */}
        {action === "execute" ? (
          <ExecuteResult></ExecuteResult>
        ) : (
          <GradingResults></GradingResults>
        )}
      </Terminal>
    </CenterContainer>
  );
}

export default Center;
