// @mui
import { Grid, Container, Typography, Skeleton } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { ANALYTICS_REQUESTS } from '../services/requests';
import useApi from '../services';

// ----------------------------------------------------------------------

const useStyles = () => ({
  skeleton: {
    margin: 10,
  },
});

export default function InvestmentDetails() {
  const { user } = useAuth0();
  const api = useApi();

  const getAnalytics = async () => api.get(ANALYTICS_REQUESTS.GET_INVESTMENT_DETAILS);
  const { error, isLoading, data } = useQuery('getInvestmentDetails', getAnalytics);
  const [details, setDetails] = useState({
    totalDeposits: '£ 0.00',
    totalWithdrawals: '£ 0.00',
    totalParties: 0,
    averageDeposit: '£ 0.00',
    totalAUM: '£ 0.00',
    averageAUM: '£ 0.00',
    weeklyChangeInAUM: '0.00 %',
    monthlyChangeInAUM: '0.00 %',
  });
  const styles = useStyles();

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      setDetails(data.data);
    }
  }, [data]);

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
            <Grid item xs={12} sm={6}>
              <AppWidgetSummary
                title="Total Deposits"
                total={details.totalDeposits}
                color="success"
                icon={'ant-design:pound'}
                preserve
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <AppWidgetSummary
                color="error"
                title="Total Withdrawals"
                total={details.totalWithdrawals}
                icon={'ant-design:delete'}
                preserve
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppWidgetSummary
                color="warning"
                title="Total Parties"
                total={details.totalParties}
                icon={'ant-design:user'}
                preserve
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppWidgetSummary
                color="info"
                title="Average Deposits"
                total={details.averageDeposit}
                icon={'ant-design:pound'}
                preserve
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppWidgetSummary title="Total AUM" preserve total={details.totalAUM} icon={'ant-design:appstore'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppWidgetSummary
                color="success"
                title="Average AUM"
                total={details.averageAUM}
                icon={'ant-design:merge-cells'}
                preserve
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppWidgetSummary
                color="info"
                title="Weekly %Change in AUM"
                total={details.weeklyChangeInAUM}
                icon={'ant-design:diff'}
                preserve
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppWidgetSummary
                title="Monthly  %Change in AUM"
                total={details.monthlyChangeInAUM}
                icon={'ant-design:money-collect'}
                preserve
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
