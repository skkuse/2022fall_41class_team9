//총점그래프 옵션
export const overallScoreChartState = (submitResult, height) => {
  const chartState = {
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
        : [0, 0, 0],
    options: {
      chart: {
        height,
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
              formatter: function (val) {
                return val.slice(0, 5) + "점";
              },
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                const total =
                  w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0) / w.globals.series.length;
                return total.toFixed(2) + "점";
              },
            },
          },
        },
      },
      labels: ["기능성", "효율성", "가독성"],
    },
  };
  return chartState;
};
