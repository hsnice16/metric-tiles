import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useMemo } from "react";
import { AreaChartProps } from "../../types";

export function AreaChart({ className, values }: AreaChartProps) {
  const chatOptionsData = useMemo(() => {
    const valuesLength = values.length;
    const data = [];

    for (let index = valuesLength - 1; index >= 0; index--) {
      const value = values[index];
      data.push([value.date, value.value]);
    }

    return data;
  }, [values]);

  const highChartOptions = useMemo(() => {
    return {
      title: {
        style: {
          display: "none",
        },
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      tooltip: {
        enabled: false,
      },
      series: [
        {
          marker: {
            enabled: false,
          },
          states: {
            hover: {
              enabled: false,
            },
          },
          type: "area",
          data: chatOptionsData,
          lineWidth: 1,
          color: {
            linearGradient: { x1: 0.3, x2: 1, y1: 1, y2: 1 },
            stops: [
              [0, "#119f9700"],
              [1, "#119f97"],
            ],
          },
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
            stops: [
              [0, "#119f9700"],
              [1, "#119f9775"],
            ],
          },
        },
      ],
    };
  }, [chatOptionsData]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={highChartOptions}
      containerProps={{ className }}
    />
  );
}
