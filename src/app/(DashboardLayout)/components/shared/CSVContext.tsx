import React, { createContext, useContext, useState } from 'react';

// const CSVDataContext = createContext([]);

const CSVDataContext = createContext({
    csvData: [],
    setCSVData: () => {}
});
  

export const CSVDataProvider = ({ children }) => {
    const [csvData, setCsvData] = useState<Array<Array<string>>>([]);

    const setCSVData = (data) => {
        setCsvData(data);
    };

    return (
        <CSVDataContext.Provider value={{ csvData, setCSVData }}>
            {children}
        </CSVDataContext.Provider>
    );
};

export const useCSVDataContext = () => useContext(CSVDataContext);
