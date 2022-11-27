import ReactApexChart from "react-apexcharts";
import GraphContainer from "./GraphContainer";
import InfoContainer from "./InfoContainer";
import Title from "./Title";

function ReadabilityDashboard() {
  const readabilitySummaryChart = {
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
      <InfoContainer></InfoContainer>
    </>
  );
}
export default ReadabilityDashboard;
