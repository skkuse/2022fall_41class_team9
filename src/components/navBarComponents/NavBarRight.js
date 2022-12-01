import { AiTwotoneSetting } from "react-icons/ai";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { DUMMY_DATA } from "../../constants/DummyData";
// import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentProblemInfoState,
  themeState,
  fontSizeState,
} from "../../atoms";
import { useMutation } from "react-query";
import { putUserUI } from "../../fetch";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
// import styled from "styled-components";

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

const SettingSideBar = styled.div`
  display: ${(props) => (props.isSettingOpen ? "block" : "none")};
  position: fixed;
  background-color: whitesmoke;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  z-index: 10;
`;

const SettingMenu = styled.button`
  height: 40px;
  width: 100%;
  background-color: bisque;
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

const MaterialUISwitch = styled(Switch)({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#8796A5",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#003892",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#8796A5",
    borderRadius: 20 / 2,
  },
});

function NavBarRight() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  function valuetext(value) {
    return `${value}°C`;
  }
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [theme, setTheme] = useRecoilState(themeState);
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  // const navigate = useNavigate();
  const [mode, setMode] = useState(true);
  const returnMode = (checked) => {
    if (checked) {
      return "dark";
    } else {
      return "light";
    }
  };
  const { mutate: UIMutate } = useMutation(
    () => putUserUI({ user_id: 1, setting_font: "C", setting_theme: "Dark" }),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );
  const handleModeToggle = () => {
    setTheme((prev) => !prev);
    UIMutate();
  };

  const calculateDDay = (due) => {
    const today = new Date();
    const dueDay = new Date(due);
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

    return `${dayDiff}일 ${hourDiff}시간 ${minDiff}분 남았습니다`;
  };

  return (
    <NavBarRightContainer>
      <ShowDue>
        {currentProblemInfo
          ? calculateDDay(currentProblemInfo.deadline)
          : "365일 남았습니다."}
      </ShowDue>
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
          }}
        >
          <AiOutlineClose size="1.8rem" />
        </CloseBtn>
        <FormGroup>
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                checked={theme}
                onChange={handleModeToggle}
              />
            }
            label="MUI switch"
          />
        </FormGroup>

        <Box sx={{ width: 300 }}>
          <div style={{ display: "flex", alignItems: "center", margin: "4px" }}>
            <Slider
              aria-label="FontSize"
              defaultValue={fontSize}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={10}
              max={50}
              sx={{ width: "100px", height: "15px" }}
              onChange={(e) => {
                setFontSize(e.target.value);
              }}
            />
            <div style={{ display: "inline-block", marginLeft: "24px" }}>
              FontSize
            </div>
          </div>
        </Box>
      </SettingSideBar>
    </NavBarRightContainer>
  );
}

export default NavBarRight;
