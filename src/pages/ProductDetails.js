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
import { AppCurrentVisits, AppWidgetSummary, AppConversionRates } from '../sections/@dashboard/app';
import { ANALYTICS_REQUESTS } from '../services/requests';
import useApi from '../services';

// ----------------------------------------------------------------------

const useStyles = () => ({
  skeleton: {
    margin: 10,
  },
});

export default function ProductDetails() {
  const theme = useTheme();
  const { user } = useAuth0();
  const api = useApi();

  const getAnalytics = async () => api.get(ANALYTICS_REQUESTS.GET_PRODUCT_DETAILS);
  const { error, isLoading, data } = useQuery('getProductDetails', getAnalytics);
  const styles = useStyles();

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  }, [error]);

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
                title="Total Number Of Accounts"
                total={data.data?.totalAccounts || 0}
                color="success"
                icon={'ant-design:user'}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <AppWidgetSummary
                title="Total Number Of Portfolios"
                total={data.data?.totalFunds || 0}
                icon={'ant-design:appstore'}
              />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader=""
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid> */}
            {/* <Grid item xs={12} md={6} lg={6}>
              <AppCurrentVisits
                title="OS distribution [wip]"
                chartData={[
                  { label: 'ios', value: 300 },
                  { label: 'android', value: 89 },
                ]}
                chartColors={[
                  theme.palette.warning.dark,
                  // theme.palette.chart.blue[0],
                  theme.palette.error.dark,
                ]}
              />
            </Grid> */}
            <Grid item xs={12} md={6}>
              <AppCurrentVisits
                title="Accounts Distribution"
                chartData={data?.data?.accounts || []}
                chartColors={[theme.palette.primary.main, theme.palette.success.dark]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <AppConversionRates
                chartColor={theme.palette.primary.main}
                title="Funds distribution"
                subheader=""
                chartData={data?.data?.funds || []}
                barHeight="50%"
              />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={4}>
              <AppConversionRates
                chartColor={theme.palette.success.dark}
                title="Age Distribution"
                subheader=""
                chartData={[]}
              />
            </Grid> */}

            <Grid item xs={12} md={6}>
              <AppConversionRates
                chartColor={theme.palette.warning.dark}
                title="Risk Categories"
                chartData={data?.data?.riskCategories || []}
              />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject
                title="Current Subject"
                chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
                chartData={[
                  { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                  { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                  { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                ]}
                chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
              />
            </Grid> */}

            {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

            {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

            {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid> */}

            {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
          </Grid>
        )}
      </Container>
    </Page>
  );
}
