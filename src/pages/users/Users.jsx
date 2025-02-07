import { useEffect, useState } from 'react';
import { Stack, Container, Typography, Button } from '@mui/material';
import { DefinedRange } from 'react-date-range';
import Popover from '@mui/material/Popover';
import { useQuery } from 'react-query';
import Page from '../../components/Page';
import { DetailsCard } from './components/Card';
import Iconify from '../../components/Iconify';
import useApi from '../../services';
import { ANALYTICS_REQUESTS } from '../../services/requests';
import { formatDate } from '../../utils/formatTime';

export default function User() {
  const api = useApi();
  const getDateOnly = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const today = getDateOnly(new Date());
  const yesterday = getDateOnly(new Date(today));
  yesterday.setDate(today.getDate() - 1);

  const [state, setState] = useState([
    {
      startDate: today,
      endDate: today,
      key: 'selection',
    },
  ]);

  const [buttonText, setButtonText] = useState('Today');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (item) => {
    const startDate = getDateOnly(item.selection.startDate);
    let endDate = getDateOnly(item.selection.endDate);

    if (startDate.getTime() === yesterday.getTime() && endDate.getTime() === yesterday.getTime()) {
      endDate = today;
    }

    setState([{ startDate, endDate, key: 'selection' }]);

    if (startDate.getTime() === today.getTime() && endDate.getTime() === today.getTime()) {
      setButtonText('Today');
    } else if (startDate.getTime() === yesterday.getTime() && endDate.getTime() === today.getTime()) {
      setButtonText('Since Yesterday');
    } else {
      setButtonText(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    }

    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const getData = async () =>
    api.get(
      `${ANALYTICS_REQUESTS.USERS}?start_date=${formatDate(state[0].startDate, 'YYYY-MM-DD')}&end_date=${formatDate(
        state[0].endDate,
        'YYYY-MM-DD'
      )}`
    );

  const { data, isLoading } = useQuery({
    queryKey: ['user-analytics', state[0].startDate, state[0].endDate],
    queryFn: getData,
  });

  const [details, setDetails] = useState({
    new_users: 0,
    onboarded_users: 0,
    active_users: 0,
    average_session_duration: 0,
    average_onboarding_duration: 0,
  });

  useEffect(() => {
    if (data?.data) {
      setDetails(data?.data);
    }
  }, [data]);

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button
            variant="contained"
            endIcon={<Iconify icon="material-symbols:arrow-drop-down-rounded" />}
            onClick={handleClick}
            disabled={isLoading}
          >
            {buttonText}
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <DefinedRange onChange={handleDateChange} ranges={state} />
          </Popover>
        </Stack>

        <Stack direction="column" gap={3} width="100%">
          <Stack direction="row" alignItems="center" gap={3} width="100%">
            <DetailsCard title="New Users" value={details.new_users} loading={isLoading} />
            <DetailsCard title="Onboarded Users" value={details.onboarded_users} loading={isLoading} />
            <DetailsCard title="Active Users" value={details.active_users} loading={isLoading} />
          </Stack>

          <Stack direction="row" alignItems="center" gap={3} width="100%">
            <DetailsCard
              title="Average Session Duration (mins)"
              value={details.average_session_duration}
              loading={isLoading}
            />
            <DetailsCard
              title="Onboarding Time (mins)"
              value={details.average_onboarding_duration}
              loading={isLoading}
            />
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
}
