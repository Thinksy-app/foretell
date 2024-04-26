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


  const products = [
    {
      pname: "Contribution Profit",
      "data": [
        0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 
        0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 
        0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 
        0.0277, // launch,
        0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 
        1.0 // total
      ]      
    },     
    {
      pname: "Cash Balance",
      "data": [
        1453273.91, 336851.19, 252544.31, 1487378.98, 395672.86, 268975.07,
        391372.30, 359060.63, 273609.19, 592058.58, 291618.32, 176447.66,
        285163.48, 9670593.20, 1453273.91, 336851.19, 252544.31, 1487378.98, 395672.86, 268975.07,
        391372.30, 359060.63, 273609.19, 592058.58, 291618.32, 176447.66,
        285163.48, 9670593.20, 273609.19, 592058.58, 291618.32, 176447.66,
        285163.48, 9670593.20, 273609.19, 592058.58, 176447.66
      ]      
    },          
  ];

    const products2 = [
    {
      pname: "Total Revenue",
      border: true,
      total: 35000000, // 35,000,000
      "data": [
          0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
          0.4, // launch
          .3, .2, .1, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total
      ]      
    },
    {
        pname: "Variable Costs",
        border: true,
        total: 5000000, // 5,000,000
        "data": [
          0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 
          0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 
          0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 
          0.0277, // launch,
          0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 0.0277, 
          1.0 // total
        ]      
    },   
      {
        pname: "Fixed Costs",
        border: true,
        total: 4000000, // 4,000,000
        "data": [
          0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02,
          0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02,
          0.02, 0.02, 0.02, 0.44, 0.27,
          0.5, // launch,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total
        ]      
    },      

    {
      pname: "-- Development",
      border: false,
      total: 2000000, // 2,000,000
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
      pname: "-- Other",
      border: false,
      total: 2000000, // 2,000,000
      "data": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0.4, 0.5,
        0.10, // launch
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1.0 // total   
      ]      
    },    
      {
        pname: "Advance #1",
        border: true,
        "data": [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0.4, 0.5,
          0.10, // launch
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total   
        ]          
      },
      {
        pname: "Advance #2",
        border: false,
        data:[
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0.4, 0.5,
          0.10, // launch
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total   
          ]            
      },
      {
        pname: "Advance #3",
        border: false,
        data:[
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0.4, 0.5,
          0.10, // launch
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total   
          ]            
      },
      {
        pname: "Advance #4",
        border: false,
        data:[
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0.4, 0.5,
          0.10, // launch
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total   
          ]            
      },            
      {
        pname: "Contribution Profit",
        border: true,
        data:[
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0.4, 0.5,
          0.10, // launch
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total   
          ]            
      },
      {
        pname: "Contribution Margin",
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
  
  const getCategoryTotal  = (category: any, inputs: any) => {
    switch(category) {
      case "Total Revenue":
        return parseInt((inputs.revenue ?? '').replace(/[$,]/g, ""), 0);
      case "Variable Costs":
        return parseInt((inputs.varCosts ?? '').replace(/[$,]/g, ""), 0);
      case "Fixed Costs":
          return parseInt((inputs.devCosts ?? '').replace(/[$,]/g, ""), 0) + parseInt((inputs.fixedCosts ?? '').replace(/[$,]/g, ""), 0);
      case "-- Development":
        return parseInt((inputs.devCosts ?? '').replace(/[$,]/g, ""), 0);
      case "-- Other":
        return parseInt((inputs.fixedCosts ?? '').replace(/[$,]/g, ""), 0);
      case "Advance #1":
        return parseInt((inputs.advanceAmount1 ?? '').replace(/[$,]/g, ""), 0);          
      case "Advance #2":
        return parseInt((inputs.advanceAmount2 ?? '').replace(/[$,]/g, ""), 0);                    
      case "Advance #3":
        return parseInt((inputs.advanceAmount3 ?? '').replace(/[$,]/g, ""), 0);                              
      case "Advance #4":
        return parseInt((inputs.advanceAmount4 ?? '').replace(/[$,]/g, ""), 0);                                        
      default:
          return 0;
    }
};   

  const calculateContributionProfit = (index: any, inputs: any) => {
    var revTotal = getCategoryTotal("Total Revenue", inputs) * products2[0]['data'][index];
    var variableTotal = getCategoryTotal("Variable Costs", inputs) * products2[1]['data'][index];
    var devTotal = getCategoryTotal("-- Development", inputs) * products2[3]['data'][index];
    var otherTotal = getCategoryTotal("-- Other", inputs) * products2[4]['data'][index];      
    var adv1Total = getCategoryTotal("Advance #1", inputs) * products2[5]['data'][index];      
    var adv2Total = getCategoryTotal("Advance #2", inputs) * products2[6]['data'][index];      
    var adv3Total = getCategoryTotal("Advance #3", inputs) * products2[7]['data'][index];      
    var adv4Total = getCategoryTotal("Advance #4", inputs) * products2[8]['data'][index];      
    return (revTotal - variableTotal - devTotal - otherTotal).toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
  };

  const calculateContributionProfitNum = (index: any, inputs: any) => {
    var revTotal = getCategoryTotal("Total Revenue", inputs) * products2[0]['data'][index];
    var variableTotal = getCategoryTotal("Variable Costs", inputs) * products2[1]['data'][index];
    var devTotal = getCategoryTotal("-- Development", inputs) * products2[3]['data'][index];
    var otherTotal = getCategoryTotal("-- Other", inputs) * products2[4]['data'][index];      
    var adv1Total = getCategoryTotal("Advance #1", inputs) * products2[5]['data'][index];      
    var adv2Total = getCategoryTotal("Advance #2", inputs) * products2[6]['data'][index];      
    var adv3Total = getCategoryTotal("Advance #3", inputs) * products2[7]['data'][index];      
    var adv4Total = getCategoryTotal("Advance #4", inputs) * products2[8]['data'][index];      
    return (revTotal - variableTotal - devTotal - otherTotal);
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
                            backgroundColor: calculateBackgroundColor(i, product.pname, inputs, theme)
                          }}
                        >
                            <Typography variant="subtitle2">
                            {product.pname == "Contribution Profit" ?
                                calculateContributionProfit(i, inputs) : 
                                calculateNetBalance(i, inputs)
                            }

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
  