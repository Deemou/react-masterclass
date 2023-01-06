import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const Message = styled.div`
  text-align: center;
  font-size: 20px;
`;

interface ChartProps {
  coinId: string;
  isDark: boolean;
}

interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId, isDark } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IData[]>(
    ["price in chart", coinId],
    () => fetchCoinHistory(coinId)
  );
  const chartData = data?.map((price) => ({
    x: new Date(price.time_open * 1000),
    y: [
      Number(price.open).toFixed(2),
      Number(price.high).toFixed(2),
      Number(price.low).toFixed(2),
      Number(price.close).toFixed(2),
    ],
  }));

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : !chartData ? (
        <Message>Sorry! We can't provide any chart.</Message>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              labels: {
                formatter: (value) => `$${value.toFixed(1)}`,
              },
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#f84646",
                  downward: "#374bff",
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
