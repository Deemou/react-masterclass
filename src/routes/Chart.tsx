import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface RouteParams {
  coinId: string;
}
function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams() as unknown as RouteParams;
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => ({
                x: new Date(price.time_open * 1000),
                y: [price.open, price.high, price.low, price.close],
              })) as [{ x: Date; y: string[] }],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              type: "datetime",
            },
            yaxis: {
              labels: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
              tooltip: {
                enabled: true,
              },
            },
            // tooltip: {
            //   custom: function ({ seriesIndex, dataPointIndex, w }) {
            //     const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
            //     const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
            //     const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
            //     const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
            //     return (
            //       '<div class="apexcharts-tooltip-candlestick" style="margin: 10px;">' +
            //       '<div>Open: <span class="value">' +
            //       `$${o.toFixed(2)}` +
            //       "</span></div>" +
            //       '<div>High: <span class="value">' +
            //       `$${h.toFixed(2)}` +
            //       "</span></div>" +
            //       '<div>Low: <span class="value">' +
            //       `$${l.toFixed(2)}` +
            //       "</span></div>" +
            //       '<div>Close: <span class="value">' +
            //       `$${c.toFixed(2)}` +
            //       "</span></div>" +
            //       "</div>"
            //     );
            //   },
            // },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#f84646",
                  downward: "#374bff",
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
