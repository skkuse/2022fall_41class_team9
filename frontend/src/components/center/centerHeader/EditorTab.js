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
  border-right: 1px solid black;
  cursor: pointer;
`;

function EditorTab({ id, editor }) {
  // 코드 불러오기, 초기화, 복사, 다운로드에 관한 state
  const action = useRecoilValue(actionState);
  // 현재 작업중인 editor에 관한 state
  const [savePart, setSavePart] = useRecoilState(savePartState);
  // 현재 작업 중인 editor에 저장된 code에 관한 state
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
