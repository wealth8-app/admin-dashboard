/* eslint-disable react/prop-types */
import { Typography, Box, Stack, TextField, InputAdornment } from '@mui/material';

export function ReportItem({ title, prefix, suffix, ...rest }) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          border: '1px solid rgba(145, 158, 171, 0.24)',
          width: '100%',
          padding: '10px',
          borderRadius: '4px 0px 0px 4px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography>{title}</Typography>
      </Box>

      <Box
        sx={{
          border: '1px solid rgba(145, 158, 171, 0.24)',
          width: '100%',
          display: 'flex',
          padding: '6px 10px',
          borderRadius: '0px 4px 4px 0px',
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          InputProps={{
            startAdornment: prefix ? (
              <InputAdornment position="end" sx={{ marginRight: 1 }}>
                <Typography sx={{ color: 'black', fontWeight: '600' }}>{prefix}</Typography>
              </InputAdornment>
            ) : null,
            endAdornment: suffix ? (
              <InputAdornment position="end" sx={{ marginLeft: 1 }}>
                <Typography sx={{ color: 'black', fontWeight: '600' }}>{suffix}</Typography>
              </InputAdornment>
            ) : null,
          }}
          {...rest}
        />
      </Box>
    </Stack>
  );
}
