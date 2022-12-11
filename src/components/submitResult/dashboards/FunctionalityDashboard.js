import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import GraphContainer from "../GraphContainer";
import InfoContainer from "../InfoContainer";
import Title from "../Title";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { submitResultState } from "../../../atoms";
import { useRecoilValue } from "recoil";
import { functionalityChartState } from "../../../chartStates/functionalitySummaryChartState";

function FunctionalityDashboard() {
  const submitResult = useRecoilValue(submitResultState);
  const [openedIdx, setOpenedIdx] = useState(0);
  const functionalityChart = functionalityChartState(submitResult, 350);

  const handleTestcaseClick = (idx) => {
    if (idx === openedIdx) {
      setOpenedIdx(-1);
    } else {
      setOpenedIdx(idx);
    }
  };

  return (
    <>
      <Title label={"기능성 결과"} />
      <GraphContainer>
        <ReactApexChart
          options={functionalityChart.options}
          series={functionalityChart.series}
          type="radialBar"
          height={450}
        />
      </GraphContainer>
      <InfoContainer>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              기능성 검사 결과
            </ListSubheader>
          }
        >
          {(submitResult.functionality
            ? submitResult.functionality
            : [...Array(7).keys()]
          ).map((item, idx) => (
            <div key={idx}>
              <ListItemButton onClick={() => handleTestcaseClick(idx)}>
                <ListItemText primary={`${idx + 1}번 테스트`} />
                <Button
                  variant="contained"
                  color={item.status === "pass" ? "primary" : "error"}
                  sx={{ marginRight: "20px" }}
                >
                  {item.status === "pass" ? "Pass" : "Fail"}
                </Button>
                {openedIdx === idx ? <MdExpandLess /> : <MdExpandMore />}
              </ListItemButton>
              <Collapse in={openedIdx === idx} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={`입력값 : ${item.input}`} />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={`기댓값 : ${item.output}`} />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={`출력값 : ${item.userOutput}`} />
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </InfoContainer>
    </>
  );
}
export default FunctionalityDashboard;
