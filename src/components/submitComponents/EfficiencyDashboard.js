import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { submitResultState } from "../../atoms";
import GraphContainer from "./GraphContainer";
import InfoContainer from "./InfoContainer";
import Title from "./Title";
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

function EfficiencyDashboard() {
  const submitResult = useRecoilValue(submitResultState);
  const efficencySummaryChart = {
    series: [
      {
        name: "Series 1",
        data: submitResult.efficiency
          ? submitResult.efficiency.map((item) => item.score)
          : [80, 50, 30, 40],
      },
    ],
    options: {
      chart: {
        // height: 350,
        type: "radar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColor: "black",
            fill: {
              colors: ["#a5dbf0"],
            },
          },
        },
      },

      xaxis: {
        categories: ["LOC", "Halstead", "CFC", "DFC"],
      },
      yaxis: { max: 100, min: 0 },
    },
  };

  const [openedIdx, setOpenedIdx] = useState(0);

  const handleTestcaseClick = (idx) => {
    if (idx === openedIdx) {
      setOpenedIdx(-1);
    } else {
      setOpenedIdx(idx);
    }
  };
  return (
    <>
      <Title label={"효율성 결과"} />
      <GraphContainer>
        <ReactApexChart
          options={efficencySummaryChart.options}
          series={efficencySummaryChart.series}
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
              효율성 분석 항목
            </ListSubheader>
          }
        >
          {(submitResult.efficiency
            ? submitResult.efficiency
            : [...Array(4).keys()]
          ).map((item, idx) => (
            <div key={idx}>
              <ListItemButton
                onClick={() => handleTestcaseClick(idx)}
                sx={{ display: "flex" }}
              >
                <ListItemText
                  disableTypography
                  primary={item.id}
                  sx={{ fontWeight: 800, flex: 1 }}
                />
                <ListItemText primary={`${item.score}점`} sx={{ flex: 1 }} />

                {item.moreInfo && item.moreInfo.length > 0 ? (
                  openedIdx === idx ? (
                    <MdExpandLess />
                  ) : (
                    <MdExpandMore />
                  )
                ) : null}
              </ListItemButton>
              <Collapse in={openedIdx === idx} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemText
                      disableTypography
                      primary={"상세 내용"}
                      sx={{ fontWeight: 600 }}
                    />
                  </ListItemButton>
                </List>
                {item.moreInfo.map((info) => (
                  <List key={info.label} component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4, display: "flex" }}>
                      <ListItemText sx={{ flex: 1 }} primary={info.label} />
                      <ListItemText
                        sx={{ flex: 1 }}
                        primary={`${info.result.toFixed(2)}점`}
                      />
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
            </div>
          ))}
        </List>
      </InfoContainer>
    </>
  );
}
export default EfficiencyDashboard;
