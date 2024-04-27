import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Paper,
  } from "@mui/material";
  import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
  import EditableTableBody from "@/app/(DashboardLayout)/components/dashboard/EditableTableBody";
  import TableContainer from "@mui/material/TableContainer";
  import BlankCard from "../shared/BlankCard";
  import { useTheme } from "@mui/material/styles";
import { start } from "repl";


  const products = [
    {
      pname: "Revenue",
      "data": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0.4, // launch
        .3, .2, .1, 0, 0, 0, 0, 0, 0, 0,
        1.0 // total
      ]      
    },  
    {
        pname: "Development Cost",
        "data": [
            0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04,
            0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04,
            0.04, 0.04, 0.04, 0.04, 0.04,
            0.0, // launch,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1.0 // total
        ]      
      },
      {
        pname: "Marketing Expense",
        "data": [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0.4, 0.5,
            0.10, // launch
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1.0 // total            
        ]      
      },                   
  ];

  const generateTableCells = (startDate: any) => {
    const theme = useTheme();
    const cells = [];
    const currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() - 25);
    for (let i = 0; i < 36; i++) {
      cells.push(
        <TableCell align="right" style={{ backgroundColor: i == 25 ? theme.palette.warning.main : 'inherit' }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </Typography>
        </TableCell>
      );
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return cells;
  };  
  
  const TimeGrid: React.FC<{ startDate: any }> = ({ startDate }) => {    
    
    const theme = useTheme();

    return (
      <DashboardCard title="Timing Grid">
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <Table
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    {generateTableCells(startDate)}
                </TableRow>
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

              <EditableTableBody theme={theme} products={products}></EditableTableBody>
              {/* <TableBody>             

                
                {products.map((product) => (
                  <TableRow key={product.pname}>
                        <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white' }}>
                        <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                            {product.pname}
                        </Typography>
                        </TableCell>                    
                        {product.data && product.data.map((value, i) => (
                        <TableCell
                        align="right"
                        key={i}
                        style={{
                            backgroundColor: i === 25 ? theme.palette.warning.main : (i === 36 && value !== 1) ? theme.palette.error.main : 'inherit'
                        }}
                        >
                            <Typography variant="subtitle2">
                           {value.toLocaleString(undefined, { style: 'percent' })}

                            </Typography>
                        </TableCell>
                        ))}
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    );
  };
  
  export default TimeGrid;
  