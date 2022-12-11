import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { actionState, savePartState, testState } from "../../../atoms";

const TabBtn = styled.button`
  width: 90px;
  height: 30px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px 8px 0px 0px;
  cursor: pointer;
`;

function EditorTab({ id, editor }) {
  const action = useRecoilValue(actionState);
  const [savePart, setSavePart] = useRecoilState(savePartState);
  const userCode = useRecoilValue(testState);
  return (
    <TabBtn
      disabled={action === "submit"}
      style={{
        backgroundColor: savePart === id ? "#1a2736" : "#b5b3b4",
      }}
      onClick={() => {
        localStorage.setItem(savePart, userCode);
        setSavePart(id);
        editor.current.setValue(localStorage.getItem(id));
      }}
    >
      {id}
    </TabBtn>
  );
}

export default EditorTab;
