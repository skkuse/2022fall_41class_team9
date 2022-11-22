import { Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { Item } from "./Item";

const OverallContainer = styled.div``;
const OverallScore = styled.div`
  padding: 20px;
`;
const ComparisonContainer = styled.div`
  padding: 10px;
`;

const SummaryContainer = styled.div`
  padding: 15px;
`;

const Label = styled.div`
  font-size: 17px;
  text-align: start;
  font-weight: 500;
`;

const overallScoreChart = {
  series: [44, 55, 41, 17, 15],
  options: {
    chart: {
      type: "donut",
    },
    legend: { position: "bottom" },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};

const functionalityComparisionChart = {
  series: [
    {
      name: "Desktops",
      data: [10, 41, 35],
    },
  ],
  options: {
    chart: {
      height: 200,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      categories: ["1", "2", "3"],
    },
  },
};

const functionalitySummaryChart = {
  series: [70],
  options: {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
      },
    },
    labels: ["Cricket"],
  },
};

const efficencySummaryChart = {
  series: [
    {
      name: "Series 1",
      data: [80, 50, 30, 40, 100, 20],
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

    xaxis: {
      categories: ["January", "February", "March", "April", "May", "June"],
    },
  },
};

function OverallDashboard() {
  return (
    <OverallContainer>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Item sx={{ height: "700px !important" }}>
            <OverallScore>
              <Label style={{ fontSize: "27px" }}>Overall Score</Label>
              <ReactApexChart
                options={overallScoreChart.options}
                series={overallScoreChart.series}
                type="donut"
              />
            </OverallScore>
          </Item>

          <Item>
            <ComparisonContainer>
              <Label>총점 비교</Label>
            </ComparisonContainer>
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Item>
            <ComparisonContainer>
              <Label>기능 점수 비교</Label>
              <ReactApexChart
                options={functionalityComparisionChart.options}
                series={functionalityComparisionChart.series}
                type="line"
                height={210}
              />
            </ComparisonContainer>
          </Item>
          <Item>
            <ComparisonContainer>
              <Label>효율 점수 비교</Label>
            </ComparisonContainer>
          </Item>
          <Item>
            <ComparisonContainer>
              <Label>가독성 점수 비교</Label>
            </ComparisonContainer>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item sx={{ height: "500px !important" }}>
            <SummaryContainer>
              <Label style={{ marginBottom: "15px" }}>
                기능 점수 요약(p/f)
              </Label>
              <ReactApexChart
                options={functionalitySummaryChart.options}
                series={functionalitySummaryChart.series}
                type="radialBar"
                height={450}
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
                height={500}
              />
            </SummaryContainer>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ height: "500px !important" }}>
            <SummaryContainer>
              <Label>가독성 점수 요약</Label>
            </SummaryContainer>
          </Item>
        </Grid>
      </Grid>
    </OverallContainer>
  );
}

export default OverallDashboard;
