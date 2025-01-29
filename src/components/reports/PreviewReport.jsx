/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { PDFViewer } from '@react-pdf/renderer';
import Send from './Send';
import { generatePDFDocument } from './pdf';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function Preview({ values, startDate, endDate }) {
  const [open, setOpen] = React.useState(false);
  const date = `${startDate} - ${endDate}`;

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Preview
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {date}
            </Typography>
            <Send values={values} startDate={startDate} endDate={endDate} />
          </Toolbar>
        </AppBar>

        <Box sx={{ width: '100%', height: '100%' }} id="reports">
          <PDFViewer>{generatePDFDocument({ values, date })}</PDFViewer>
        </Box>
      </Dialog>
    </>
  );
}
