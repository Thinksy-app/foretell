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

    return [tableData[0]].concat(tableData.filter(row => requiredRows.includes(row[0])));
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