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
import { result } from "lodash";

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
    console.log("date 1: " + date1);
    const date2 = dayjs(dateStr2);
    console.log("date 2: " + date2);
    return date1.isSame(date2, 'month') && date1.isSame(date2, 'year');
};    
  

  const createCashBalanceRow = (startingCashBalance, startDate) => {
    const { condensedCSVData } = useCSVDataContext();
    // Find the index of the date in the header row
    console.log("Condensed Data: ");
    console.log(condensedCSVData);
    const headerRow = condensedCSVData[0]; // assuming the first row is your header
  
    console.log("start date: " + startDate);
    console.log(headerRow);
    const startIndex = headerRow.findIndex(date => {
      return isSameMonthAndYear(startDate, date);
    });  

    if (startIndex === -1) {
        console.log('Start date not found in the header');
        console.error('Start date not found in the header');
        return [];
    }
  
    let resultRow = [];
  
    // Assuming 'Net Profit' is one of the rows, find that row
    const cashBalanceRow = condensedCSVData.find(row => row[0] === "Cash Balance");
    if (!cashBalanceRow) {
        console.error('Cash balance not found');
        return [];
    }
  
    // Calculate the cash balance from the start date forward
    for (let i = startIndex; i < cashBalanceRow.length; i++) {
        const cashBalanceValue = parseFloat(cashBalanceRow[i].replace(/[$,]/g, '')) || 0;
        resultRow.push(cashBalanceValue.toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2}));
    }
  
    console.log("resultRow");
    console.log(resultRow);

    return resultRow;
  };

  const CashBalance: React.FC<{ startDate: any; title: any, projNumber: number }> = ({ startDate, title, projNumber }) => {
      
    const theme = useTheme();
    const categories = ['Contribution Profit', 'Cash Balance'];        
    const { Project1, Project2, Project3, extendedTimeGrid, condensedCSVData, startingCashBalance } = useCSVDataContext();


    
    const currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() - 25);
    console.log("init start date: " + currentDate);
    const cashBalance = createCashBalanceRow(startingCashBalance, currentDate);

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

    const calculateBackground = (theme, index, category, cashBalance) => {
      if (index === 25) {
        return theme.palette.warning.main;
      } 

      if (category == 'Cash Balance') {
        var total = calculateTotalNum(index, category, cashBalance);
        return total < 0 ? theme.palette.error.main : 'inherit';
      } else {
        return 'inherit'
      }
    }

    const calculateTotalNum = (index, category, cashBalance) => {
      const { Project1, Project2, Project3, extendedTimeGrid, condensedCSVData, startingCashBalance } = useCSVDataContext();
      var total = 0;
      var revTotal = extendedTimeGrid[index].revenuePercent / 100 * currentProject.revenue;
      var variableTotal = 100 / 36 / 100 * currentProject.variableCosts; // Please double-check this formula as it seems to be incorrect or based on a specific assumption
      var devTotal = extendedTimeGrid[index].developmentcostsPercent / 100 * currentProject.devCosts;
      var otherTotal = extendedTimeGrid[index].marketingexpensesPercent / 100 * currentProject.fixedCosts;
      var profitTotal = revTotal - variableTotal - devTotal - otherTotal;      
  
      switch (category) {
          case "Contribution Profit":
              total = profitTotal;
              break;
          case "Cash Balance":
              console.log("Cash balance at caluclation:" + cashBalance.length);

              if (cashBalance.length > index) {
                  // Initialize the cumulative cash balance from the previous month or starting balance
                  const previousCashBalance = index > 0 
                      ? parseFloat(cashBalance[index - 1].replace(/[$,]/g, '')) 
                      : 0; // Consider starting cash balance if it's the first month
  
                  total = previousCashBalance + profitTotal; // Add this month's profit to the previous cash balance
  
                  // If it's the first month and cashBalance array is not started with initial balance
                  if (index === 0) {
                      total += parseFloat(cashBalance[0].replace(/[$,]/g, ''));
                  }
  
                  // Format the updated cash balance and save back to the cash balance array
                  cashBalance[index] = total.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
              }
              break;
      }
  
      return total
  };       

    const calculateTotal = (index, category, cashBalance) => {
      return calculateTotalNum(index, category, cashBalance).toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
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
                        backgroundColor: calculateBackground(theme, i, category, cashBalance),
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
  