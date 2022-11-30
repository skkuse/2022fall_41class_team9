import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { submitResultState } from "../../atoms";
import GraphContainer from "./GraphContainer";
import InfoContainer from "./InfoContainer";
import Title from "./Title";

function EfficiencyDashboard() {
  const submitResult = useRecoilValue(submitResultState);
  const efficencySummaryChart = {
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40],
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
            // fill: {
            //   colors: ["#f8f8f8", "#fff"],
            // },
          },
        },
      },

      xaxis: {
        categories: ["LOC", "Halstead", "CFC", "DFC"],
      },
      yaxis: { max: 100, min: 0 },
    },
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
      <InfoContainer></InfoContainer>
    </>
  );
}
export default EfficiencyDashboard;
