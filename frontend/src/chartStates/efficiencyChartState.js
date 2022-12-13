//효율성 그래프 옵션
export const efficencyChartState = (submitResult) => {
  const chartState = {
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

  return chartState;
};
