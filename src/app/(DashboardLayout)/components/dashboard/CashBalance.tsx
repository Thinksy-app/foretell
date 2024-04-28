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

  const calculateContributionProfit = (index: any, inputs: any) => {
    var revTotal = getCategoryTotal("Total Revenue", inputs) * products2[0]['data'][index];
    var variableTotal = getCategoryTotal("Variable Costs", inputs) * products2[1]['data'][index];
    var devTotal = getCategoryTotal("-- Development", inputs) * products2[3]['data'][index];
    var otherTotal = getCategoryTotal("-- Other", inputs) * products2[4]['data'][index];      
    var adv1Total = inputs.advanceAmount1 ? getAdvanceTotal("Advance #1", index, revTotal, inputs) : 0;
    var adv2Total = inputs.advanceAmount2 ? getAdvanceTotal("Advance #2", index, revTotal, inputs) : 0;
    var adv3Total = inputs.advanceAmount3 ? getAdvanceTotal("Advance #3", index, revTotal, inputs) : 0;
    var adv4Total = inputs.advanceAmount4 ? getAdvanceTotal("Advance #4", index, revTotal, inputs) : 0;
    var allAdvTotal = adv1Total + adv2Total + adv3Total + adv4Total;
    return (revTotal - variableTotal - devTotal - otherTotal + allAdvTotal).toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});    
  };

  const calculateContributionProfitNum = (index: any, inputs: any) => {
    var revTotal = getCategoryTotal("Total Revenue", inputs) * products2[0]['data'][index];
    var variableTotal = getCategoryTotal("Variable Costs", inputs) * products2[1]['data'][index];
    var devTotal = getCategoryTotal("-- Development", inputs) * products2[3]['data'][index];
    var otherTotal = getCategoryTotal("-- Other", inputs) * products2[4]['data'][index];      
    var adv1Total = inputs.advanceAmount1 ? getAdvanceTotal("Advance #1", index, revTotal, inputs) : 0;
    var adv2Total = inputs.advanceAmount2 ? getAdvanceTotal("Advance #2", index, revTotal, inputs) : 0;
    var adv3Total = inputs.advanceAmount3 ? getAdvanceTotal("Advance #3", index, revTotal, inputs) : 0;
    var adv4Total = inputs.advanceAmount4 ? getAdvanceTotal("Advance #4", index, revTotal, inputs) : 0;
    var allAdvTotal = adv1Total + adv2Total + adv3Total + adv4Total;    
    return (revTotal - variableTotal - devTotal - otherTotal + allAdvTotal);
  };  

  const calculateNetBalanceNum = (index: any, inputs: any) => {
    var contribution = calculateContributionProfitNum(index, inputs)
    var balance = products[1]['data'][index]
    var total = balance + contribution;

    return total;
  }

  const calculateNetBalance = (index:any, inputs:any) => {
    var contribution = calculateContributionProfitNum(index, inputs)
    var balance = products[1]['data'][index]
    var total = balance + contribution;

    return total.toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
  }

  const calculateBackgroundColor = (index:any, product:any, inputs:any, theme:any) => {
    // backgroundColor: i === 25 ? theme.palette.warning.main : (i === 36 && value !== 1) ? theme.palette.error.main : 'inherit'
    if (index === 25) {
      return theme.palette.warning.main;
    }

    if (product == 'Cash Balance') {
      var balance = calculateNetBalanceNum(index, inputs);
      if (balance < 0) {
        return theme.palette.error.main;
      }
    }


    return 'inherit'
  } 
  
  const CashBalance: React.FC<{ startDate: any; inputs: any }> = ({ startDate, inputs }) => {
      
    const theme = useTheme();
    const categories = ['Contribution Profit', 'Cash Balance'];        
    const { Project1, extendedTimeGrid } = useCSVDataContext();

    const calculateTotal = (index, category) => {

      var total = 0;
      switch(category) {       
        case "Contribution Profit":
          var revTotal = extendedTimeGrid[index].revenuePercent / 100 * Project1.revenue;
          var variableTotal = total = 100 / 36 / 100 * Project1.variableCosts;
          var devTotal = extendedTimeGrid[index].developmentcostsPercent / 100 * Project1.devCosts;
          var otherTotal = extendedTimeGrid[index].marketingexpensesPercent / 100 * Project1.fixedCosts;
          total =  (revTotal - variableTotal - devTotal - otherTotal);
          break;
        case "Cash Balance":
          total = 0;
      }
  
      return total.toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
    };    

    return (
      <DashboardCard title="Fuchigaming Studios - Cash Balance">
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
                        {calculateTotal(i, category)}
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
  