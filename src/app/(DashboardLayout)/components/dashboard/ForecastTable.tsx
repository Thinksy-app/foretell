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

// import React, { useRef, useState } from 'react';
// import { Box, Button, Table, TableBody, TableCell, TableRow, Typography, useTheme } from '@mui/material';
// import Papa from 'papaparse';

// const ImportCSVComponent: React.FC = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [data, setData] = useState<any[]>([]);
//   const theme = useTheme();

//   const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files && files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e: ProgressEvent<FileReader>) => {
//         const csvData = e.target?.result as string;
//         parseCSV(csvData);
//       };
//       reader.readAsText(files[0]);
//     }
//   };

//   const parseCSV = (csvData: string) => {
//     Papa.parse(csvData, {
//       complete: (results) => {
//         setData(results.data);
//       },
//       header: true,
//       dynamicTyping: true,
//       skipEmptyLines: true,
//       error: (error) => {
//         console.error('Error parsing CSV:', error);
//       }
//     });
//   };

//   return (
//     <Box pt={2}>
//       <input
//         type="file"
//         accept=".csv"
//         style={{ display: 'none' }}
//         onChange={handleFileInputChange}
//         ref={fileInputRef}
//       />
//       <Button
//         variant="contained"
//         disableElevation
//         color="primary"
//         onClick={() => fileInputRef.current?.click()}
//       >
//         Import CSV of company actuals
//       </Button>

//       {data.length > 0 && (
//         <Table stickyHeader>
//           <TableBody>
//             {data.map((row, index) => (
//               <TableRow key={index}>
//                 {Object.entries(row).map(([key, value], i) => (
//                   <TableCell
//                     key={key}
//                     align="right"
//                     sx={{
//                       position: i === 0 ? 'sticky' : undefined,
//                       left: 0,
//                       zIndex: 2,
//                       backgroundColor: i === 0 ? 'white' : undefined
//                     }}
//                     style={{
//                       backgroundColor: i === 25 ? theme.palette.warning.main : (i === 36 && value !== 1) ? theme.palette.error.main : 'inherit'
//                     }}
//                   >
//                     <Typography variant="subtitle2">
//                       {typeof value === 'number' ? value.toLocaleString() : value}
//                     </Typography>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </Box>
//   );
// };

// export default ImportCSVComponent;

  
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
  