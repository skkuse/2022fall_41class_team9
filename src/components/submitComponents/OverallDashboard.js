import { Grid } from "@mui/material";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { submitResultState } from "../../atoms";
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

function OverallDashboard() {
  const submitResult = useRecoilValue(submitResultState);

  const overallScoreChart = {
    series:
      submitResult.functionality &&
      submitResult.efficiency &&
      submitResult.readabilityType
        ? [
            submitResult.functionality.reduce((sum, curr) => {
              if (curr.status === "pass") {
                return sum + 1;
              } else {
                return sum;
              }
            }, 0) * 20,
            submitResult.efficiency.reduce((sum, curr) => {
              return sum + curr.score;
            }, 0) / 4,
            submitResult.readabilityType.reduce((sum, curr) => {
              return sum + curr.score;
            }, 0) / 8,
          ]
        : [44, 55, 67],
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
              // formatter: function (w) {
              //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //   return 249;
              // },
            },
          },
        },
      },
      labels: ["기능성", "효율성", "가독성"],
    },
  };

  const functionalitySummaryChart = {
    series: [
      submitResult.functionality
        ? submitResult.functionality.reduce((sum, curr) => {
            if (curr.status === "pass") {
              return sum + 1;
            } else {
              return sum;
            }
          }, 0) * 20
        : 70,
    ],
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
          hollow: {
            size: "70%",
            margin: 0,

            background: "#293450",
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "20px",
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true,
            },
          },
        },
      },
      labels: ["기능성"],
    },
  };

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

  const readabilitySummaryChart = {
    series: [
      {
        name: "Series 1",
        data: submitResult.readabilityType
          ? submitResult.readabilityType.map((item) => item.score)
          : [80, 50, 30, 40, 100, 20, 100, 100],
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
        categories: [
          "eradicate",
          "mccabe",
          "mypy",
          "pycodestyle",
          "pydocstyle",
          "pyflakes",
          "pylint",
          "isort",
        ],
      },
      yaxis: { max: 100, min: 0 },
    },
  };

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
          {/* 
          <Item>
            <ComparisonContainer>
              <Label>총점 비교</Label>
            </ComparisonContainer>
          </Item> */}
        </Grid>
        {/* <Grid item xs={5}>
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
        </Grid> */}

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
                height={500}
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
                height={500}
              />
            </SummaryContainer>
          </Item>
        </Grid>
      </Grid>
    </OverallContainer>
  );
}

export default OverallDashboard;
