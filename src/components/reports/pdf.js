/* eslint-disable react/prop-types */
import { Font, Page, View, Document, StyleSheet, Text } from '@react-pdf/renderer';
import numeral from 'numeral';

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

const ReportItem = ({ label, value, currency, duration }) => {
  let formattedValue;

  if (currency) {
    formattedValue = `£${numeral(value).format('0,0.00')}`;
  } else if (duration) {
    formattedValue = `${numeral(value).format('0.00')} ${duration}`;
  } else {
    formattedValue = numeral(value).format('0');
  }

  return (
    <View style={styles.tableRow}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{label}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{formattedValue}</Text>
      </View>
    </View>
  );
};

export function generatePDFDocument({ values, date }) {
  return (
    <Document title={date}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableHead}>{date}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableHead} />
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
              <ReportItem label="Average Session Duration" value={values?.averageSessionDuration} duration="minutes" />
              <ReportItem label="Website Visits" value={values?.websiteVisits} />
            </View>

            <View style={styles.empty} />

            <View style={styles.table}>
              <ReportItem label="Onboarding Time" value={values?.onboardingTime} duration="minutes" />
              <ReportItem label="Support Ticket Resolution Time" value={values?.supportTicketResolutionTime} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
