import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useRecoilState, useRecoilValue } from "recoil";
import { forwardRef } from "react";
import styled from "@emotion/styled";
import { dialogOpenState, openedContentState } from "../../atoms";
import OverallDashboard from "./dashboards/OverallDashboard";
import SideBar from "./SideBar";
import FunctionalityDashboard from "./dashboards/FunctionalityDashboard";
import ReadabilityDashboard from "./dashboards/ReadabilityDashboard";
import RelatedDashboard from "./dashboards/RelatedDashboard";
import EfficiencyDashboard from "./dashboards/EfficiencyDashboard";
import ExplanationDashboard from "./dashboards/ExplanationDashboard";

const DialogWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #eff4f7;
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  overflow: auto;
  padding-top: 70px;
  display: ${(props) => (props.openedContent === "main" ? "block" : "none")};
`;

const FunctionalityContent = styled.div`
  flex: 1;
  padding: 40px;
  overflow: auto;
  padding-top: 60px;
  display: ${(props) =>
    props.openedContent === "functionality" ? "block" : "none"};
`;
const EfficiencyContent = styled.div`
  flex: 1;
  padding: 40px;
  overflow: auto;
  padding-top: 60px;
  display: ${(props) =>
    props.openedContent === "efficiency" ? "block" : "none"};
`;
const ReadabilityContent = styled.div`
  flex: 1;
  padding: 40px;
  overflow: auto;
  padding-top: 60px;
  display: ${(props) =>
    props.openedContent === "readability" ? "block" : "none"};
`;

const ExplanationContent = styled.div`
  flex: 1;
  padding: 40px;
  overflow: auto;
  padding-top: 60px;
  display: ${(props) =>
    props.openedContent === "explanation" ? "block" : "none"};
`;

const RelatedContent = styled.div`
  flex: 1;
  padding: 40px;
  overflow: auto;
  padding-top: 60px;
  display: ${(props) => (props.openedContent === "related" ? "block" : "none")};
`;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SubmitResult() {
  // 세부 제출결과에 관한 state
  const [open, setOpen] = useRecoilState(dialogOpenState);
  const openedContent = useRecoilValue(openedContentState);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogWrapper>
        <SideBar />
        <MainContent openedContent={openedContent}>
          <OverallDashboard />
        </MainContent>
        <FunctionalityContent openedContent={openedContent}>
          <FunctionalityDashboard />
        </FunctionalityContent>
        <EfficiencyContent openedContent={openedContent}>
          <EfficiencyDashboard />
        </EfficiencyContent>
        <ReadabilityContent openedContent={openedContent}>
          <ReadabilityDashboard />{" "}
        </ReadabilityContent>
        <ExplanationContent openedContent={openedContent}>
          <ExplanationDashboard />{" "}
        </ExplanationContent>
        <RelatedContent openedContent={openedContent}>
          <RelatedDashboard />
        </RelatedContent>
      </DialogWrapper>
    </Dialog>
  );
}
