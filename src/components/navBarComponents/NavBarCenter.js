import styled from "styled-components";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const NavBarCenterContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const InfoContainer = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 10px;
  height: 60%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LeftArrowBtn = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  left: 0;
`;

const RightArrowBtn = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  right: 0;
`;

function NavBarCenter() {
  return (
    <NavBarCenterContainer>
      <InfoContainer>소공개</InfoContainer>
      <InfoContainer>
        문제 1번
        <LeftArrowBtn>
          <MdOutlineArrowBackIosNew size="1rem" />
        </LeftArrowBtn>
        <RightArrowBtn>
          <MdOutlineArrowForwardIos size="1rem" />
        </RightArrowBtn>
      </InfoContainer>
    </NavBarCenterContainer>
  );
}

export default NavBarCenter;
