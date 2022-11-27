import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import GraphContainer from "./GraphContainer";
import InfoContainer from "./InfoContainer";
import Title from "./Title";
import { Rnd } from "react-rnd";

function FunctionalityDashboard() {
  const [resize, setResize] = useState({ width: 350, height: 350 });
  const functionalityChart = {
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
      <InfoContainer></InfoContainer>
      <div>
        <Rnd
          style={{
            position: "relative",
            backgroundColor: "beige",
            transform: "",
          }}
          size={{ width: resize.width, height: resize.height }}
          // onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setResize({
              width: ref.style.width,
              height: ref.style.height,
              // ...position,
            });
          }}
        >
          001
        </Rnd>
      </div>
    </>
  );
}
export default FunctionalityDashboard;
