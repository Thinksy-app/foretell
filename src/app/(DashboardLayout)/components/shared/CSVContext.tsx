import React, { createContext, useContext, useState } from 'react';
import TimeGrid from '../dashboard/TimeGrid';

// const CSVDataContext = createContext([]);

interface Advance {
    amount: number;
    date: string;
    revenueShare: number;
    recoupAmount: number;
    installmentDate1: string;
    installmentAmount1: number;
    installmentDate2: string;
    installmentAmount2: number;
    installmentDate3: string;
    installmentAmount3: number;
    installmentDate4: string;
    installmentAmount4: number;
}
  
interface Project {
    revenue: number;
    variableCosts: number;
    devCosts: number;
    fixedCosts: number;    
    expectedLaunchDate: string;
    // firstAdvance: Advance;
    // secondAdvance: Advance;
}

const defaultProject = {
    revenue: 0,
    variableCosts: 0,
    devCosts: 0,
    fixedCosts: 0,
    expectedLaunchDate: ""
};

const CSVDataContext = createContext({
    csvData: [],
    setCSVData: () => {},
    condensedCSVData: [],
    setCondensedCSVData: () => {},
    Project1: defaultProject,    
    setProject1: () => {}
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
    const [Project1, setProject1] = useState<Project>(defaultProject);

    const setCSVData = (data) => {
        setCsvData(data);
        setCondensedCSVData(condenseData(data));
    };

    return (
        <CSVDataContext.Provider value={{ csvData, setCSVData, condensedCSVData, setCondensedCSVData, Project1, setProject1 }}>
            {children}
        </CSVDataContext.Provider>
    );
};

export const useCSVDataContext = () => useContext(CSVDataContext);