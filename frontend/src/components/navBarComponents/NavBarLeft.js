import styled from "styled-components";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
  // home 모양의 버튼 클릭 시 reload
  const navigate = useNavigate();
  const handleHomeBtnClick = () => {
    navigate("/");
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
