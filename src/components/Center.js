import Editor from "@monaco-editor/react";
import styled from "styled-components";
import CenterFooter from "./centerComponents/CenterFooter";
import CenterHeader from "./centerComponents/CenterHeader";

const CenterContainer = styled.div`
  background-color: #3b5939;
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
