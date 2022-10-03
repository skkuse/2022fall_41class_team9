import styled from "styled-components";
import { IoHomeSharp } from "react-icons/io5";

const NavBarLeftContainer = styled.div`
  flex: 1;
  align-items: center;
`;

const HomeBtn = styled.button`
  width: 50px;
  height: 100%;
  background-color: transparent;
  border: none;
  margin-left: 18px;
`;

function NavBarLeft() {
  return (
    <NavBarLeftContainer>
      <HomeBtn>
        <IoHomeSharp size="1.8rem" />
      </HomeBtn>
    </NavBarLeftContainer>
  );
}

export default NavBarLeft;
