import styled from "styled-components";
import { AiTwotoneSetting } from "react-icons/ai";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

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
`;

// interface SettingOverlayType {
//   isSettingOpen: boolean;
// }
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

  return (
    <NavBarRightContainer>
      <ShowDue>2022.10.24</ShowDue>
      <SettingBtn onClick={() => setIsSettingOpen(true)}>
        <AiTwotoneSetting size="1.8rem" color="#E5E535" />
      </SettingBtn>
      <SettingOverlay
        isSettingOpen={isSettingOpen}
        onClick={() => setIsSettingOpen(false)}
      />
      <SettingSideBar isSettingOpen={isSettingOpen}>
        <CloseBtn onClick={() => setIsSettingOpen(false)}>
          <AiOutlineClose size="1.8rem" />
        </CloseBtn>
      </SettingSideBar>
    </NavBarRightContainer>
  );
}

export default NavBarRight;
