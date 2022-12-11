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
  color: #bcbcbb;
  cursor: pointer;
`;

function NavBarLeft() {
  const handleHomeBtnClick = () => {
    window.location.reload();
  };

  return (
    <NavBarLeftContainer>
      <HomeBtn onClick={handleHomeBtnClick}>
        <IoHomeSharp size="1.8rem" />
      </HomeBtn>
    </NavBarLeftContainer>
  );
}

export default NavBarLeft;
