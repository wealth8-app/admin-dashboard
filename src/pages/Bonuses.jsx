import * as React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

// import { filter } from 'lodash';
import { useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button,
} from '@mui/material';
import PageLoading from '../components/PageLoading';
import { ANALYTICS_REQUESTS } from '../services/requests';
import useApi from '../services/index';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import ConfirmDialog from '../components/ConfirmDialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'code', label: 'Referral Code', alignRight: false },
  { id: 'referrer', label: 'Referred By', alignRight: false },
  { id: 'referred', label: 'User', alignRight: false },
  { id: 'eligibility', label: 'Eligibility', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Payout', alignRight: false },
];

// ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

export default function Bonuses() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [bonusId, setBonusId] = useState('');

  const [payingOut, setPayingOut] = useState('');

  const [after] = useState(null);

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('createdAt');

  // const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(20);

  const api = useApi();

  const getBonuses = async () => api.get(ANALYTICS_REQUESTS.GET_BONUSES);

  const { error, isLoading, data = {} } = useQuery(['getBonuses', page], getBonuses, { retry: false });

  const onConfirm = async () => {
    try {
      setPayingOut(true);
      // TODO make http request
      setPayingOut(false);
    } catch (error) {
      setPayingOut(false);
      toast.error(error.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const {
    data: bonuses = [
      {
        id: '1R4wWhlZK5oiMLdzpQVM',
        timestamp: '2022-08-29T10:51:50.864Z',
        referrer: 'auth0|627251ba3d15de0068bbab98',
        referrerName: 'Eke Diala',
        referrerEmail: 'ekeenyinnaya+21@gmail.com',
        code: 'ZLRZAE',
        isPaid: false,
        isEligibleForPayment: false,
        bonusAmount: false,
        referred: 'ekeenyinnaya+23',
        referredName: 'Ubere Zenas 23',
        referredEmail: 'ekeenyinnaya+23@gmail.com',
      },
    ],
  } = data;

  console.log('bonuses', bonuses);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleFilterByName = (event) => {
  //   // setFilterName(event.target.value);
  // };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  // const filteredItems = applySortFilter(mandates.data || [], getComparator(order, orderBy), filterName);

  // const isItemNotFound = filteredItems.length === 0;

  const getStatusLabelColor = (status) => {
    if (status) {
      return 'success';
    }

    return 'error';
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  }, [error]);

  // React.useEffect(() => {
  //   if (mandates && mandates.after) {
  //     setAfter(mandates.after);
  //   }
  // }, [mandates]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Page title="Bonuses">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Referral Bonuses
          </Typography>
        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {bonuses?.map((row) => {
                    const { id, code, referrerName, referredName, isPaid, isEligibleForPayment } = row;
                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell align="left">{code}</TableCell>
                        <TableCell align="left">{referrerName}</TableCell>
                        <TableCell align="left">{referredName}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={getStatusLabelColor(isEligibleForPayment)}>
                            {isEligibleForPayment ? 'Eligible' : 'Not Eligible'}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={getStatusLabelColor(isPaid)}>
                            {isPaid ? 'Paid out' : 'Not Paid'}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            onClick={() => setBonusId(id)}
                            disabled={isPaid || !isEligibleForPayment || payingOut}
                            color="primary"
                            variant="contained"
                          >
                            Pay out
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {/* {isItemNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[bonuses?.length || 0]}
            component="div"
            count={after ? -1 : bonuses?.length}
            rowsPerPage={bonuses?.length}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <ConfirmDialog
            open={!!bonusId}
            onConfirm={onConfirm}
            handleClose={() => setBonusId('')}
            title="Confirm Payout"
            description="Loyalty bonuses will be paid to both the referrer and the referred user. This process is irreversible."
          />
        </Card>
      </Container>
    </Page>
  );
}
