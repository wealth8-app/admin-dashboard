/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { pdf } from '@react-pdf/renderer';
import useApi from '../../services';
import { ANALYTICS_REQUESTS } from '../../services/requests';
import { generatePDFDocument } from './pdf';
import { formatDate } from '../../utils/formatTime';

export default function Send({ values, startDate, endDate }) {
  const api = useApi();
  const date = `${startDate} - ${endDate}`;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pdfBlob, setPdfBlob] = React.useState(null);

  const generatePdf = async () => {
    const doc = generatePDFDocument({ values, date });
    const blob = await pdf(doc).toBlob();
    setPdfBlob(blob);
  };

  const handleClickOpen = async () => {
    await generatePdf();
    setOpen(true);
  };

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  const [emails, setEmails] = React.useState([]);

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append(
      'emails',
      emails.map(({ value }) => value)
    );
    formData.append('report', new File([pdfBlob], `${date} report.pdf`, { type: 'application/pdf' }));
    formData.append('startDate', formatDate(startDate, 'MMMM D, YYYY'));
    formData.append('endDate', formatDate(endDate, 'MMMM D, YYYY'));

    try {
      const response = await api.post(ANALYTICS_REQUESTS.REPORTS, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);

      toast.success(response?.data?.message || 'Successfully sent reports.', {
        position: 'top-right',
        autoClose: 5000,
      });
      setEmails([]);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
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
          <Box sx={{ marginTop: 1 }}>
            <Autocomplete
              multiple
              options={accounts}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} variant="standard" placeholder="Select accounts to send reports to" />
              )}
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
          <Button onClick={submit} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Send'}
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
