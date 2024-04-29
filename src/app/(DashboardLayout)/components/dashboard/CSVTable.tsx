// components/CSVTable.tsx
import React, { useState, useCallback } from 'react';
import { Table, TableBody,Paper, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const CSVTable = ({tableData}) => {    
  return (
    <DashboardCard title="Company Forecasts">
      {tableData.length > 0 && (
        <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
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
        </TableContainer>
      )}
    </DashboardCard>
  );
};

export default CSVTable;
