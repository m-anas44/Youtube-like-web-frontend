import React, { Suspense, lazy, useMemo } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const Chart = lazy(() => import("react-apexcharts"));

function BarChart({ height = 350, series, colors, options }) {
  const chartOptions = useMemo(
    () => ({
      colors,
      chart: { type: "bar", height, toolbar: { show: false } },
      dataLabels: { enabled: true },
      legend: { show: true },
      tooltip: {
        theme: "dark", // Tooltip theme
        style: {
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "var(--tooltip-bg-color)",
          color: "var(--tooltip-text-color)",
        },
        marker: { show: true },
      },
      plotOptions: {
        bar: {
          borderRadius: 4, // Rounded corners for vertical bars
        },
      },
      xaxis: {
        categories: options.categories || [],
        title: {
          text: "Date",
          style: {
            color: "var(--xaxis-color)",
          },
        },
        labels: {
          style: {
            colors: "var(--xaxis-labels-color)",
          },
        },
      },
      yaxis: {
        title: {
          text: "Likes",
          style: {
            color: "var(--yaxis-color)",
          },
        },
        labels: {
          style: {
            colors: "var(--yaxis-labels-color)",
          },
        },
      },
    }),
    [height, colors, options]
  );

  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <Chart
        type="bar"
        height={height}
        series={series}
        options={chartOptions}
      />
    </Suspense>
  );
}

function ChannelLikeStats({ dailyLikesData = [] }) {
  if (dailyLikesData.length === 0) {
    return (
      <p className="grid place-items-center font-normal-bold font-normal">
        Data will display once it'll available.
      </p>
    );
  }

  // Prepare data for the bar chart
  const barChartSeries = [
    {
      name: "Likes",
      data: dailyLikesData.map((item) => item.likes),
    },
  ];

  // Set time period based on the data range
  const timePeriod = `${new Date(
    dailyLikesData[0].date
  ).toLocaleDateString()} - ${new Date(
    dailyLikesData[dailyLikesData.length - 1].date
  ).toLocaleDateString()}`;

  return (
    <section className="font-normal-bold flex-grow">
      <Card>
        <CardBody className="!p-2 dark-bg-primary light-text-primary dark-text-primary">
          <Typography variant="h3" className="font-normal-bold font-bold">
            Likes
          </Typography>
          <Typography variant="h6" color="gray" className="font-normal-bold">
            Time Period: {timePeriod}
          </Typography>
          <BarChart
            colors={["#1e88e5"]}
            options={{
              categories: dailyLikesData.map((item) => item.date),
            }}
            series={barChartSeries}
          />
        </CardBody>
      </Card>
    </section>
  );
}

export default ChannelLikeStats;
