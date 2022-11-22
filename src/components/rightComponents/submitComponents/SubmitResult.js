import Dialog from "@mui/material/Dialog";

import Slide from "@mui/material/Slide";
import { useRecoilState } from "recoil";
import { dialogOpenState } from "../../../atoms";

import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import styled from "@emotion/styled";
// "#1976D2"

const DialogWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #eff4f7;
  display: flex;
`;
const SideBar = styled.div`
  height: 100%;

  width: 300px;
  background-color: #1976d2;
  box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.5);
  color: white;
  padding-left: 30px;
`;

const QuestionInfo = styled.div`
  font-size: 20px;
  margin-top: 60px;
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  overflow: auto;
  padding-top: 100px;
`;

const OverallContainer = styled.div``;
const OverallScore = styled.div``;
const FuctionalityComparison = styled.div``;
const EfficiencyComparison = styled.div``;
const ReadabilityComparison = styled.div``;
const FuctionalitySummary = styled.div``;
const EfficiencySummary = styled.div``;
const ReadabilitySummary = styled.div``;
const OverallComparison = styled.div``;

const FunctionalityContainer = styled.div``;
const EfficienyContainer = styled.div``;
const ReadabilityContainer = styled.div``;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  height: "200px",
  // padding: "20px",
  textAlign: "center",
  color: "grey",
  marginBottom: "16px",
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SubmitResult() {
  const [open, setOpen] = useRecoilState(dialogOpenState);

  const [collapseOpen, setCollapseOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCollapseOpen = () => setCollapseOpen(!collapseOpen);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogWrapper>
        <SideBar>
          <QuestionInfo>소공개 3번</QuestionInfo>
          <List>
            <ListItemButton onClick={handleCollapseOpen}>
              <ListItemText primary="제출 결과" />
              {open ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="기능성 결과" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="효율성 결과" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="가독성 결과" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton>
              <ListItemText primary="코드 설명" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="관련 자료" />
            </ListItemButton>
          </List>
        </SideBar>
        <MainContent>
          <OverallContainer>
            <Grid container spacing={4}>
              <Grid item xs={7}>
                <Item sx={{ height: "700px !important" }}>
                  <OverallScore>Overall Score</OverallScore>
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item>
                  <FuctionalityComparison>
                    기능 점수 비교
                  </FuctionalityComparison>
                </Item>
                <Item>
                  <EfficiencyComparison>효율 점수 비교</EfficiencyComparison>
                </Item>
                <Item>
                  <ReadabilityComparison>
                    가독성 점수 비교
                  </ReadabilityComparison>
                </Item>

                <Item>
                  <OverallComparison>총점 비교</OverallComparison>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item sx={{ height: "500px !important" }}>
                  <FuctionalitySummary>기능 점수 요약(p/f)</FuctionalitySummary>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item sx={{ height: "500px !important" }}>
                  <EfficiencySummary>효율 점수 요약</EfficiencySummary>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item sx={{ height: "500px !important" }}>
                  <ReadabilitySummary>가독성 점수 요약</ReadabilitySummary>
                </Item>
              </Grid>
            </Grid>
          </OverallContainer>
        </MainContent>
      </DialogWrapper>
    </Dialog>
  );
}
