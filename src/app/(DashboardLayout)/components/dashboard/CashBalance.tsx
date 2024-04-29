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
  import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
  import TableContainer from "@mui/material/TableContainer";
  import BlankCard from "../shared/BlankCard";
  import { useTheme } from "@mui/material/styles";
  import { useCSVDataContext } from "@/app/(DashboardLayout)/components/shared/CSVContext";
import { start } from "repl";
import * as dayjs from 'dayjs'

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

  const isSameMonthAndYear = (dateStr1, dateStr2) => {
    const date1 = dayjs(dateStr1);
    const date2 = dayjs(dateStr2);
    return date1.isSame(date2, 'month') && date1.isSame(date2, 'year');
};    
  

  const createCashBalanceRow = (condensedData, startingCashBalance, startDate = "04/2025") => {
    // Find the index of the date in the header row
    const headerRow = condensedData[0]; // assuming the first row is your header
  
    const startIndex = headerRow.findIndex(date => {
      return isSameMonthAndYear(startDate, date);
    });  

    if (startIndex === -1) {
        console.error('Start date not found in the header');
        return [];
    }
  
    let cashBalanceRow = [];
    let runningCashBalance = startingCashBalance;
  
    // Assuming 'Net Profit' is one of the rows, find that row
    const netProfitRow = condensedData.find(row => row[0] === "Net Profit");
    if (!netProfitRow) {
        console.error('Net Profit row not found');
        return [];
    }
  
    // Calculate the cash balance from the start date forward
    for (let i = startIndex; i < netProfitRow.length; i++) {
        const netProfitValue = parseFloat(netProfitRow[i].replace(/[$,]/g, '')) || 0;
        runningCashBalance += netProfitValue;
        cashBalanceRow.push(runningCashBalance.toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2}));
    }
  
    console.log(cashBalanceRow);
    return cashBalanceRow;
  };

  const CashBalance: React.FC<{ startDate: any; title: any, projNumber: number }> = ({ startDate, title, projNumber }) => {
      
    const theme = useTheme();
    const categories = ['Contribution Profit', 'Cash Balance'];        
    const { Project1, Project2, Project3, extendedTimeGrid, condensedCSVData, startingCashBalance } = useCSVDataContext();

    
    const currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() - 25);
    const cashBalance = createCashBalanceRow(condensedCSVData, startingCashBalance, currentDate);

    const whichProject = (projNumber) => {
      if (projNumber == 1) {
        return Project1;
      } else if (projNumber == 2) {
        return Project2;
      } else {
        return Project3;
      }
    }    

    const currentProject = whichProject(projNumber);

    const calculateTotal = (index, category, cashBalance) => {

      var total = 0;
      var revTotal = extendedTimeGrid[index].revenuePercent / 100 * currentProject.revenue;
      var variableTotal = total = 100 / 36 / 100 * currentProject.variableCosts;
      var devTotal = extendedTimeGrid[index].developmentcostsPercent / 100 * currentProject.devCosts;
      var otherTotal = extendedTimeGrid[index].marketingexpensesPercent / 100 * currentProject.fixedCosts;
      var profitTotal = revTotal - variableTotal - devTotal - otherTotal;      
      console.log("Cash Balance: ");
      console.log(cashBalance);
      switch(category) {       
        case "Contribution Profit":
          total = profitTotal;
          break;
        case "Cash Balance":
          if (cashBalance.length > index) {
            const cashBalanceString = cashBalance[index];
            const cleanedString = cashBalanceString.replace(/[$,]/g, '');
            const cashBalanceNumber = parseFloat(cleanedString);          
            total = cashBalanceNumber + profitTotal;
            break;
          }
      }
  
      return total.toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
    };    

    return (
      <DashboardCard title={title}>
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
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={800}>
                    Total
                    </Typography>
                </TableCell>                                                                                                                                                               
                </TableRow>             
              </TableHead>
              <TableBody>             
              {categories.map((category) => (
                <TableRow key={category}>
                  <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white' }}>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                      {category}
                    </Typography>
                  </TableCell>
                  {Array.from({ length: 36 }, (_, i) => (
                    <TableCell
                      align="right"
                      key={i}
                      sx={{
                        backgroundColor: i === 25 ? theme.palette.warning.main : 'inherit',
                        // borderTop: i === 0 ? '1.5px solid' : 'none'
                      }}
                    >
                      <Typography variant="subtitle2">
                        {calculateTotal(i, category, cashBalance)}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}  
              </TableBody>
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    );
  };
  
  export default CashBalance;
  