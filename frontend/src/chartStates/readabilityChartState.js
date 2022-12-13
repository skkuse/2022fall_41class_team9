//가독성 그래프 옵션
export const readabilityChartState = (submitResult) => {
  const chartState = {
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

  return chartState;
};
