export const functionalityChartState = (submitResult, height) => {
  const chartState = {
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
        height,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
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
  return chartState;
};
