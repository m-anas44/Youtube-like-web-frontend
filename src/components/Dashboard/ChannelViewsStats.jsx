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
        theme: "dark", // You can dynamically set this based on the theme
        style: {
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "var(--tooltip-bg-color)", // Use a CSS variable for tooltip background
          color: "var(--tooltip-text-color)", // Tooltip text color
        },
        marker: {
          show: true,
        },
      },
      xaxis: {
        categories: options.categories || [],
        title: {
          text: "Date",
          style: {
            color: "var(--xaxis-color)", // Use a CSS variable for X-axis title color
            backgroundColor: "var(--xaxis-bg-color)", // X-axis background color
          },
        },
        labels: {
          style: {
            colors: "var(--xaxis-labels-color)", // Use a CSS variable for X-axis labels
          },
        },
      },
      yaxis: {
        title: {
          text: "Views",
          style: {
            color: "var(--yaxis-color)", // Use a CSS variable for Y-axis title color
            backgroundColor: "var(--yaxis-bg-color)", // Y-axis background color
          },
        },
        labels: {
          style: {
            colors: "var(--yaxis-labels-color)", // Use a CSS variable for Y-axis labels
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

function ChannelViewsStats({ dailyViewsData = [] }) {
  // Check if there is any data to display
  if (dailyViewsData.length === 0) {
    return (
      <p className="grid place-items-center text-center light-bg-secondary dark-bg-secondary font-normal-bold font-normal flex-grow">
        Data will display once it'll available.
      </p>
    );
  }

  // Prepare data for the bar chart
  const barChartSeries = [
    {
      name: "Views",
      data: dailyViewsData.map((item) => item.views),
    },
  ];

  // Determine time period for chart subtitle
  const timePeriod = `${new Date(
    dailyViewsData[0].date
  ).toLocaleDateString()} - ${new Date(
    dailyViewsData[dailyViewsData.length - 1].date
  ).toLocaleDateString()}`;

  return (
    <section className="font-normal-bold flex-grow">
      <Card>
        <CardBody className="!p-2 dark-bg-primary light-text-primary dark-text-primary">
          <Typography variant="h3" className="font-normal-bold font-bold">
            Views
          </Typography>
          <Typography variant="h6" color="gray" className="font-normal-bold">
            Time Period: {timePeriod}
          </Typography>
          <BarChart
            colors={["#1e88e5"]}
            options={{
              categories: dailyViewsData.map((item) => item.date),
            }}
            series={barChartSeries}
          />
        </CardBody>
      </Card>
    </section>
  );
}

export default ChannelViewsStats;
