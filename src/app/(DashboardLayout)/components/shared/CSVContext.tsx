import React, { createContext, useContext, useState } from 'react';

// const CSVDataContext = createContext([]);

const CSVDataContext = createContext({
    csvData: [],
    setCSVData: () => {},
    condensedCSVData: [],
    setCondensedCSVData: () => {},
});
  
const condenseData = (tableData) => {
    console.log("condense data");
    const requiredRows = [
        "Total Revenue",
        "Total COGS",
        "Gross profit",
        "Total Spending",
        "Net Profit"
    ];

    // Find the header row index: assuming date-like entries are recognizable
    const headerRowIndex = tableData.findIndex(row => 
        row.some((cell, index) => index > 0 && !isNaN(Date.parse(cell)))
    );

    const headerRow = headerRowIndex > -1 ? tableData[headerRowIndex] : [];

    // Filter out the specific rows and include the dynamically found header
    return [headerRow].concat(tableData.filter(row => requiredRows.includes(row[0])));
}

export const CSVDataProvider = ({ children }) => {
    const [csvData, setCsvData] = useState<Array<Array<string>>>([]);
    const [condensedCSVData, setCondensedCSVData] = useState<Array<Array<string>>>([]);

    const setCSVData = (data) => {
        setCsvData(data);
        setCondensedCSVData(condenseData(data));
    };

    return (
        <CSVDataContext.Provider value={{ csvData, setCSVData, condensedCSVData, setCondensedCSVData }}>
            {children}
        </CSVDataContext.Provider>
    );
};

export const useCSVDataContext = () => useContext(CSVDataContext);