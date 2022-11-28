import styled from "styled-components";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { saveState, savePartState, testState } from "../../atoms";

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
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-left: 16px;
`;
const CenterHeaderBtn = styled.button`
  width: 35px;
  height: 35px;
  background-color: black;
  color: white;
  margin: 12px;
  cursor: pointer;
`;
const Item = styled.div`
  width: 35px;
  height: 35px;
  background-color: white;
  border: 1px solid black;
  display: inline-block;
  margin: 16px;
  cursor: pointer;
  font-size: 10px;
  text-align: center;
  line-height: 50px;
`;

function CenterHeader(props) {
  const [savePart, setSavePart] = useRecoilState(savePartState);
  const [test, setTest] = useRecoilState(testState);
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

  return (
    <CenterHeaderContainer>
      <CenterHeaderText></CenterHeaderText>
      <CenterHeaderBtnContainer>
        {/* <Item>코드 저장</Item> */}
        <CenterHeaderBtn
          className="btn1"
          style={{ backgroundColor: savePart === 1 ? "blue" : "black" }}
          onClick={() => {
            const tmp = savePart;
            localStorage.setItem(tmp, test);
            setSavePart(1);
            props.editor.current.setValue(localStorage.getItem(1));
          }}
        >
          1
        </CenterHeaderBtn>
        <CenterHeaderBtn
          className="btn2"
          style={{ backgroundColor: savePart === 2 ? "blue" : "black" }}
          onClick={() => {
            const tmp = savePart;
            localStorage.setItem(tmp, test);
            setSavePart(2);
            props.editor.current.setValue(localStorage.getItem(2));
          }}
        >
          2
        </CenterHeaderBtn>
        <CenterHeaderBtn
          className="btn3"
          style={{ backgroundColor: savePart === 3 ? "blue" : "black" }}
          onClick={() => {
            const tmp = savePart;
            localStorage.setItem(tmp, test);
            setSavePart(3);
            props.editor.current.setValue(localStorage.getItem(3));
          }}
        >
          3
        </CenterHeaderBtn>
      </CenterHeaderBtnContainer>
    </CenterHeaderContainer>
  );
}

export default CenterHeader;
