import styled from "styled-components";

const CenterFooterContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const FooterItems = styled.div``;
const Item = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border: 1px solid black;
  display: inline-block;
  margin: 8px;
  cursor: pointer;
  font-size: 10px;
  text-align: center;
  line-height: 50px;
`;
const FooterBtns = styled.div``;
const Btn = styled.button`
  width: 50px;
  height: 50px;
  background-color: black;
  color: white;
  margin: 8px;
  cursor: pointer;
`;
function execute() {}
function save() {}
function submit() {}
function CenterFooter() {
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
        <Btn onClick={save}>저장</Btn>
        <Btn onClick={submit}>제출</Btn>
      </FooterBtns>
    </CenterFooterContainer>
  );
}
export default CenterFooter;
