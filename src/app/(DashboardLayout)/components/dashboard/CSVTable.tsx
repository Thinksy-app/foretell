// components/CSVTable.tsx
import React, { useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const CSVTable = ({tableData}) => {    
//   const [tableData, setTableData] = useState<Array<Array<string>>>([]);

//   const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//     // const files = event.target.files;
//     console.log('howdy')

//     const reader = new FileReader();
//     reader.onload = (e: ProgressEvent<FileReader>) => {
//     const text = e.target?.result as string;
//     Papa.parse(text, {
//         complete: (results) => {
//         setTableData(results.data as Array<Array<string>>);
//         },
//         header: false
//     });
//     };
//     reader.readAsText(file);
    
//   }, []);

  return (
    <DashboardCard>
      {tableData.length > 0 && (
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableData[0].map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(1).map((row, index) => (
              <TableRow key={index}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DashboardCard>
  );
};

export default CSVTable;
