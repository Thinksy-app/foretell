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
  import { useCSVDataContext } from "@/app/(DashboardLayout)/components/shared/CSVContext";
import { extend } from "lodash";
import * as dayjs from 'dayjs'

  const options = [
    "Export as CSV",
  ];

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

  const ProjectTable = ({startDate}) => {
    const theme = useTheme();
    const { Project1, extendedTimeGrid } = useCSVDataContext();
    
    // menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const isSameMonthAndYear = (dateStr1, dateStr2) => {
      const date1 = dayjs(dateStr1);
      const date2 = dayjs(dateStr2);
      return date1.isSame(date2, 'month') && date1.isSame(date2, 'year');
  };    
    
    const categories = ['Total Revenue', 'Variable Costs', 'Fixed Costs', '-- Development', '-- Other', 'Advance #1', 'Advance #2', 'Contribution Profit', 'Contribution Margin'];        

    const getAdvanceTotal = (index, advance, totalRevenue) => {
      if (index <= 25) {
        var currentDate = new Date(Project1.expectedLaunchDate);
        currentDate.setMonth(currentDate.getMonth() - 25 + index);
  
        var total = 0;
        if (advance.installmentDate1 && isSameMonthAndYear(currentDate, advance.installmentDate1)) {
          total = advance.installmentAmount1;
        } else if (advance.installmentDate2 && isSameMonthAndYear(currentDate, advance.installmentDate2)) {
          total = advance.installmentAmount2;
        } else if (advance.installmentDate3 && isSameMonthAndYear(currentDate, advance.installmentDate3)) {
          total = advance.installmentAmount3;
        } else if (advance.installmentDate4 && isSameMonthAndYear(currentDate, advance.installmentDate4)) {
          total = advance.installmentAmount4;
        }
      } else {
        var total = advance.revenueShare / 100 * totalRevenue * -1;
      }

      return total;
    }

    const calculateTotal = (index, category) => {

      var total = 0;
      switch(category) {
        case "Total Revenue":
          total = extendedTimeGrid[index].revenuePercent / 100 * Project1.revenue;
          break;
        case "Variable Costs":
          total = 100 / 36 / 100 * Project1.variableCosts * -1;
          break;
        case "Fixed Costs":
          var devCosts = extendedTimeGrid[index].developmentcostsPercent / 100 * Project1.devCosts;
          var marketingCosts = extendedTimeGrid[index].marketingexpensesPercent / 100 * Project1.fixedCosts;
          total = (devCosts + marketingCosts) * -1;
          break;
        case "-- Development":
          total = extendedTimeGrid[index].developmentcostsPercent / 100 * Project1.devCosts * -1;
          break;
        case "-- Other":
          total = extendedTimeGrid[index].marketingexpensesPercent / 100 * Project1.fixedCosts * -1;               
          break;
        case "Advance #1":
          var totalRev = extendedTimeGrid[index].revenuePercent / 100 * Project1.revenue;
          total = getAdvanceTotal(index, Project1.firstAdvance, totalRev);
          break;
        case "Advance #2":
          var totalRev = extendedTimeGrid[index].revenuePercent / 100 * Project1.revenue;
          var revenueAfterAdvance1 = totalRev - getAdvanceTotal(index, Project1.firstAdvance, totalRev);
          total = getAdvanceTotal(index, Project1.secondAdvance, revenueAfterAdvance1);
          break;          
        case "Contribution Profit":
          var revTotal = extendedTimeGrid[index].revenuePercent / 100 * Project1.revenue;
          var variableTotal = total = 100 / 36 / 100 * Project1.variableCosts;
          var devTotal = extendedTimeGrid[index].developmentcostsPercent / 100 * Project1.devCosts;
          var otherTotal = extendedTimeGrid[index].marketingexpensesPercent / 100 * Project1.fixedCosts;
          total =  (revTotal - variableTotal - devTotal - otherTotal);
          break;
        case "Contribution Margin":
          var revTotal = extendedTimeGrid[index].revenuePercent / 100 * Project1.revenue;
          var variableTotal = total = 100 / 36 / 100 * Project1.variableCosts;
          var devTotal = extendedTimeGrid[index].developmentcostsPercent / 100 * Project1.devCosts;
          var otherTotal = extendedTimeGrid[index].marketingexpensesPercent / 100 * Project1.fixedCosts;
          var contributionProfit =  (revTotal - variableTotal - devTotal - otherTotal);
          if (contributionProfit <= 0) {
            return "N/A";
          }
          return (contributionProfit / revTotal).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2});
      }

      return total.toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
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
                    {/* empty cell */}
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
  
  export default ProjectTable;
  