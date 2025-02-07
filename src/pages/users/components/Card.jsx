/* eslint-disable react/prop-types */
import { Card, Typography, CircularProgress } from '@mui/material';

export const DetailsCard = ({ title, value, loading }) => (
  <Card
    sx={{
      borderRadius: '16px',
      padding: '24px',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}
  >
    <Typography
      sx={{
        fontSize: '0.875rem',
        color: '#1C252E',
        fontWeight: '600',
        lineHeight: '1.57143',
        fontFamily: `Public Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol`,
      }}
    >
      {title}
    </Typography>

    <Typography
      sx={{
        fontSize: '2rem',
        fontFamily: `Barlow, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol`,
        fontWeight: '700',
        lineHeight: '1.5',
        color: '#1C252E',
      }}
      variant="h3"
    >
      {loading ? <CircularProgress size={20} /> : value}
    </Typography>
  </Card>
);
