import React, { createContext, useContext, useState } from 'react';
import TimeGrid from '../dashboard/TimeGrid';

// const CSVDataContext = createContext([]);

interface Advance {
    revenueShare: number;
    recoupAmount?: number;
    installmentDate1?: string;
    installmentAmount1?: number;
    installmentDate2?: string;
    installmentAmount2?: number;
    installmentDate3?: string;
    installmentAmount3?: number;
    installmentDate4?: string;
    installmentAmount4?: number;
}

interface MonthlySpending {
    revenuePercent: number;
    developmentcostsPercent: number;
    marketingexpensesPercent: number;
}

interface TimeGrid {
    [index: number]: MonthlySpending;
}

let defaultExtendedTimeGrid: TimeGrid = {
    0: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    1: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    2: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    3: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    4: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    5: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    6: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    7: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    8: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    9: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    10: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    11: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    12: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    13: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    14: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    15: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    16: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    17: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    18: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    19: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    20: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    21: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    22: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 0 },
    23: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 40 },
    24: { revenuePercent: 0, developmentcostsPercent: 4, marketingexpensesPercent: 50 },
    25: { revenuePercent: 40, developmentcostsPercent: 0, marketingexpensesPercent: 10 },
    26: { revenuePercent: 30, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
    27: { revenuePercent: 20, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
    28: { revenuePercent: 10, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
    29: { revenuePercent: 0, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
    30: { revenuePercent: 0, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
    31: { revenuePercent: 0, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
    32: { revenuePercent: 0, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
    33: { revenuePercent: 0, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
    34: { revenuePercent: 0, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
    35: { revenuePercent: 0, developmentcostsPercent: 0, marketingexpensesPercent: 0 },
};
  
interface Project {
    revenue: number;
    variableCosts: number;
    devCosts: number;
    fixedCosts: number;    
    expectedLaunchDate: string;
    firstAdvance?: Advance;
    secondAdvance?: Advance;
}

const defaultProject = {
    revenue: 0,
    variableCosts: 0,
    devCosts: 0,
    fixedCosts: 0,
    expectedLaunchDate: "",
    firstAdvance: {revenueShare: 0},
    secondAdvance: {revenueShare: 0},
};

const CSVDataContext = createContext({
    csvData: [],
    setCSVData: () => {},
    condensedCSVData: [],
    setCondensedCSVData: () => {},
    Project1: defaultProject,    
    Project2: defaultProject,    
    Project3: defaultProject,    
    setProject1: (project: Project) => {},
    setProject2: (project: Project) => {},
    setProject3: (project: Project) => {},
    extendedTimeGrid: defaultExtendedTimeGrid
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
    const [Project2, setProject2] = useState<Project>(defaultProject);
    const [Project3, setProject3] = useState<Project>(defaultProject);
    const [extendedTimeGrid, setExtendedTimeGrid] = useState(defaultExtendedTimeGrid); 

    const setCSVData = (data) => {
        setCsvData(data);
        setCondensedCSVData(condenseData(data));
    };

    return (
        <CSVDataContext.Provider value={{ csvData, setCSVData, condensedCSVData, setCondensedCSVData, Project1, setProject1,  Project2, setProject2,  Project2, setProject2, extendedTimeGrid }}>
            {children}
        </CSVDataContext.Provider>
    );
};

export const useCSVDataContext = () => useContext(CSVDataContext);