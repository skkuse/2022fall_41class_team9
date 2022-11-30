import styled from "styled-components";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { saveState, savePartState, testState, actionState } from "../../atoms";
import { act } from "react-dom/test-utils";

const CenterHeaderContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;
const CenterHeaderText = styled.h2`
  color: black;
  font-size: 1.5em;
`;
const CenterHeaderBtnContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  margin-left: 16px;
  height: 100%;
  /* gap: 20px; */
`;
const CenterHeaderBtn = styled.button`
  width: 70px;
  height: 30px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px 8px 0px 0px;
  cursor: pointer;
`;

function CenterHeader(props) {
  const [savePart, setSavePart] = useRecoilState(savePartState);
  const [test, setTest] = useRecoilState(testState);
  const [action, setAction] = useRecoilState(actionState);
  if (savePart[1] === 1) {
    const tmp = savePart[0];
    localStorage.setItem(tmp, test);
    console.log(savePart);
    // editorCode.current.setValue(localStorage.getItem(savePart[1]));
  } else if (savePart[1] === 2) {
    const tmp = savePart[0];
    localStorage.setItem(tmp, test);
    console.log(savePart);
    // editorCode.current.setValue(localStorage.getItem(savePart[1]));
  } else if (savePart[1] === 3) {
    const tmp = savePart[0];
    localStorage.setItem(tmp, test);
    console.log(savePart);
    // editorCode.current.setValue(localStorage.getItem(savePart[1]));
  }
  if (action === "submit") {
    document.querySelector(".btn1").disabled = true;
    document.querySelector(".btn2").disabled = true;
    document.querySelector(".btn3").disabled = true;
  } else {
    document.querySelector(".btn1").disabled = false;
    document.querySelector(".btn2").disabled = false;
    document.querySelector(".btn3").disabled = false;
  }
  return (
    <CenterHeaderContainer>
      <CenterHeaderBtnContainer>
        <CenterHeaderBtn
          className="btn1"
          style={{
            backgroundColor: savePart === 1 ? "rgba(0,0,0,0.3)" : "grey",
          }}
          onClick={() => {
            const tmp = savePart;
            localStorage.setItem(tmp, test);
            setSavePart(1);
            props.editor.current.setValue(localStorage.getItem(1));
            // setAction("false");
          }}
        >
          1
        </CenterHeaderBtn>
        <CenterHeaderBtn
          className="btn2"
          style={{
            backgroundColor: savePart === 2 ? "rgba(0,0,0,0.3)" : "grey",
          }}
          onClick={() => {
            const tmp = savePart;
            localStorage.setItem(tmp, test);
            setSavePart(2);
            props.editor.current.setValue(localStorage.getItem(2));
            // setAction("false");
          }}
        >
          2
        </CenterHeaderBtn>
        <CenterHeaderBtn
          className="btn3"
          style={{
            backgroundColor: savePart === 3 ? "rgba(0,0,0,0.3)" : "grey",
          }}
          onClick={() => {
            const tmp = savePart;
            localStorage.setItem(tmp, test);
            setSavePart(3);
            props.editor.current.setValue(localStorage.getItem(3));
            // setAction("false");
          }}
        >
          3
        </CenterHeaderBtn>
      </CenterHeaderBtnContainer>
    </CenterHeaderContainer>
  );
}

export default CenterHeader;
