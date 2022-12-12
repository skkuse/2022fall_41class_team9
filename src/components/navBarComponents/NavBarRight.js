import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { currentProblemInfoState } from "../../atoms";
import { useMediaQuery } from "react-responsive";
import SettingSideBar from "./SettingSideBar";

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
  font-size: 15px;

  @media screen and (max-width: 1100px) {
    font-size: 15px;
  }
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
  color: #bcbcbb;
`;

const SettingOverlay = styled.div`
  display: ${(props) => (props.isSettingOpen ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
`;

function NavBarRight() {
  // setting 버튼 클릭에 관한 state
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  // 제출 기한에 관한 state
  const [DDay, setDDay] = useState("60일");
  // 사용자가 선택한 문제 정보에 관한 state
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  // tablet screen일 시 layout
  const isTablet = useMediaQuery({
    query: "(max-width:1080px)",
  });
  // 제출 기한 계산
  const calculateDDay = (currentProblemInfo) => {
    if (!currentProblemInfo.hasOwnProperty("deadline")) return;
    const today = new Date();
    const dueDay = new Date(currentProblemInfo.deadline);
    const timeDiff = dueDay.getTime() - today.getTime();
    const dayDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    const hourDiff = Math.floor(
      (timeDiff - dayDiff * (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );

    const minDiff = Math.floor(
      (timeDiff -
        dayDiff * (24 * 60 * 60 * 1000) -
        hourDiff * (60 * 60 * 1000)) /
        (60 * 1000)
    );

    setDDay(
      isTablet
        ? `${dayDiff}D ${hourDiff}h ${minDiff}m`
        : `${dayDiff}일 ${hourDiff}시간 ${minDiff}분 남았습니다`
    );
  };

  useEffect(() => {
    calculateDDay(currentProblemInfo);
    const timeInterval = setInterval(calculateDDay, 10000, currentProblemInfo);
    return () => clearInterval(timeInterval);
  }, [currentProblemInfo, isTablet]);

  return (
    <NavBarRightContainer>
      <ShowDue>{currentProblemInfo ? DDay : "365일 남았습니다."}</ShowDue>
      <SettingBtn onClick={() => setIsSideBarOpen(true)}>
        <AiTwotoneSetting size="1.8rem" />
      </SettingBtn>
      <SettingOverlay
        isSettingOpen={isSideBarOpen}
        onClick={() => setIsSideBarOpen(false)}
      />
      <SettingSideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
    </NavBarRightContainer>
  );
}

export default NavBarRight;
