import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';
import styles from "./Home.module.css";
import { CircularProgress } from '@mui/material';

import bg from "./bg.png";
import LoggedInUsers from "../LoggedInUsers/LoggedInUsers"
import { useAuth } from '../Context/AuthContext';

function Home(props) {
  
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading state for demonstration
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulated loading delay
  }, []);

  if (!currentUser) {
    return (
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <img
              src={logoImage}
              style={{ width: "90px", height: "50px" }}
              alt="Logo"
            />
          </div>
          <div className={styles.navLinks}>
            <Link to="/login" className={`${styles.link} ${styles.neonEffect}`}>
              Login
            </Link>
            <Link
              to="/signup"
              className={`${styles.link} ${styles.neonEffect}`}
            >
              Signup
            </Link>
          </div>
        </div>
        <h1 className={styles.heading}>
          Trade Crypto Perpetual Futures in INR
        </h1>
        <p className={styles.subheading}>
          India's First Native Crypto Derivatives Platform with Lightning-Fast
          Settlement in Rupees
        </p>
        <p className={`${styles.message} ${styles.neonEffect}`}>
          Please login to view real-time updates.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={bg} style={{ width: "90px", height: "50px" }} />
        </div>
        <div className={styles.navLinks}>
          {currentUser ? (
            <Link to="/logout" className={`${styles.link} ${styles.neonEffect}`}>Logout</Link>
          ) : (
            <>
              <Link to="/login" className={`${styles.link} ${styles.neonEffect}`} style={{ marginRight: '20px' }}>Login</Link>
              <Link to="/signup" className={`${styles.link} ${styles.neonEffect}`}>Signup</Link>
            </>
          )}
        </div>
      </div>
     
      <h1 className={`${styles.heading} `}>Real-time pricing: Get live updates on crypto prices from our platform.</h1>
      <p className={`${styles.message} ${styles.neonEffect}`}>{currentUser ? `Welcome back, ${currentUser?.displayName}!` : "Please login to view real-time updates."}</p>
      {currentUser ? (
        isLoading?(<div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
        <p>Loading data...</p>
      </div>):(<LoggedInUsers/>)

):(<div>
  <ApexCharts options={options} series={series} type="candlestick" height={410} width={500}/>
</div>)}
    </div>
  );
}

function generateInitialData() {
  const data = [];
  let time = new Date(); // Start from today
  time.setHours(0, 0, 0, 0); // Normalize the time part to start of day

  for (let i = 0; i < 60; i++) { // Change from 10 to 30 for one month data
    data.push({
      x: new Date(time),
      y: [
        Math.floor(Math.random() * 100) + 50, // Open
        Math.floor(Math.random() * 100) + 60, // High
        Math.floor(Math.random() * 100) + 40, // Low
        Math.floor(Math.random() * 100) + 55  // Close
      ]
    });
    time.setDate(time.getDate() - 1); // Move back one day
  }
  return data.reverse(); // Reverse to start the oldest to the newest
}

function generateNewData(data) {
  const lastData = data[data.length - 1];
  const newTime = new Date(lastData.x).getTime() + 86400000; // plus one day
  return [{
    x: new Date(newTime),
    y: [
      Math.floor(Math.random() * 100) + 50, 
      Math.floor(Math.random() * 100) + 60, 
      Math.floor(Math.random() * 100) + 40, 
      Math.floor(Math.random() * 100) + 55
    ]
  }];
}

export default Home;
