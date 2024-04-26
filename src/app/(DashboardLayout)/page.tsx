'use client'
import { Grid, Box, IconButton, Badge, Button} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
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

import { useState } from 'react';
// import axios from 'axios';

// function ChatGPTComponent({ apiKey }) {
//   const [input, setInput] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   const handleSubmit = async () => {
//     const userQuery = input;
//     setInput(''); // clear the input after sending
//     try {
//       const res = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
//         prompt: userQuery,
//         max_tokens: 150,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         }
//       });
//       const newEntry = { user: userQuery, response: res.data.choices[0].text.trim() };
//       setChatHistory([...chatHistory, newEntry]);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={input} onChange={handleInputChange} />
//       <button onClick={handleSubmit}>Send</button>
//       <div>
//         {chatHistory.map((entry, index) => (
//           <p key={index}><b>You:</b> {entry.user}<br /><b>GPT:</b> {entry.response}</p>
//         ))}
//       </div>
//     </div>
//   );
// }


const Dashboard = () => {
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileInputChange = (e) => {
    setTimeout(() => {
      setFileSelected(true);
    }, 1000); // Adjust delay time as needed
  };
    
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >

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
                Import QuickBooks CSV
              </Button>
            </Box>
         
          </Grid>
          <Grid item xs={12} lg={12}>
            {/* <ProfitExpenses /> */}
            {fileSelected && <TempTable />}
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
