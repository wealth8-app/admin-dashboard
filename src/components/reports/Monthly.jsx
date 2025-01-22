/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  MenuItem,
  Stack,
  CircularProgress,
  Box,
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useQuery } from 'react-query';
import { formatDate } from '../../utils/formatTime';
import useApi from '../../services';
import { ANALYTICS_REQUESTS } from '../../services/requests';
import { ReportItem } from './components';
import PreviewReport from './PreviewReport';
import Send from './Send';

function getFirstDayOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export default function Reports() {
  const [open, setOpen] = useState(false);
  const api = useApi();

  const [state, setState] = useState({
    deposits: 2200,
    withdrawals: 0,
    aum: 2200,
    accounts: 0,
    fundedAccounts: 0,
  });

  const getReports = async () =>
    api.get(
      `${ANALYTICS_REQUESTS.REPORTS}?start_date=${formatDate(getFirstDayOfMonth(), 'YYYY-MM-DD')}&end_date=${formatDate(
        new Date(),
        'YYYY-MM-DD'
      )}`
    );

  const { data, isLoading } = useQuery('monthly-reports', getReports);

  const formik = useFormik({
    initialValues: {
      aum: state.aum,
      deposits: state.deposits,
      withdrawals: state.withdrawals,
      netDeposits: null,
      appDownloads: null,
      accountsCreated: state.accounts,
      accountsFunded: state.fundedAccounts,
      activeUsers: null,
      averageSessionDuration: null,
      websiteVisits: null,
      onboardingTime: null,
      supportTicketResolutionTime: null,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, getFieldProps, resetForm, values } = formik;

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  useEffect(() => {
    if (data?.data) {
      setState(data?.data);
    }
  }, [data]);

  return (
    <>
      <MenuItem onClick={() => setOpen(true)}>Monthly</MenuItem>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">Reports</Typography>

          <Stack direction="row" gap={1}>
            <Typography>{formatDate(getFirstDayOfMonth())}</Typography>
            <Typography>-</Typography>
            <Typography>{formatDate(new Date())}</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          {isLoading ? (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate id="report" onSubmit={handleSubmit}>
                <ReportItem title="AUM" prefix={'£'} {...getFieldProps('aum')} />
                <ReportItem title="Deposits" prefix={'£'} {...getFieldProps('deposits')} />
                <ReportItem title="Withdrawals" prefix={'£'} {...getFieldProps('withdrawals')} />
                <ReportItem title="App Downloads" {...getFieldProps('appDownloads')} />
                <ReportItem title="Accounts Created" {...getFieldProps('accountsCreated')} />
                <ReportItem title="Accounts Funded" {...getFieldProps('accountsFunded')} />
                <ReportItem title="Active Users (App)" {...getFieldProps('activeUsers')} />
                <ReportItem title="Average Session Duration" {...getFieldProps('averageSessionDuration')} />
                <ReportItem title="Website Visits" {...getFieldProps('websiteVisits')} />
                <ReportItem title="Onboarding Time" suffix="mins" {...getFieldProps('onboardingTime')} />
                <ReportItem
                  title="Support Ticket Resolution Time"
                  suffix="hours"
                  {...getFieldProps('supportTicketResolutionTime')}
                />
              </Form>
            </FormikProvider>
          )}
        </DialogContent>

        {!isLoading && (
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <PreviewReport values={values} date={`${formatDate(getFirstDayOfMonth())} - ${formatDate(new Date())}`} />

            <Send values={values} date={`${formatDate(getFirstDayOfMonth())} - ${formatDate(new Date())}`} />
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
