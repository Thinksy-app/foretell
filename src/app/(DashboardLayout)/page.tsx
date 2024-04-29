'use client'
import { Grid, Box, Typography, IconButton, Badge, Link, Button} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
// components
import ProfitExpenses from '@/app/(DashboardLayout)/components/dashboard/ProfitExpenses';
import TempTable from '@/app/(DashboardLayout)/components/dashboard/TempTable';
import TrafficDistribution from '@/app/(DashboardLayout)/components/dashboard/TrafficDistribution';
import UpcomingSchedules from '@/app/(DashboardLayout)/components/dashboard/UpcomingSchedules';
import TopPayingClients from '@/app/(DashboardLayout)/components/dashboard/TopPayingClients';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import ProductSales from '@/app/(DashboardLayout)/components/dashboard/ProductSales';
import { IconQuestionMark, IconMenu } from "@tabler/icons-react";
import React, { useRef } from 'react';
import CSVTable from '@/app/(DashboardLayout)/components/dashboard/CSVTable';
import CashBalance from '@/app/(DashboardLayout)/components/dashboard/CashBalance';
import { useCSVDataContext } from "@/app/(DashboardLayout)/components/shared/CSVContext";

import { useState } from 'react';

const Dashboard = () => {
  const [fileSelected, setFileSelected] = useState(false);
  const { csvData, condensedCSVData, Project1, Project2, Project3 } = useCSVDataContext();
    
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>

          <Grid item xs={12} lg={12}>
            <DashboardCard title="Dashboard"></DashboardCard>
          </Grid>              
          <Grid item xs={12} lg={12}>
          </Grid>


          {!condensedCSVData || condensedCSVData.length === 0 && 
            <Grid item xs={12} lg={6}>
              <DashboardCard title="No forecasts :(">
                <Box>
                  <Typography>
                    Please import your forecasts in the{' '}
                    <Link href="/forecasts" passHref>
                      forecasts tab
                    </Link>  in order to generate your pro-forma models
                  </Typography>
                </Box>
              </DashboardCard>
            </Grid>          
          }

          {Project1.expectedLaunchDate == '' && 
            <Grid item xs={12} lg={6}>
              <DashboardCard title="No projects :(">
                <Box>
                  <Typography>
                    Please create at least {' '}
                    <Link href="/project-gotham" passHref>
                      one project
                    </Link>  in the projects tab in order to generate your pro-forma models
                  </Typography>
                </Box>
              </DashboardCard>
            </Grid>          
          }

          <Grid item xs={12} lg={12}>
            {Project1.expectedLaunchDate && <CashBalance projNumber={1} title="Project 1: Cash Balance" startDate={Project1.expectedLaunchDate} />}
          </Grid>

          <Grid item xs={12} lg={12}>
            {Project2.expectedLaunchDate && <CashBalance projNumber={2} title="Project 2: Cash Balance" startDate={Project2.expectedLaunchDate} />}
          </Grid>          
          
          <Grid item xs={12} lg={12}>
            {condensedCSVData && condensedCSVData.length > 0 && <CSVTable tableData={condensedCSVData} />}
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>

            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* <UpcomingSchedules /> */}
          </Grid>
          <Grid item xs={12} lg={8}>
            {/* <TopPayingClients /> */}
          </Grid>
          <Grid item xs={12}>
            {/* <Blog /> */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
