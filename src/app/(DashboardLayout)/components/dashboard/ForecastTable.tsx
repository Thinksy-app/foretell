import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
  import { useTheme } from "@mui/material/styles";
  
  const ForecastTable = () => {  
    
    const theme = useTheme();

    return (
      <DashboardCard title="Company Forecast">
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <Table
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white'}}>
                    <Typography variant="subtitle2" fontWeight={600}>
                        Month
                        </Typography>
                </TableCell>
                {Array.from({ length: 36 }, (_, index) => index - 25).map(num => (
                    <TableCell align="right" style={{ backgroundColor: num == 0 ? theme.palette.warning.main : 'inherit' }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                        {num === 0 ? '🚀🚀🚀' : num}
                        </Typography>
                    </TableCell>
                ))}

                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={800}>
                    Total
                    </Typography>
                </TableCell>                                                                                                                                                               
                </TableRow>             
              </TableHead>
              <TableBody>             
              </TableBody>
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    );
  };
  
  export default ForecastTable;
  