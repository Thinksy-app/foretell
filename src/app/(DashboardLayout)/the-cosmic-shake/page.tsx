'use client';
import React, { useState, useRef } from 'react';
import { Typography, Button, Box, TextField, Grid, Stack } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as DatePicker1 } from '@mui/x-date-pickers/DatePicker';
import TempTable from '@/app/(DashboardLayout)/components/dashboard/TempTable';
import ProjectTable from '../components/dashboard/ProjectTable';
import CashBalance from '../components/dashboard/CashBalance';
import TimeGrid from '../components/dashboard/TimeGrid';
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import * as dayjs from 'dayjs'
import CurrencyFormat from 'react-currency-format';

interface Inputs {
    revenue?: any; // Use 'any' if you don't know the type of 'revenue', or specify a more precise type
    // Add other properties as needed
}

interface CashBalanceProps {
    startDate: string;
    inputs: Inputs;
   }
   
const TheCosmicShake = () => {
  const [inputs, setInputs] = useState({});
  const [valuesCal1, setCal1] = useState([])
  const [valuesCal2, setCal2] = useState([])
  const [valuesCal3, setCal3] = useState([])
  const [valuesCal4, setCal4] = useState([])
  const [showProjectTable, setShowProjectTable] = useState(false);


  const handleInputChange = (e: any, inputName: any) => {
    setInputs({ ...inputs, [inputName]: e.target.value });
  };

  const handleSubmit = () => {
    // Handle form submission here
    setShowProjectTable(true);
    console.log('Form submitted:', inputs);
  };

  const handleRandomize = () => {
    // Set a random date 5 years from now
    setSelectedDate(dayjs().add(Math.floor(Math.random() * 5), 'year'));
   
    // Generate random numbers for each input
    const revenue = Math.floor(Math.random() * 100000000); // Random number between 0 and 100,000,000
    const varCosts = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000
    const devCosts = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000
    const fixedCosts = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000
    const advanceAmount1 = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000
    const advanceRevenue1 = Math.floor(Math.random() * 10); // Random number between 0 and 10
    const advanceAmount2 = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000
    const advanceRevenue2 = Math.floor(Math.random() * 10); // Random number between 0 and 10    
    const advanceAmount3 = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000
    const advanceRevenue3 = Math.floor(Math.random() * 10); // Random number between 0 and 10        
    const advanceAmount4 = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000
    const advanceRevenue4 = Math.floor(Math.random() * 10); // Random number between 0 and 10            
   
    // Format the numbers as strings with commas for thousands separator
    const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   
    setInputs(prevInputs => ({
       ...prevInputs,
       'revenue': `$${formatNumber(revenue)}`,
       'varCosts': `$${formatNumber(varCosts)}`,
       'devCosts': `$${formatNumber(devCosts)}`,
       'fixedCosts': `$${formatNumber(fixedCosts)}`,
       'advanceAmount1': `$${formatNumber(advanceAmount1)}`,
       'advanceRevenue1': advanceRevenue1.toString(),
       'advanceAmount2': `$${formatNumber(advanceAmount2)}`,
       'advanceRevenue2': advanceRevenue2.toString(),      
       'advanceAmount3': `$${formatNumber(advanceAmount3)}`,
       'advanceRevenue3': advanceRevenue3.toString(),       
       'advanceAmount4': `$${formatNumber(advanceAmount4)}`,
       'advanceRevenue4': advanceRevenue4.toString(),              
    }));
   
    setShowProjectTable(true);
   };
   

  const [selectedDate, setSelectedDate] = useState(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return ( 

    <PageContainer title="Project 1" description="Enter Your Projections:">

        <Grid container spacing={3}>

        <Grid item xs={12} lg={12}>
                <DashboardCard title="Project: The Cosmic Shake"></DashboardCard>
        </Grid>     



        <Grid item xs={12} lg={12}>           
            <DashboardCard title="Projections">
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <Stack
                        direction={{ xs: "column", sm: "column" }}
                        spacing={1}
                        mt={1}
                        // alignItems="center"
                    >
                        
                        {/* <input
                                type="file"
                                accept=".csv"
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileInputChange(e)}
                                ref={(input) => { fileInputRef.current = input; }}
                            /> */}
                            {/* <Button
                                variant="contained"
                                disableElevation
                                size="small"
                                color="primary"
                                onClick={() => fileInputRef.current.click()}
                            >
                                Import Timing Grid CSV
                            </Button>             */}

                            <CurrencyFormat
                                label="Revenue"
                                customInput={TextField}
                                value={inputs.revenue || ''}
                                onChange={(e: any) => handleInputChange(e, 'revenue')}
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                allowNegative={false}
                                displayType="input"
                                sx={{ marginBottom: '10px', marginTop: '10px' }}
                            />
                            
                            <CurrencyFormat
                                customInput={TextField}
                                label="Variable Costs"
                                value={inputs.varCosts || ''}
                                onChange={(e: any) => handleInputChange(e, 'varCosts')}
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                allowNegative={false}
                                displayType="input"
                                sx={{ marginBottom: '10px', marginTop: '10px' }}
                            />         

                            <CurrencyFormat
                                customInput={TextField}
                                label="Development Cost"
                                value={inputs.devCosts || ''}
                                onChange={(e: any) => handleInputChange(e, 'devCosts')}
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                allowNegative={false}
                                displayType="input"
                                sx={{ marginBottom: '10px', marginTop: '10px' }}
                            />                                                        

                            <CurrencyFormat
                                customInput={TextField}
                                label="Fixed Costs"
                                value={inputs.fixedCosts || ''}
                                onChange={(e: any) => handleInputChange(e, 'fixedCosts')}
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                allowNegative={false}
                                displayType="input"
                                sx={{ marginBottom: '10px', marginTop: '10px' }}
                            />                                                                              


                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker1
                                    label="Expected Launch"
                                    value={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    renderInput={(params: any) => <TextField {...params} />}
                                    sx={{ marginBottom: '10px' }}
                                />
                            </LocalizationProvider>
                        </Stack>
                        
                    </Grid>           



                    <Grid item xs={12} lg={6}>
                        <Typography variant="h6" sx={{ padding: '14px' }}>Advances:</Typography>       

                        <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        mt={1}
                        // alignItems="center"
                        >
                            <CurrencyFormat
                                customInput={TextField}
                                label="Amount"
                                value={inputs.advanceAmount1 || ''}
                                onChange={(e) => handleInputChange(e, 'advanceAmount1')}
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                allowNegative={false}
                                displayType="input"
                                sx={{ marginBottom: '10px', marginTop: '10px' }}
                            />

                            <TextField
                                label="Revenue Share %"
                                value={inputs.advanceRevenue1 || ''}
                                onChange={(e) => handleInputChange(e, 'advanceRevenue1')}
                                sx={{ marginBottom: '10px' }}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    multiple
                                    value={valuesCal1}
                                    onChange={setCal1}
                                    // value={inputs.advanceCalendarDates1}
                                    // onChange={(e) => handleInputChangeCalendar(e, 'advanceCalendarDates1')}
                                    placeholder='Installments'
                                    style={{ padding: '25px', fontFamily: 'inherit', fontSize: 'inherit' }}
                                    plugins={[
                                        <DatePanel sort="date" />,
                                    ]}   
                                />
                            </LocalizationProvider>               
                        </Stack>

                        <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        mt={1}
                        // alignItems="center"
                        >
                            <CurrencyFormat
                                customInput={TextField}
                                label="Amount"
                                value={inputs.advanceAmount2 || ''}
                                onChange={(e) => handleInputChange(e, 'advanceAmount2')}
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                allowNegative={false}
                                displayType="input"
                                sx={{ marginBottom: '10px', marginTop: '10px' }}
                            />                            

                            <TextField
                                label="Revenue Share %"
                                value={inputs.advanceRevenue2 || ''}
                                onChange={(e) => handleInputChange(e, 'advanceRevenue2')}
                                sx={{ marginBottom: '10px' }}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    multiple
                                    value={valuesCal2}
                                    onChange={setCal2}
                                    placeholder='Installments'
                                    style={{ padding: '25px', fontFamily: 'inherit', fontSize: 'inherit' }}
                                    plugins={[
                                        <DatePanel sort="date" />,
                                    ]}   
                                />
                            </LocalizationProvider>               
                        </Stack>

                        <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        mt={1}
                        // alignItems="center"
                        >
                            <CurrencyFormat
                                customInput={TextField}
                                label="Amount"
                                value={inputs.advanceAmount3 || ''}
                                onChange={(e) => handleInputChange(e, 'advanceAmount3')}
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                allowNegative={false}
                                displayType="input"
                                sx={{ marginBottom: '10px', marginTop: '10px' }}
                            /> 
                            
                            <TextField
                                label="Revenue Share %"
                                value={inputs.advanceRevenue3 || ''}
                                onChange={(e) => handleInputChange(e, 'advanceRevenue3')}
                                sx={{ marginBottom: '10px' }}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                    multiple
                                    value={valuesCal3}
                                    onChange={setCal3}
                                    placeholder='Installments'
                                    style={{ padding: '25px', fontFamily: 'inherit', fontSize: 'inherit' }}
                                    plugins={[
                                        <DatePanel sort="date" />,
                                    ]}                                    
                                />
                            </LocalizationProvider>               
                        </Stack>

                        <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        mt={1}
                        // alignItems="center"
                        >
                            <CurrencyFormat
                                customInput={TextField}
                                label="Amount"
                                value={inputs.advanceAmount4 || ''}
                                onChange={(e) => handleInputChange(e, 'advanceAmount4')}
                                thousandSeparator={true}
                                prefix="$"
                                decimalScale={2}
                                allowNegative={false}
                                displayType="input"
                                sx={{ marginBottom: '10px', marginTop: '10px' }}
                            /> 

                            <TextField
                                label="Revenue Share %"
                                value={inputs.advanceRevenue4 || ''}
                                onChange={(e) => handleInputChange(e, 'advanceRevenue4')}
                                sx={{ marginBottom: '10px', marginTop: '10px' }}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    multiple
                                    value={valuesCal4}
                                    onChange={setCal4}
                                    placeholder='Installments'
                                    style={{ padding: '25px', fontFamily: 'inherit', fontSize: 'inherit' }}
                                    plugins={[
                                        <DatePanel sort="date" />,
                                    ]}   
                                />
                            </LocalizationProvider>               
                        </Stack>                                
                        
                    </Grid>                  


                    <Grid item xs={12} lg={12}>
                        <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
                            Calculate
                        </Button>     
                        <Button style={{ marginLeft: '10px'}} size="large" variant="contained" color="error" onClick={handleRandomize}>
                            Randomize 🎲
                        </Button>                             
                    </Grid>                    

                </Grid>
            </DashboardCard>
        </Grid>



        <Grid item xs={12} lg={12}>
            {showProjectTable && <TimeGrid key={Date.now()} startDate={selectedDate}/>}
        </Grid>


        <Grid item xs={12} lg={12}>
            {showProjectTable && <ProjectTable inputs={inputs} calVals={[valuesCal1, valuesCal2, valuesCal3, valuesCal4]} startDate={selectedDate} key={Date.now()}/>}
        </Grid>

        <Grid item xs={12} lg={12}>
            {showProjectTable && <CashBalance startDate={selectedDate} inputs={inputs} key={Date.now()}/>}
        </Grid>        


        </Grid> 
    </PageContainer>
  );
};

export default TheCosmicShake;
