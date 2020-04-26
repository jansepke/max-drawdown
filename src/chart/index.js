import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { formatDate, formatNumber } from "../services/Format";
import ToolTip from "./Tooltip";

export default ({ data, markers, dataCount }) =>
  data.length > 0 && (
    <Paper>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ height: 700 }}>
          <ResponsiveLine
            data={data}
            animate={false}
            margin={{ bottom: 30, left: 55, right: 25, top: 10 }}
            xScale={{ type: "time", precision: "day" }}
            yScale={{ type: "linear", min: "auto" }}
            axisBottom={{
              format: "%Y",
              tickValues: "every 5 years",
              legend: "year",
              legendOffset: -12,
            }}
            axisLeft={{
              legend: "USD",
              legendOffset: 12,
            }}
            colors={{ scheme: "set1" }}
            lineWidth={1}
            tooltip={ToolTip}
            enablePoints={false}
            useMesh={true}
            markers={markers.map((item, idx) => ({
              axis: "x",
              value: item.date,
              lineStyle: { strokeDasharray: "10 5" },
              legend: `${formatDate(item.date)}: ${formatNumber(
                item.price,
                " USD"
              )}`,
              legendOrientation: "vertical",
              legendPosition: idx % 2 === 0 ? "top-left" : "top-right",
            }))}
          />
        </Grid>
        {dataCount > data[0].data.length && (
          <Grid item xs={12}>
            <Box mr={2}>
              <Typography variant="body2" align="right" color="textSecondary">
                The chart data is downsampled from {dataCount} to{" "}
                {data[0].data.length} dates for performance reasons.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
