import styled from "styled-components";

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
`;
const CenterHeaderBtn = styled.button`
  width: 35px;
  height: 35px;
  background-color: black;
  color: white;
  margin: 4px;
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
function CenterHeader() {
  return (
    <CenterHeaderContainer>
      <CenterHeaderText></CenterHeaderText>
      <CenterHeaderBtnContainer>
        <Item>코드 저장</Item>
        <CenterHeaderBtn>1</CenterHeaderBtn>
        <CenterHeaderBtn>2</CenterHeaderBtn>
        <CenterHeaderBtn>3</CenterHeaderBtn>
      </CenterHeaderBtnContainer>
    </CenterHeaderContainer>
  );
}

export default CenterHeader;
