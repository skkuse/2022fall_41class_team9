import ReactApexChart from "react-apexcharts";
import GraphContainer from "../GraphContainer";
import InfoContainer from "../InfoContainer";
import Title from "../Title";

import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { submitResultState } from "../../../atoms";
import { readabilityChartState } from "../../../chartStates/readabilityChartState";

function ReadabilityDashboard() {
  const submitResult = useRecoilValue(submitResultState);

  const [openedIdx, setOpenedIdx] = useState(0);

  const handleTestcaseClick = (idx) => {
    if (idx === openedIdx) {
      setOpenedIdx(-1);
    } else {
      setOpenedIdx(idx);
    }
  };
  const readabilitySummaryChart = readabilityChartState(submitResult);
  return (
    <>
      <Title label={"가독성 검사"} />
      <GraphContainer>
        <ReactApexChart
          options={readabilitySummaryChart.options}
          series={readabilitySummaryChart.series}
          type="radar"
          height={480}
        />
      </GraphContainer>
      <InfoContainer>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              가독성 분석 항목
            </ListSubheader>
          }
        >
          {(submitResult.readabilityType
            ? submitResult.readabilityType
            : [...Array(4).keys()]
          ).map((item, idx) => (
            <div key={idx}>
              <ListItemButton
                onClick={() => handleTestcaseClick(idx)}
                sx={{ display: "flex" }}
              >
                <ListItemText
                  primary={item.id}
                  disableTypography
                  sx={{ flex: 1, fontWeight: 800 }}
                />
                <ListItemText
                  primary={`${item.score}/100점`}
                  sx={{ flex: 1 }}
                />

                {item.moreInfo && item.moreInfo.length > 0 ? (
                  openedIdx === idx ? (
                    <MdExpandLess />
                  ) : (
                    <MdExpandMore />
                  )
                ) : null}
              </ListItemButton>
              <Collapse in={openedIdx === idx} timeout="auto" unmountOnExit>
                {item.length > 0
                  ? item.moreInfo.map((info) => (
                      <List key={info.label} component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={info.label} />
                        </ListItemButton>
                        {/* <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={info.result} />
                    </ListItemButton> */}
                      </List>
                    ))
                  : null}
              </Collapse>
            </div>
          ))}
        </List>
      </InfoContainer>
    </>
  );
}
export default ReadabilityDashboard;
