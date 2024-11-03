import React, { Suspense, lazy, useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import merge from "deepmerge";
import axiosInstance from "../../pages/auth/refreshAccessToken";

// Lazy load the Chart component
const Chart = lazy(() => import("react-apexcharts"));

function BarChart({ height = 350, series, colors, options }) {
  const chartOptions = React.useMemo(
    () => ({
      colors,
      chart: {
        type: "bar",
        height,
        toolbar: { show: false },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: true,
      },
      tooltip: {
        theme: "light",
      },
      xaxis: {
        categories: options.categories,
      },
      yaxis: {
        title: { text: "Views" },
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

function ChannelStats({ channelId }) {
  const [dailyViewsData, setDailyViewsData] = useState([]);
  const [timePeriod, setTimePeriod] = useState(""); // New state for time period
  const hasFetched = useRef(false); // Track if data has been fetched

  useEffect(() => {
    const fetchVideoViews = async () => {
      if (hasFetched.current) return; // Only fetch once
      hasFetched.current = true;

      try {
        const response = await axiosInstance.get(
          `/dashboard/stats/${channelId}`
        );
        setDailyViewsData(response.data.data.channelDailyViews);
        // Set time period based on the available data
        if (response.data.data.channelDailyViews.length > 0) {
          const startDate = new Date(
            response.data.data.channelDailyViews[0].date
          ).toLocaleDateString();
          const endDate = new Date(
            response.data.data.channelDailyViews[
              response.data.data.channelDailyViews.length - 1
            ].date
          ).toLocaleDateString();
          setTimePeriod(`${startDate} - ${endDate}`);
        }
      } catch (error) {
        console.error("Failed to fetch video views:", error);
      }
    };

    fetchVideoViews();
  }, [channelId]);

  // Prepare data for the bar chart
  const barChartSeries = [
    {
      name: "Daily Views",
      data: dailyViewsData.map((item) => item.views), // Individual daily views
    },
  ];

  return (
    <section className="m-10 font-normal-bold">
      <Card>
        <CardBody className="!p-2">
          <Typography variant="h3" color="blue-gray" className="font-normal-bold font-bold">
            Daily Video Views
          </Typography>
          {timePeriod && (
            <Typography variant="h6" color="gray" className="font-normal-bold">
              Time Period: {timePeriod}
            </Typography>
          )}
          <BarChart
            colors={["#4CAF50"]}
            options={{
              categories: dailyViewsData.map((item) => item.date), // Dates for x-axis
            }}
            series={barChartSeries}
          />
        </CardBody>
      </Card>
    </section>
  );
}

export default ChannelStats;
