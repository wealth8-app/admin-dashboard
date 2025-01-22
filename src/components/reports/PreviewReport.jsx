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
import { Font, Page, View, Document, StyleSheet, Text, PDFViewer } from '@react-pdf/renderer';
import numeral from 'numeral';
import Send from './Send';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const styles = StyleSheet.create({
  page: {
    padding: 30,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  content: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 15,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableCol: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#222222',
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
    fontFamily: 'Lato',
  },
  tableHead: {
    fontSize: 11,
    fontFamily: 'Lato Bold',
  },
  empty: {
    height: 20,
  },
});

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: 'Lato Italic',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const ReportItem = ({ label, value, currency }) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{label} </Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>
          {currency && '£'} {numeral(value).format(currency ? '0,0.00' : '0')}
        </Text>
      </View>
    </View>
  );
};

export default function Preview({ values, date }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
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
            <Send values={values} date={date} />
          </Toolbar>
        </AppBar>

        <Box sx={{ width: '100%', height: '100%' }} id="reports">
          <PDFViewer>
            <Document title={date}>
              <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                  <View style={styles.content}>
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableHead} />
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableHead}>Reports</Text>
                        </View>
                      </View>

                      <ReportItem label="AUM" value={values?.aum} currency />
                      <ReportItem label="Deposits" value={values?.deposits} currency />
                      <ReportItem label="Withdrawals" value={values?.withdrawals} currency />
                    </View>

                    <View style={styles.empty} />

                    <View style={styles.table}>
                      <ReportItem label="App Downloads" value={values?.appDownloads} />
                      <ReportItem label="Accounts Created" value={values?.accountsCreated} />
                      <ReportItem label="Accounts Funded" value={values?.accountsFunded} />

                      <ReportItem label="Active Users (App)" value={values?.activeUsers} />
                      <ReportItem label="Average Session Duration" value={values?.averageSessionDuration} />
                      <ReportItem label="Website Visits" value={values?.websiteVisits} />
                    </View>

                    <View style={styles.empty} />

                    <View style={styles.table}>
                      <ReportItem label="Onboarding Time (mins)" value={values?.onboardingTime} />
                      <ReportItem
                        label="Support Ticket Resolution Time (hours)"
                        value={values?.supportTicketResolutionTime}
                      />
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </Box>
      </Dialog>
    </>
  );
}
