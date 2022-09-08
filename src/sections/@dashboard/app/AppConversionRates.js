import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { CSVLink } from 'react-csv';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardActions, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { BaseOptionChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColor: PropTypes.string,
  barHeight: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, chartData, chartColor, barHeight = '28%', ...other }) {
  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight, borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
    colors: [chartColor],
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
      <CardActions>
        <CSVLink filename={`${title}-${new Date().toDateString()}`} data={chartData}>
          Download Report
        </CSVLink>
      </CardActions>
    </Card>
  );
}
