import styled from "styled-components";
import { AiTwotoneSetting } from "react-icons/ai";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { DUMMY_DATA } from "../../constants/DummyData";
import { useNavigate } from "react-router-dom";

const NavBarRightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 18px;
`;

const ShowDue = styled.div`
  width: 50%;
  height: 60%;
  background-color: whitesmoke;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SettingBtn = styled.button`
  width: 50px;
  background-color: transparent;
  height: 100%;
  border: none;
  margin-right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color};
`;

const SettingOverlay = styled.div`
  display: ${(props) => (props.isSettingOpen ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const SettingSideBar = styled.div`
  display: ${(props) => (props.isSettingOpen ? "block" : "none")};
  position: fixed;
  background-color: whitesmoke;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
`;

const SettingMenu = styled.button`
  height: 40px;
  width: 100%;
  background-color: aliceblue;
  display: flex;
  padding-left: 20px;
  align-items: center;
  border: none;
`;

const CloseBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
`;
function NavBarRight() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <NavBarRightContainer>
      <ShowDue>{DUMMY_DATA.due}</ShowDue>
      <SettingBtn onClick={() => setIsSettingOpen(true)}>
        <AiTwotoneSetting size="1.8rem" />
      </SettingBtn>
      <SettingOverlay
        isSettingOpen={isSettingOpen}
        onClick={() => setIsSettingOpen(false)}
      />
      <SettingSideBar isSettingOpen={isSettingOpen}>
        <CloseBtn
          onClick={() => {
            setIsSettingOpen(false);
            console.log(isSettingOpen);
          }}
        >
          <AiOutlineClose size="1.8rem" />
        </CloseBtn>
        <SettingMenu onClick={() => navigate("/login")}>로그인</SettingMenu>
        <SettingMenu onClick={() => navigate("/signup")}>회원가입</SettingMenu>
      </SettingSideBar>
    </NavBarRightContainer>
  );
}

export default NavBarRight;
