'use client';
import { Typography, Grid, Box, Button } from '@mui/material';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Papa from 'papaparse';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import ForecastTable from '../components/dashboard/ForecastTable';
import CSVTable from '../components/dashboard/CSVTable';

const Forecasts = () => {
  const [fileSelected, setFileSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);  
  const [csvData, setCsvData] = useState([]);
  const [tableData, setTableData] = useState<Array<Array<string>>>([]);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length === 0) {
        return;
    }

    setFileSelected(true);

    const file = files[0];

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
    const text = e.target?.result as string;
    Papa.parse(text, {
        complete: (results) => {
          setTableData(results.data as Array<Array<string>>);
        },
        header: false,
        skipEmptyLines: 'greedy'
    });
    };
    reader.readAsText(file);
};
  
  return (
    <PageContainer title="Forecasts" description="this is Sample page">
      <Grid container spacing={3}>

        <Grid item xs={12} lg={12}>
          <DashboardCard title="Forecasts"></DashboardCard>
        </Grid>

        <Grid item xs={12} lg={12}>
          <DashboardCard title="Import">
            <Box>
              <Typography>
                Please import a CSV of the client's last 12+ months of expenses.<br />Use{' '}
                <Link href="https://docs.google.com/spreadsheets/d/1sXY1UoN7c3A4HWAoKnbDUMJNyEcyix0bAt0ISWRuENQ/edit?usp=sharing" passHref>
                  this template
                </Link>
                {' '}as an example.
              </Typography>

              <Box pt={2}>
                <input
                  type="file"
                  accept=".csv"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileInputChange(e)}
                  ref={(input) => { fileInputRef.current = input; }}
                />
                <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  onClick={() => fileInputRef.current.click()}
                >
                  Import CSV of company actuals
                </Button>
              </Box>

            </Box>
          </DashboardCard>
        </Grid>          

{/* 
        <Grid item xs={12} lg={12}>
          {fileSelected && <ForecastTable/>}
        </Grid> */}

        <Grid item xs={12} lg={12}>
          {fileSelected && <CSVTable tableData={tableData}/>}
        </Grid>        



      </Grid>      

    </PageContainer>
  );
};

export default Forecasts;
