import { Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { submitResultState } from "../../../atoms";
import { efficencyChartState } from "../../../chartStates/efficiencyChartState";
import { functionalityChartState } from "../../../chartStates/functionalitySummaryChartState";
import { overallScoreChartState } from "../../../chartStates/overallScoreChartState";
import { readabilityChartState } from "../../../chartStates/readabilityChartState";
import { Item } from "../Item";

const OverallContainer = styled.div``;
const OverallScore = styled.div`
  padding: 20px;
`;

const SummaryContainer = styled.div`
  padding: 15px;
`;

const Label = styled.div`
  font-size: 17px;
  text-align: start;
  font-weight: 500;
`;

function OverallDashboard() {
  const submitResult = useRecoilValue(submitResultState);

  const overallScoreChart = overallScoreChartState(submitResult, 350);

  const functionalitySummaryChart = functionalityChartState(submitResult, 350);

  const efficencySummaryChart = efficencyChartState(submitResult);

  const readabilitySummaryChart = readabilityChartState(submitResult);

  return (
    <OverallContainer>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Item sx={{ height: "700px !important" }}>
            <OverallScore>
              <Label style={{ fontSize: "27px" }}>Overall Score</Label>
              <ReactApexChart
                options={overallScoreChart.options}
                series={overallScoreChart.series}
                type="radialBar"
                height={650}
              />
            </OverallScore>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item sx={{ height: "500px !important" }}>
            <SummaryContainer>
              <Label style={{ marginBottom: "15px" }}>기능 점수 요약</Label>
              <ReactApexChart
                options={functionalitySummaryChart.options}
                series={functionalitySummaryChart.series}
                type="radialBar"
                height={420}
              />
            </SummaryContainer>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ height: "500px !important" }}>
            <SummaryContainer>
              <Label>효율 점수 요약</Label>
              <ReactApexChart
                options={efficencySummaryChart.options}
                series={efficencySummaryChart.series}
                type="radar"
                height={420}
              />
            </SummaryContainer>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ height: "500px !important" }}>
            <SummaryContainer>
              <Label>가독성 점수 요약</Label>
              <ReactApexChart
                options={readabilitySummaryChart.options}
                series={readabilitySummaryChart.series}
                type="radar"
                height={420}
              />
            </SummaryContainer>
          </Item>
        </Grid>
      </Grid>
    </OverallContainer>
  );
}

export default OverallDashboard;
