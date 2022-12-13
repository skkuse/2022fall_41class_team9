import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dialogOpenState, openedContentState } from "../../atoms";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { motion } from "framer-motion";

const SideBarContainer = styled.div`
  height: 100%;
  position: relative;
  width: 270px;
  background-color: #1976d2;
  box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.5);
  color: white;
`;

const QuestionInfo = styled.div`
  font-size: 20px;
  margin-top: 60px;
  margin-bottom: 20px;
  padding-left: 30px;
`;

const ExitBtn = styled(motion.button)`
  position: absolute;
  bottom: 30px;
  border: none;
  background-color: transparent;
  font-size: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  margin-left: 30px;
`;

function SideBar() {
  // 세부 제출결과에 관한 state
  const setOpen = useSetRecoilState(dialogOpenState);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [openedContent, setOpenedContent] = useRecoilState(openedContentState);
  const handleCollapseOpen = () => setCollapseOpen(!collapseOpen);
  return (
    <SideBarContainer>
      <QuestionInfo>검사 결과</QuestionInfo>

      <List>
        <ListItemButton
          sx={{
            paddingLeft: "30px",
            backgroundColor: openedContent === "main" ? "rgba(0,0,0,0.3)" : "",
          }}
          onClick={() => setOpenedContent("main")}
        >
          <ListItemText primary="전체 결과" />
        </ListItemButton>
        <ListItemButton
          onClick={handleCollapseOpen}
          sx={{ paddingLeft: "30px" }}
        >
          <ListItemText primary="제출 결과" />
          {collapseOpen ? <MdExpandLess /> : <MdExpandMore />}
        </ListItemButton>
        <Collapse
          in={collapseOpen}
          sx={{ paddingLeft: "30px" }}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                backgroundColor:
                  openedContent === "functionality" ? "rgba(0,0,0,0.3)" : "",
              }}
              onClick={() => setOpenedContent("functionality")}
            >
              <ListItemText primary="기능성 결과" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                backgroundColor:
                  openedContent === "efficiency" ? "rgba(0,0,0,0.3)" : "",
              }}
              onClick={() => setOpenedContent("efficiency")}
            >
              <ListItemText primary="효율성 결과" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                backgroundColor:
                  openedContent === "readability" ? "rgba(0,0,0,0.3)" : "",
              }}
              onClick={() => setOpenedContent("readability")}
            >
              <ListItemText primary="가독성 결과" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          onClick={() => setOpenedContent("explanation")}
          sx={{
            paddingLeft: "30px",
            backgroundColor:
              openedContent === "explanation" ? "rgba(0,0,0,0.3)" : "",
          }}
        >
          <ListItemText primary="코드 설명" />
        </ListItemButton>
        <ListItemButton
          onClick={() => setOpenedContent("related")}
          sx={{
            paddingLeft: "30px",
            backgroundColor:
              openedContent === "related" ? "rgba(0,0,0,0.3)" : "",
          }}
        >
          <ListItemText primary="관련 자료" />
        </ListItemButton>
      </List>
      <ExitBtn
        onClick={() => setOpen(false)}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <ImExit />
      </ExitBtn>
    </SideBarContainer>
  );
}

export default SideBar;
