import { Skeleton } from '@mui/material';

const useStyles = () => ({
  skeleton: {
    margin: 10,
  },
});

export default function PageLoading() {
  const styles = useStyles();
  return (
    <>
      <Skeleton variant="rectangular" style={styles.skeleton} animation="wave" height={150} />
      <Skeleton variant="rectangular" style={styles.skeleton} animation="wave" height={150} />
      <Skeleton variant="rectangular" style={styles.skeleton} animation="wave" height={150} />
    </>
  );
}
