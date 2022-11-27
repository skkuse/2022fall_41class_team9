import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { actionState, dialogOpenState } from "../../atoms";

const CenterFooterContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.bgColor};
  border-top: 1px solid ${({ theme }) => theme.primary};
`;
const FooterItems = styled.div`
  display: flex;
`;
const Item = styled.div`
  width: 30px;
  height: 30px;
  background-color: transparent;
  /* border: 1px solid black; */
  /* display: inline-block; */
  /* margin: 8px; */
  cursor: pointer;
  font-size: 10px;
  text-align: center;
  /* line-height: 50px; */
  border: none;
`;
const FooterBtns = styled.div``;
const Btn = styled.button`
  width: 40px;
  height: 30px;
  background-color: transparent;
  color: white;
  /* margin: 8px; */
  cursor: pointer;
  border: none;
`;

function CenterFooter() {
  const setAction = useSetRecoilState(actionState);
  const setDialogOpen = useSetRecoilState(dialogOpenState);

  function execute() {
    setAction("execute");
  }
  function grading() {
    setAction("grading");
  }
  function submit() {
    setAction("submit");
  }

  return (
    <CenterFooterContainer>
      <FooterItems>
        <Item>파일업로드</Item>
        <Item>새로고침</Item>
        <Item>복사</Item>
        <Item>다운로드</Item>
      </FooterItems>
      <FooterBtns>
        <Btn onClick={execute}>실행</Btn>
        <Btn onClick={grading}>채점</Btn>
        <Btn onClick={() => setDialogOpen(true)}>제출</Btn>
      </FooterBtns>
    </CenterFooterContainer>
  );
}
export default CenterFooter;
