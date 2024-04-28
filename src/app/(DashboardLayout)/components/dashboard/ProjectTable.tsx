import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Menu,
    MenuItem,
    Chip,
    IconButton,
    Paper,
  } from "@mui/material";
  import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
  import TableContainer from "@mui/material/TableContainer";
  import BlankCard from "../shared/BlankCard";
  import { useTheme } from "@mui/material/styles";
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  import React from "react";

  const options = [
    "Export as CSV",
  ];

  const products = [
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
          1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
          0, // launch
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total   
        ]          
      },
      {
        pname: "Advance #2",
        border: false,
        data:[
          1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
          0, // launch
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total   
          ]            
      },
      {
        pname: "Advance #3",
        border: false,
        data:[
          1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
          0, // launch
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1.0 // total   
          ]            
      },
      {
        pname: "Advance #4",
        border: false,
        data:[
          1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
          0, // launch
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


  const getCategoryTotal  = (category, inputs) => {
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

  const calculateTotal  = (index, value, product, inputs, calVals) => {
    var revTotal = getCategoryTotal("Total Revenue", inputs) * products[0]['data'][index];

    if (product == "Fixed Costs") {
      var devTotal = getCategoryTotal("-- Development", inputs) * products[3]['data'][index];
      var otherTotal = getCategoryTotal("-- Other", inputs) * products[4]['data'][index];
      return (devTotal + otherTotal).toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    if (product == "Advance #1" || product == "Advance #2" || product == "Advance #3"  || product == "Advance #4" ) {
      return getAdvanceTotal(product, index, revTotal, inputs).toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    if (product == "Contribution Margin") {
      var revTotal = getCategoryTotal("Total Revenue", inputs) * products[0]['data'][index];
      if (revTotal === 0) {
        return 'N/A'
      }
      var variableTotal = getCategoryTotal("Variable Costs", inputs) * products[1]['data'][index];
      var devTotal = getCategoryTotal("-- Development", inputs) * products[3]['data'][index];
      var otherTotal = getCategoryTotal("-- Other", inputs) * products[4]['data'][index];   
      var adv1Total = inputs.advanceAmount1 ? getAdvanceTotal("Advance #1", index, revTotal, inputs) : 0;
      var adv2Total = inputs.advanceAmount2 ? getAdvanceTotal("Advance #2", index, revTotal, inputs) : 0;
      var adv3Total = inputs.advanceAmount3 ? getAdvanceTotal("Advance #3", index, revTotal, inputs) : 0;
      var adv4Total = inputs.advanceAmount4 ? getAdvanceTotal("Advance #4", index, revTotal, inputs) : 0;
      var allAdvTotal = adv1Total + adv2Total + adv3Total + adv4Total;
      var contributionProfit = revTotal - variableTotal - devTotal - otherTotal + allAdvTotal;
      
      return (contributionProfit / revTotal).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2});
      
    }
 
    if (product == "Contribution Profit") {
      var revTotal = getCategoryTotal("Total Revenue", inputs) * products[0]['data'][index];
      var variableTotal = getCategoryTotal("Variable Costs", inputs) * products[1]['data'][index];
      var devTotal = getCategoryTotal("-- Development", inputs) * products[3]['data'][index];
      var otherTotal = getCategoryTotal("-- Other", inputs) * products[4]['data'][index];      
      var adv1Total = inputs.advanceAmount1 ? getAdvanceTotal("Advance #1", index, revTotal, inputs) : 0;
      var adv2Total = inputs.advanceAmount2 ? getAdvanceTotal("Advance #2", index, revTotal, inputs) : 0;
      var adv3Total = inputs.advanceAmount3 ? getAdvanceTotal("Advance #3", index, revTotal, inputs) : 0;
      var adv4Total = inputs.advanceAmount4 ? getAdvanceTotal("Advance #4", index, revTotal, inputs) : 0;
      var allAdvTotal = adv1Total + adv2Total + adv3Total + adv4Total;
      return (revTotal - variableTotal - devTotal - otherTotal + allAdvTotal).toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    return (value * getCategoryTotal(product, inputs)).toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
  };     

  const getAdvanceTotal = (product, index, revTotal, inputs) => {
    var revenue = 0;
    var multiplier = 0;
    var advanceTotal = 0;
    console.log(product);
    console.log(inputs);
    switch(product) {
      case "Advance #1":
        advanceTotal = parseInt((inputs.advanceAmount1 ?? '').replace(/[$,]/g, ""), 0);
        revenue = parseInt(inputs.advanceRevenue1);
        multiplier = products[5]['data'][index];
        break;
      case "Advance #2":
        revenue = parseInt(inputs.advanceRevenue2);
        advanceTotal = parseInt((inputs.advanceAmount2 ?? '').replace(/[$,]/g, ""), 0);
        multiplier = products[6]['data'][index];
        break;
      case "Advance #3":
        advanceTotal = parseInt((inputs.advanceAmount3 ?? '').replace(/[$,]/g, ""), 0);
        revenue = parseInt(inputs.advanceRevenue3);
        multiplier = products[7]['data'][index];
        break;
      case "Advance #4":        
      advanceTotal = parseInt((inputs.advanceAmount4 ?? '').replace(/[$,]/g, ""), 0);
        revenue = parseInt(inputs.advanceRevenue4);
        multiplier = products[8]['data'][index];
        break;
    }

    if (advanceTotal == 0) {
      return 0;
    }

    console.log(advanceTotal);
    console.log(multiplier);
    if (index >= 25 && revTotal != 0 && revenue) {
      return (revTotal * revenue / 100 * -1);
    }

    return multiplier * advanceTotal;
  }
  

  const generateTableCells = (startDate) => {
    const theme = useTheme();
    const cells = [];
    const currentDate = new Date(startDate);

    currentDate.setMonth(currentDate.getMonth() - 25);
    for (let i = 0; i < 36; i++) {
      cells.push(
        <TableCell align="right" style={{ backgroundColor: i === 25 ? theme.palette.warning.main : 'inherit' }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </Typography>
        </TableCell>
      );
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return cells;
  };    

  const shouldShowRow = (product, inputs) => {
    switch(product) {
      case "Advance #1":
        return inputs.advanceAmount1;
      case "Advance #2":
        return inputs.advanceAmount2;
      case "Advance #3":
        return inputs.advanceAmount3;
      case "Advance #4":        
        return inputs.advanceAmount4;
      default:
        return true;
    }
  };
  
  const ProjectTable = ({startDate, inputs, calVals}) => {
    const theme = useTheme();
    // menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };    


    return (
      <DashboardCard
        title="Project 1 - Profit & Losses"
        action={
          <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      }     
        >
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <Table
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    </Typography>
                </TableCell>
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

                  shouldShowRow(product.pname, inputs) ? (
                       
                  <TableRow key={product.pname}>
                        <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white', borderTop: product.border ? '1.5px solid' : 'none' }}>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                              {product.pname}
                          </Typography>
                        </TableCell>

                        {product.data && product.data.map((value, i) => (
                        <TableCell 
                          align="right" 
                          key={i} 
                          sx={{
                            borderTop: product.border ? '1.5px solid' : 'none',
                            backgroundColor: i === 25 ? theme.palette.warning.main : 'inherit' 
                          }}
                       >
                            <Typography variant="subtitle2">
                              {calculateTotal(i, value, product.pname, inputs, calVals)}
                            </Typography>
                        </TableCell>
                        ))};
                  </TableRow>) : null
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    );
  };
  
  export default ProjectTable;
  