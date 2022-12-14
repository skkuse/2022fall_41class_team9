import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { savePartState, testState } from "../../../atoms";
import { Button } from "@mui/material";
import { useState } from "react";
import EditorTab from "./EditorTab";
import PastResultDialog from "./PastResultDialog";

const CenterHeaderContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const CenterHeaderBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 16px;
  margin-right: 40px;
  height: 100%;
  @media screen and (max-width: 1100px) {
    margin-right: 20px;
  }
  @media screen and (max-width: 600px) {
    margin-right: 10px;
  }
`;

const SaveBtnContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
`;

function CenterHeader(props) {
  // 과거 제출 결과에 관한 state
  const [open, setOpen] = useState(false);
  // 현재 작업중인 editor에 관한 state
  const savePart = useRecoilValue(savePartState);
  // 현재 작업 중인 editor에 저장된 code에 관한 state
  const userCode = useRecoilValue(testState);
  // 과거 제출 결과 버튼 클릭
  const handleClickOpen = () => {
    localStorage.setItem(savePart, userCode);
    setOpen(true);
  };

  return (
    <CenterHeaderContainer>
      <CenterHeaderBtnContainer>
        <SaveBtnContainer>
          <EditorTab id={1} editor={props.editor} />
          <EditorTab id={2} editor={props.editor} />
          <EditorTab id={3} editor={props.editor} />
        </SaveBtnContainer>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{ height: "30px" }}
        >
          과거 제출 결과 불러오기
        </Button>
      </CenterHeaderBtnContainer>
      {/* {과거 제출 결과 창} */}
      <PastResultDialog open={open} setOpen={setOpen} />
    </CenterHeaderContainer>
  );
}

export default CenterHeader;
