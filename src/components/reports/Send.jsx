/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import useApi from '../../services';
import { ANALYTICS_REQUESTS } from '../../services/requests';

export default function Send({ values, date }) {
  const api = useApi();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [emails, setEmails] = React.useState([accounts[0]]);

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post(ANALYTICS_REQUESTS.REPORTS, {
        date,
        values,
      });

      toast.success('Successfully sent reports.', {
        position: 'top-right',
        autoClose: 5000,
      });
      setOpen(false);
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Send
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const { email } = formJson;
            console.log(email);
            handleClose();
          },
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Send Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Select accounts to send reports to</Typography>
          </DialogContentText>

          <Box sx={{ marginTop: 5 }}>
            <Autocomplete
              multiple
              options={accounts}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => <TextField {...params} variant="standard" />}
              value={emails}
              freeSolo
              onChange={(e, value) => {
                setEmails(value);
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={submit} variant="contained">
            {loading ? <CircularProgress /> : 'Send'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const accounts = [
  { label: 'Bimpe', value: 'bimpe@wealth-8.com' },
  { label: 'Dave', value: 'dave@wealth-8.com' },
  { label: 'Rahul', value: 'rahul@wealth-8.com' },
  { label: 'Cheta', value: 'cheta@wealth-8.com' },
  { label: 'Eke', value: 'eke@wealth-8.com' },
  { label: 'Ade', value: 'oluwaferanmi@wealth-8.com' },
  { label: 'DT', value: 'Durotimi@wealth-8.com' },
  { label: 'Dami', value: 'dami@wealth-8.com' },
];
