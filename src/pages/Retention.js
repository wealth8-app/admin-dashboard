// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Skeleton } from '@mui/material';
// components
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import Page from '../components/Page';
// sections
import { AppCurrentVisits, AppConversionRates } from '../sections/@dashboard/app';
import { ANALYTICS_REQUESTS } from '../services/requests';
import useApi from '../services';

// ----------------------------------------------------------------------

const useStyles = () => ({
  skeleton: {
    margin: 10,
  },
});

export default function Retention() {
  const theme = useTheme();
  const styles = useStyles();
  const { user } = useAuth0();
  const api = useApi();

  const getFrequentDeposits = async () => api.get(ANALYTICS_REQUESTS.FREQUENT_DEPOSITS);
  const getRetentionDetails = async () => api.get(ANALYTICS_REQUESTS.RETENTION_DETAILS);

  const { error, data = {} } = useQuery('getRetentionData', getRetentionDetails, { retry: false });

  const {
    error: depositsError,
    isLoading,
    data: response = {},
  } = useQuery('getFrequentDeposits', getFrequentDeposits, { retry: false });

  const { data: retentionDetails = {} } = data;
  const { data: frequentDeposits } = response;

  useEffect(() => {
    if (error || depositsError) {
      toast.error(error?.message || depositsError?.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  }, [error, depositsError]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi,{' '}
          <Typography variant="h4" as="span" sx={{ textTransform: 'capitalize' }}>
            {user?.name}
          </Typography>
          . Welcome back.
        </Typography>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" style={styles.skeleton} animation="wave" height={150} />
            <Skeleton variant="rectangular" style={styles.skeleton} animation="wave" height={150} />
            <Skeleton variant="rectangular" style={styles.skeleton} animation="wave" height={150} />
          </>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <AppConversionRates
                chartColor={theme.palette.primary.main}
                title="% of frequent deposit per user"
                subheader="Frequency of deposits distribution."
                chartData={frequentDeposits?.frequency || []}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <AppConversionRates
                chartColor={theme.palette.success.dark}
                title="Large deposits"
                subheader="The top 10 portfolios with the largest valuation amount."
                chartData={retentionDetails?.topDepositors || []}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AppConversionRates
                chartColor={theme.palette.success.dark}
                title="Most frequent depositors"
                subheader="The top 10 portfolios with the highest deposit frequency."
                chartData={retentionDetails?.frequency || []}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AppCurrentVisits
                title="% of users that has made withdrawals"
                chartData={retentionDetails?.withdrawals || []}
                chartColors={[theme.palette.info.dark, theme.palette.warning.dark, theme.palette.success.dark]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AppCurrentVisits
                title="Percentage of churned users"
                subheader="Users with > 50% withdrawal of total deposits."
                chartData={retentionDetails?.churn || []}
                chartColors={[theme.palette.error.main, theme.palette.info.dark]}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
