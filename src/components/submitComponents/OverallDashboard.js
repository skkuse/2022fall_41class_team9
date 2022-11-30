import { Grid } from "@mui/material";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { submitResultState } from "../../atoms";
import { Item } from "./Item";

const DUMMY_SUBMISSION = {
  functionality: [
    {
      id: 1,
      status: "pass",
      input: 5,
      output: 5,
      userOutput: 5,
    },
    {
      id: 2,
      status: "pass",
      input: 10,
      output: 55,
      userOutput: 55,
    },
    {
      id: 3,
      status: "pass",
      input: 7,
      output: 13,
      userOutput: 13,
    },
    {
      id: 4,
      status: "pass",
      input: 15,
      output: 610,
      userOutput: 610,
    },
    {
      id: 5,
      status: "pass",
      input: 43,
      output: 433494437,
      userOutput: 433494437,
    },
  ],
  efficiency: [
    {
      id: "LOC",
      score: 100,
      moreInfo: [],
    },
    {
      id: "halstead",
      score: 60,
      moreInfo: [
        {
          label: "halstead_bugprop",
          result: 0.05449950455000452,
        },
        {
          label: "halstead_difficulty",
          result: 14.285714285714286,
        },
        {
          label: "halstead_effort",
          result: 2335.693052143051,
        },
        {
          label: "halstead_timerequired",
          result: 129.76072511905838,
        },
        {
          label: "halstead_volume",
          result: 163.49851365001356,
        },
      ],
    },
    {
      id: "CFC",
      score: 100,
      moreInfo: [],
    },
    {
      id: "DFC",
      score: 20,
      moreInfo: [],
    },
  ],
  readabilityType: [
    {
      id: "eradicate",
      score: 100,
      moreInfo: [],
    },
    {
      id: "mccabe",
      score: 100,
      moreInfo: [],
    },
    {
      id: "mypy",
      score: 100,
      moreInfo: [],
    },
    {
      id: "pycodestyle",
      score: 0,
      moreInfo: [
        {
          label: "trailing whitespace",
          result: "trailing whitespace",
        },
        {
          label: "missing whitespace after ','",
          result: "missing whitespace after ','",
        },
        {
          label: "missing whitespace around operator",
          result: "missing whitespace around operator",
        },
        {
          label: "missing whitespace around arithmetic operator",
          result: "missing whitespace around arithmetic operator",
        },
        {
          label: "no newline at end of file",
          result: "no newline at end of file",
        },
      ],
    },
    {
      id: "pydocstyle",
      score: 0,
      moreInfo: [
        {
          label: "Missing docstring in public module",
          result: "Missing docstring in public module",
        },
        {
          label: "Missing docstring in public function",
          result: "Missing docstring in public function",
        },
      ],
    },
    {
      id: "pyflakes",
      score: 100,
      moreInfo: [],
    },
    {
      id: "pylint",
      score: 100,
      moreInfo: [],
    },
    {
      id: "isort",
      score: 100,
      moreInfo: [],
    },
  ],
  codeExplanation:
    "1. It's defining a function called solution that takes in a parameter n.\n2. It's defining two variables a and b and assigning them the value 1.\n3. It's checking if n is equal to 1 or 2. If it is, it returns 1.\n4. It's looping",
  codeDiff: [],
  plagiarism: 1.0,
};
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
  series: [44, 55, 67, 83],
  options: {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return 249;
            },
          },
        },
      },
    },
    labels: ["Apples", "Oranges", "Bananas", "Berries"],
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
  const submitResult = useRecoilValue(submitResultState);
  useEffect(() => {
    console.log(submitResult);
  }, [submitResult]);

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
                type="radialBar"
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