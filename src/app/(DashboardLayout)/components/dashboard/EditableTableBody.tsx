import React, { useState } from 'react';
import { TableBody, TableRow, TableCell, TextField, Typography } from '@mui/material';

const EditableTableBody = ({ theme, products }) => {
  // Using useState to manage the editable data
  const [editableData, setEditableData] = useState(products);

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

  return (
    <TableBody>
      {editableData.map((product, rowIndex) => (
        <TableRow key={product.pname}>
          <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white' }}>
            <Typography color="textSecondary" variant="subtitle2" fontWeight={600}>
              {product.pname}
            </Typography>
          </TableCell>
          {product.data.map((value, cellIndex) => (
            <TableCell
              align="right"
              key={cellIndex}
              style={{
                backgroundColor: cellIndex === 24 ? theme.palette.warning.main : (cellIndex === 36 && value !== 1) ? theme.palette.error.main : 'inherit'
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                value={value}
                onChange={(e) => handleInputChange(e.target.value, rowIndex, cellIndex + 1)}
                InputProps={{
                  inputProps: {
                    style: { textAlign: 'right' }
                  }
                }}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default EditableTableBody;
