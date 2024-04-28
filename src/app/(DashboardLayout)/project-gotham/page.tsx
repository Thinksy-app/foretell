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
import { useCSVDataContext } from "@/app/(DashboardLayout)/components/shared/CSVContext";

interface Inputs {
    revenue?: any; // Use 'any' if you don't know the type of 'revenue', or specify a more precise type
    // Add other properties as needed
}

interface CashBalanceProps {
    startDate: string;
    inputs: Inputs;
}
   
   
const AdvanceSection = ({ inputs, handleInputChange, selectedDate, setSelectedDate }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            fullWidth
            label="Revenue Share %"
            value={inputs.advanceRevenue1 || ''}
            sx={{ marginBottom: '10px' }}
            onChange={(e) => handleInputChange(e, 'advanceRevenue1')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
            <CurrencyFormat
                customInput={TextField}
                label="Recoup Amount"
                sx={{ marginBottom: '10px' }}
                value={inputs.advanceAmount1 || ''}
                onChange={(e) => handleInputChange(e, 'advanceAmount1')}
                thousandSeparator={true}
                prefix="$"
                decimalScale={2}
                allowNegative={false}
                displayType="input"
                fullWidth
            />
        </Grid>        
      </Grid>

      {Array.from({ length: 4 }, (_, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12} sm={6} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker1
                label={`Installment ${index + 1}: Date`}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                renderInput={(params: any) => <TextField {...params} />}
                sx={{ marginBottom: '10px' }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <CurrencyFormat
              customInput={TextField}
              label={`Installment ${index + 1}: Amount`}
              value={inputs[`advanceAmount${index + 1}`] || ''}
              onChange={(e) => handleInputChange(e, `advanceAmount${index + 1}`)}
              thousandSeparator={true}
              prefix="$"
              decimalScale={2}
              allowNegative={false}
              displayType="input"
              fullWidth
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

   
const SamplePage = () => {
  const [inputs, setInputs] = useState({});
  const [valuesCal1, setCal1] = useState([])
  const [valuesCal2, setCal2] = useState([])
  const [valuesCal3, setCal3] = useState([])
  const [valuesCal4, setCal4] = useState([])
  const [showProjectTable, setShowProjectTable] = useState(false);


  const handleInputChangePrev = (e: any, inputName: any) => {
    setInputs({ ...inputs, [inputName]: e.target.value });
  };

    
    const { Project1, setProject1 } = useCSVDataContext();  // Import and use your context

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof typeof Project1) => {
        const value = event.target.value;
        setProject1(prev => ({
            ...prev,
            [field]: field.includes('Cost') || field === 'revenue' ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value
        }));
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
   
    // Format the numbers as strings with commas for thousands separator
    const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   
    // Update Project1 in context
    setProject1({
        ...Project1,
        expectedLaunchDate: dayjs().add(Math.floor(Math.random() * 5), 'year'),
        revenue,
        devCosts,
        variableCosts: varCosts,
        fixedCosts,
        advances: [
        { name: 'Advance 1', amount: advanceAmount1, date: dayjs().add(Math.floor(Math.random() * 5), 'year') },
        { name: 'Advance 2', amount: advanceAmount2, date: dayjs().add(Math.floor(Math.random() * 5), 'year') },
        // If additional advances or details needed, modify or add here
        ]
    });
   
    setShowProjectTable(true);
   };   

  const [selectedDate, setSelectedDate] = useState(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return ( 

    <PageContainer title="Project 1: Projections" description="Enter Your Projections:">

        <Grid container spacing={3}>

            <Grid item xs={12} lg={12}>
                <DashboardCard title="Project 1"></DashboardCard>
            </Grid>     

            <Grid item xs={12} lg={12}>           
                <DashboardCard title="Projections">                    
                    <Grid container spacing={3}>

                     <Grid item xs={12} lg={4}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ padding: '14px' }}>General:</Typography>
                            </Grid>                            
                            <Stack
                            direction={{ xs: "column", sm: "column" }}
                            spacing={1}
                            mt={1}
                            // alignItems="center"
                        >

                                <CurrencyFormat
                                    label="Revenue"
                                    customInput={TextField}
                                    value={Project1.revenue || ''}
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
                                    value={Project1.variableCosts || ''}
                                    onChange={(e: any) => handleInputChange(e, 'variableCosts')}
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
                                    value={Project1.devCosts || ''}
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
                                    value={Project1.fixedCosts || ''}
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
                                        onChange={(date) => handleInputChange(e, 'expectedLaunchDate')}
                                        renderInput={(params: any) => <TextField {...params} />}
                                        sx={{ marginBottom: '10px' }}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            </Grid>
                        
                        <Grid item xs={12} lg={4}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ padding: '14px' }}>Advance #1:</Typography>
                            </Grid>                            
                            
                            <AdvanceSection
                                inputs={inputs}
                                handleInputChange={handleInputChange}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            />
                            
                        </Grid>    
                        <Grid item xs={12} lg={4}>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ padding: '14px' }}>Advance #2:</Typography>
                            </Grid>                                                        
                            
                            <AdvanceSection
                                inputs={inputs}
                                handleInputChange={handleInputChange}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            />
                            
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

export default SamplePage;
