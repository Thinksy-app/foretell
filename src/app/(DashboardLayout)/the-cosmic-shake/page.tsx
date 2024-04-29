'use client';
import React, { useState, useRef } from 'react';
import { Typography, Button, Box, TextField, Grid, Stack } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TempTable from '@/app/(DashboardLayout)/components/dashboard/TempTable';
import ProjectTable from '../components/dashboard/ProjectTable';
import CashBalance from '../components/dashboard/CashBalance';
import TimeGrid from '../components/dashboard/TimeGrid';
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import * as dayjs from 'dayjs'
import CurrencyFormat from 'react-currency-format';
import { useCSVDataContext } from "@/app/(DashboardLayout)/components/shared/CSVContext";

const InstallmentInputs = ({ Project2, setProject2, advanceKey }) => {
    const handleDateChange = (date, installmentIndex) => {
      setProject2(prev => ({
        ...prev,
        [advanceKey]: {
          ...prev[advanceKey],
          [`installmentDate${installmentIndex + 1}`]: date
        }
      }));
    };
  
    const handleAmountChange = (value, installmentIndex) => {
      setProject2(prev => ({
        ...prev,
        [advanceKey]: {
          ...prev[advanceKey],
          [`installmentAmount${installmentIndex + 1}`]: parseFloat(value.replace(/[^0-9.-]+/g, ""))
        }
      }));
    };
  
    return (
      <>
        {Array.from({ length: 4 }, (_, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} sm={6} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={`Installment ${index + 1}: Date`}
                  value={Project2[advanceKey][`installmentDate${index + 1}`]}
                  onChange={(date) => handleDateChange(date, index)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ marginBottom: '10px' }}
                />
              </LocalizationProvider>
            </Grid>
  
            <Grid item xs={12} sm={6} md={6}>
              <CurrencyFormat
                customInput={TextField}
                label={`Installment ${index + 1}: Amount`}
                value={Project2[advanceKey][`installmentAmount${index + 1}`] || ''}
                onChange={(e) => handleAmountChange(e.target.value, index)}
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
   
const AdvanceSection = ({ advanceIndex, inputs, handleInputChange, selectedDate, setSelectedDate }) => {
    const { Project2, setProject2 } = useCSVDataContext();
    const advanceKey = advanceIndex === 1 ? 'firstAdvance' : 'secondAdvance';

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
                <TextField
                fullWidth
                label="Revenue Share %"
                value={Project2[advanceKey].revenueShare || ''}
                sx={{ marginBottom: '10px' }}
                onChange={(e) => handleInputChange(advanceIndex, 'revenueShare', e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <CurrencyFormat
                    customInput={TextField}
                    label="Recoup Amount"
                    sx={{ marginBottom: '10px' }}
                    value={Project2[advanceKey].recoupAmount || ''}
                    // onChange={(e) => handleInputChange(advanceIndex, 'recoupAmount', e.target.value)}
                    onValueChange={(values) => {
                        const { value } = values; // extract value from values object
                        handleInputChange(advanceIndex, 'recoupAmount', value); // pass the raw value to the handler
                      }}                    
                    thousandSeparator={true}
                    prefix="$"
                    decimalScale={2}
                    allowNegative={false}
                    displayType="input"
                    fullWidth
                />
            </Grid>        
        </Grid>

        <InstallmentInputs
            Project2={Project2}
            setProject2={setProject2}
            advanceKey={advanceKey}
        />
        </>
    );
};
   
const Project2Page = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [inputs, setInputs] = useState({});
    const [valuesCal1, setCal1] = useState([])
    const [valuesCal2, setCal2] = useState([])
    const [valuesCal3, setCal3] = useState([])
    const [valuesCal4, setCal4] = useState([])
    const [showProjectTable, setShowProjectTable] = useState(false);
    const { Project2, setProject2 } = useCSVDataContext();  // Import and use your context

    const handleInputChange = (value, field) => {
        setProject2(prev => {
          // Determine if the value is an event object (from an input field)
          const finalValue = value?.target ? value.target.value : value;
    
          // Convert input value if necessary, handle date as a special case
          const updatedValue = field === 'expectedLaunchDate' ? value : parseFloat(finalValue.replace(/[^0-9.-]+/g, ""));
    
          return {
            ...prev,
            [field]: updatedValue
          };
        });
    };

    const handleAdvanceChange = (advanceIndex: number, field: keyof Advance, value: any) => {
        setProject2(prev => {

            console.log("handle advance change");

            if (advanceIndex == 1) {
                var currentAdvance = prev.firstAdvance;
                var fieldName = 'firstAdvance';
            } else {
                var currentAdvance = prev.secondAdvance;
                var fieldName = 'secondAdvance';
            }

            console.log(prev[fieldName]);            
            
    

            const updatedAdvance = {
                ...currentAdvance,
                [field]: field.includes('Date') ? value : parseFloat(value)
            };

            console.log(updatedAdvance);
    
            // Return the updated Project2 object
            return { ...prev, [fieldName]: updatedAdvance };
        });
    };
    

    const handleSubmit = () => {
        // Handle form submission here
        setShowProjectTable(true);
    };

    const handleRandomize = () => {
        // Generate random numbers for each input
        const expectedLaunchDate = dayjs().add(3 + Math.floor(Math.random() * 4), 'year');
        const revenue = Math.floor(Math.random() * 100000000); // Random number between 0 and 100,000,000
        const varCosts = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000
        const devCosts = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000
        const fixedCosts = Math.floor(Math.random() * 10000000); // Random number between 0 and 10,000,000


        // Function to generate random installment data
        const randomInstallment = () => ({
            date: dayjs().add(Math.floor(Math.random() * 5), 'year'),
            amount: Math.floor(Math.random() * 1000000)
        });

        const firstAdvance = {
            revenueShare: Math.floor(Math.random() * 10) + 1,
            recoupAmount: Math.floor(Math.random() * 1000000),
            installmentDate1: randomInstallment().date,
            installmentAmount1: randomInstallment().amount,
            installmentDate2: randomInstallment().date,
            installmentAmount2: randomInstallment().amount,
            installmentDate3: randomInstallment().date,
            installmentAmount3: randomInstallment().amount,
            installmentDate4: randomInstallment().date,
            installmentAmount4: randomInstallment().amount
        };
    
        const secondAdvance = {
            revenueShare: Math.floor(Math.random() * 10) + 1,
            recoupAmount: Math.floor(Math.random() * 1000000),
            installmentDate1: randomInstallment().date,
            installmentAmount1: randomInstallment().amount,
            installmentDate2: randomInstallment().date,
            installmentAmount2: randomInstallment().amount,
            installmentDate3: randomInstallment().date,
            installmentAmount3: randomInstallment().amount,
            installmentDate4: randomInstallment().date,
            installmentAmount4: randomInstallment().amount
        };        
                
        // Update Project2 in context
        setProject2({
            ...Project2,
            expectedLaunchDate,
            revenue,
            devCosts,
            variableCosts: varCosts,
            fixedCosts,
            firstAdvance,
            secondAdvance
        });

        setShowProjectTable(true);
    };   

  return ( 
    <PageContainer title="Project 2: Projections" description="Enter Your Projections:">

        <Grid container spacing={3}>

            {/* Title */}
            <Grid item xs={12} lg={12}>
                <DashboardCard title="Project 2"></DashboardCard>
            </Grid>     

            {/* User Input */}
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
                            >
                                <CurrencyFormat
                                    label="Revenue"
                                    customInput={TextField}
                                    value={Project2.revenue || ''}
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
                                    value={Project2.variableCosts || ''}
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
                                    value={Project2.devCosts || ''}
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
                                    value={Project2.fixedCosts || ''}
                                    onChange={(e: any) => handleInputChange(e, 'fixedCosts')}
                                    thousandSeparator={true}
                                    prefix="$"
                                    decimalScale={2}
                                    allowNegative={false}
                                    displayType="input"
                                    sx={{ marginBottom: '10px', marginTop: '10px' }}
                                />                                                                              


                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Expected Launch"
                                        value={Project2.expectedLaunchDate ? dayjs(Project2.expectedLaunchDate) : null}
                                        onChange={(newDate) => handleInputChange(newDate, 'expectedLaunchDate')}
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
                                advanceIndex={1}
                                handleInputChange={handleAdvanceChange}
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
                                advanceIndex={2}
                                handleInputChange={handleAdvanceChange}
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

            {/* Time Grid */}
            <Grid item xs={12} lg={12}>
                {showProjectTable && <TimeGrid key={Date.now()} startDate={Project2.expectedLaunchDate}/>}
            </Grid>

            {/* Project Forecasts */}
            <Grid item xs={12} lg={12}>
                {showProjectTable && <ProjectTable projNumber={2} startDate={Project2.expectedLaunchDate} key={Date.now()}/>}
            </Grid>

            {/* Cash Balance */}
            <Grid item xs={12} lg={12}>
                {showProjectTable && <CashBalance projNumber={2} startDate={Project2.expectedLaunchDate} title="Company Cash Balance w/ Project 2" key={Date.now()}/>}
            </Grid>
        </Grid> 
    </PageContainer>
  );
};

export default Project2Page;
