import React, { createContext, useContext, useState } from 'react';
import TimeGrid from '../dashboard/TimeGrid';
import * as dayjs from 'dayjs'

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
    startingCashBalance: 0,
    setStartingCashBalance: () => {},
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
  
const condenseData = (tableData, startingCashBalance) => {
    const growthRate = 0.05; // 5% growth
    const requiredRows = [
        "Total Revenue",
        "Total COGS",
        "Gross profit",
        "Total Spending",
        "Net Profit"
    ];

    // Find the header row index: assuming date-like entries are recognizable
    const headerRow = tableData.find(row => 
        row.some(cell => cell && typeof cell === 'string' && !isNaN(Date.parse(cell)))
    );

    // Assuming the first row is the header and contains the months
    const monthColumns = headerRow ? Array.from({ length: headerRow.length - 1 }, (_, i) => headerRow[i + 1]) : [];
    const numberOfFutureMonths = 10 * 12; // 5 years into the future

    // Add future months based on the header's last month
    const lastMonth = monthColumns[monthColumns.length - 1] || '';
    let currentMonth = dayjs(lastMonth, 'M/DD/YYYY');
    for (let i = 0; i < numberOfFutureMonths; i++) {
        currentMonth = currentMonth.add(1, 'month');
        monthColumns.push(currentMonth.format('M/DD/YYYY'));
    }

    // Filter out the specific rows and include the dynamically found header
    let condensedData = tableData.filter(row => requiredRows.includes(row[0]));

    // Extend rows with projected growth for each future month
    condensedData = condensedData.map(row => {
        let lastValue = parseFloat(row[row.length - 1].replace(/[$,]/g, '')) || 0;
        const extendedRow = row.slice(); // copy current row values

        for (let i = row.length - 1; i < monthColumns.length; i++) {
            lastValue *= (1 + growthRate); // apply growth
            extendedRow.push(lastValue.toLocaleString(undefined, {style: 'currency', currency: 'USD'}));
        }

        return extendedRow;
    });

    // Extend header row with future months
    const extendedHeaderRow = [''].concat(monthColumns);

    // Calculate the cash balance row for the existing months
    let cashBalanceRow = ['Cash Balance', ''];
    let runningCashBalance = startingCashBalance;

    const netProfitRow = condensedData.find(row => row[0] === 'Net Profit');
    if (netProfitRow) {
        for (let i = 2; i < netProfitRow.length; i++) {
            const netProfitValue = parseFloat(netProfitRow[i].replace(/[$,]/g, '')) || 0;
            runningCashBalance += netProfitValue;
            cashBalanceRow.push(runningCashBalance.toLocaleString(undefined, {style: 'currency', currency: 'USD'}));
        }
    }

    // Calculate the cash balance row for the future months
    for (let i = netProfitRow.length; i < monthColumns.length; i++) {
        const futureNetProfitValue = condensedData[4][i]; // 4 corresponds to 'Net Profit' row index in requiredRows
        runningCashBalance += parseFloat(futureNetProfitValue.replace(/[$,]/g, '')) || 0;
        cashBalanceRow.push(runningCashBalance.toLocaleString(undefined, {style: 'currency', currency: 'USD'}));
    }

    // Add the extended header and cash balance row to the condensed data
    condensedData.unshift(extendedHeaderRow); // Add at the start to include header
    condensedData.push(cashBalanceRow);

    return condensedData;
};


export const CSVDataProvider = ({ children }) => {
    const [csvData, setCsvData] = useState<Array<Array<string>>>([]);
    const [condensedCSVData, setCondensedCSVData] = useState<Array<Array<string>>>([]);
    const [Project1, setProject1] = useState<Project>(defaultProject);
    const [Project2, setProject2] = useState<Project>(defaultProject);
    const [Project3, setProject3] = useState<Project>(defaultProject);
    const [extendedTimeGrid, setExtendedTimeGrid] = useState(defaultExtendedTimeGrid); 
    const [startingCashBalance, setStartingCashBalance] = useState(0); 

    const setCSVData = (data) => {
        setCsvData(data);
        setCondensedCSVData(condenseData(data, startingCashBalance));
    };

    return (
        <CSVDataContext.Provider value={{ csvData, setCSVData, condensedCSVData, setCondensedCSVData, Project1, setProject1,  Project2, setProject2,  Project3, setProject3, extendedTimeGrid, startingCashBalance, setStartingCashBalance }}>
            {children}
        </CSVDataContext.Provider>
    );
};

export const useCSVDataContext = () => useContext(CSVDataContext);