import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import CenterFooter from "./centerComponents/CenterFooter";
import CenterHeader from "./centerComponents/CenterHeader";

import cobaltTheme from "monaco-themes/themes/Cobalt2.json";
import idleTheme from "monaco-themes/themes/IDLE.json";
import { useRecoilValue } from "recoil";
import { actionState, themeState, savePartState, saveState } from "../atoms";
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

const Terminal = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.terminal};
  bottom: 0;
`;

function Center() {
  const handleEditorCode = (editor) => {
    editorCode.current = editor;
  };

  const handleEditorCodeChange = () => {
    console.log(editorCode.current.getValue());
  };

  const action = useRecoilValue(actionState);
  const theme = useRecoilValue(themeState);
  const monaco = useMonaco();

  const savePart = useRecoilValue(savePartState);
  const isSave = useRecoilValue(saveState);

  const editorCode = useRef("");

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
      </Terminal>
    </CenterContainer>
  );
}

export default Center;
