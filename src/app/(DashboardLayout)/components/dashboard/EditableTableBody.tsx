import React, { useState } from 'react';
import { TableBody, TableRow, TableCell, TextField, Typography } from '@mui/material';
import { useCSVDataContext } from "@/app/(DashboardLayout)/components/shared/CSVContext";

const EditableTableBody = ({ theme, products }) => {
  // Using useState to manage the editable data
  const [editableData, setEditableData] = useState(products);
  const { extendedTimeGrid } = useCSVDataContext();

  const handleInputChange = (value, rowIndex, cellIndex) => {
    const updatedData = editableData.map((product, index) => {
      if (index === rowIndex) {
        const updatedProductData = [...product.data];
        updatedProductData[cellIndex - 1] = value; // Adjust for shifted index due to pname
        return { ...product, data: updatedProductData };
      }
      return product;
    });
    setEditableData(updatedData);
  };
  const categories = ['Revenue', 'Development Costs', 'Marketing Expenses'];

  return (
    <TableBody>
      {categories.map((category, rowIndex) => {
        // Calculate the total for the category across all months
        const total = Object.values(extendedTimeGrid).reduce((acc, spending) => {
          const categoryKey = category.toLowerCase().replace(/ /g, '') + 'Percent';
          return acc + (spending[categoryKey] || 0);
        }, 0);

        return (
          <TableRow key={category}>
            <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white' }}>
              <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
                {category} (%)
              </Typography>
            </TableCell>
            {Object.entries(extendedTimeGrid).map(([month, spending], cellIndex) => (
              <TableCell
                align="right"
                key={cellIndex}
                style={{
                  backgroundColor: cellIndex === 25 ? theme.palette.warning.main : 
                  (cellIndex === 36 && spending[category.toLowerCase().replace(/ /g, '') + 'Percent'] !== 1) ? theme.palette.error.main : 'inherit'
                }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  value={spending[category.toLowerCase().replace(/ /g, '') + 'Percent'] || ''}
                  onChange={(e) => handleInputChange(e.target.value, category, month)}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'right' }
                    }
                  }}
                />
              </TableCell>
            ))}
            {/* Additional TableCell for total with conditional formatting */}
            <TableCell align="right" style={{ backgroundColor: total === 100 ? 'inherit' : theme.palette.error.main }}>
              <Typography variant="subtitle1">{`${total.toFixed(2)}%`}</Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default EditableTableBody;
