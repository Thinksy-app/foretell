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
      pname: "Total Revenue",
      "data": [
        1453273.91, 336851.19, 252544.31, 1487378.98, 395672.86, 268975.07,
        391372.30, 359060.63, 273609.19, 592058.58, 291618.32, 176447.66,
        285163.48, 9670593.20
      ]      
    },
    {
      pname: "Total COGS",
      "data": [
        142531.36, 86138.96, 81764.53, 154115.71, 89861.66, 69757.71,
        155233.02, 85562.32, 59599.18, 57125.59, 108838.11, 16112.14,
        81539.29, 2420862.00
      ]      
    },
    {
      pname: "Gross Profit",
      "data": [
        1310742.55, 250712.23, 170779.78, 1333263.27, 305811.20, 199217.36,
        236139.28, 273498.31, 214010.01, 534932.99, 182780.21, 160335.52,
        203624.19, 7249731.20
      ]      
    },
    {
      pname: "Gross Margin %",
      "data": [
        0.90, 0.74, 0.68, 0.90, 0.77, 0.74, 0.60, 0.76, 0.78, 0.90, 0.63, 0.91
      ]      
    },
    {
        pname: "Total Spending",
        data:[
            979828.18, 927006.11, 1069774.85, 1233090.93, 1687662.71, 2365406.84,
            313602.70, 498478.16, 2019536.67, 1390914.14, 1699215.63, 1305677.27,
            1410180.97, 22567055.67
          ]            
      },
      {
        pname: "Net Profit (Net Income)",
        "data": [
            330914.37, -676293.88, -898995.07, 100172.34, -1381851.51, -2166189.48,
            -77463.42, -224979.85, -1805526.66, -855981.15, -1516435.42, -1145341.75,
            -1206556.78, -15317324.47
          ]                     
      },      
      {
        pname: "Net Margin %",
        "data": [
            0.23, NaN, NaN, 0.07, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN
          ]          
      },      
      {
        pname: "Ending Cash Balance",
        "data": [
          1310742.55, 250712.23, 170779.78, 1333263.27, 305811.20, 199217.36,
          236139.28, 273498.31, 214010.01, 534932.99, 182780.21, 160335.52,
          203624.19, 7249731.20
          ]          
      },            
  ];
  
  const TempTable = () => {
      
    const theme = useTheme();

    return (
      <DashboardCard title="Fuchigaming Studios - Profit & Losses (USD)">
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
                <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    9/30/2021
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    10/31/2021
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    11/30/2021
                    </Typography>
                </TableCell>                  
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    12/31/2021
                    </Typography>
                </TableCell>                                    
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    1/31/2022
                    </Typography>
                </TableCell>                                                      
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    2/28/2022
                    </Typography>
                </TableCell>                                                                        
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    3/31/2022
                    </Typography>
                </TableCell>    
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    4/30/2022
                    </Typography>
                </TableCell>    
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    5/31/2022
                    </Typography>
                </TableCell>    
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    6/30/2022
                    </Typography>
                </TableCell>    
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    7/31/2022
                    </Typography>
                </TableCell>    
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    8/31/2022
                    </Typography>
                </TableCell>    
                <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                    9/30/2022
                    </Typography>
                </TableCell> 
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
                    {/* <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {product.name}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {product.post}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell> */}
                        <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white' }}>
                        <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                            {product.pname}
                        </Typography>
                        </TableCell>

                    {/* <TableCell>
                      <Chip
                        sx={{
                          px: "4px",
                          backgroundColor: product.pbg,
                          color: "#fff",
                        }}
                        size="small"
                        label={product.priority}
                      ></Chip>
                    </TableCell> */}
                        {product.data && product.data.map((value, i) => (
                        <TableCell align="right" key={i} style={{ backgroundColor: value < 0 ? theme.palette.error.main : 'inherit' }}>
                            <Typography variant="h6">
                            {product.pname === "Gross Margin %" || product.pname === "Net Margin %" ?
                                value.toLocaleString(undefined, { style: 'percent' }) : 
                                `$${value.toLocaleString()}`
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
  
  export default TempTable;
  