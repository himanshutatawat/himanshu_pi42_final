import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';
import { CircularProgress } from '@mui/material';
import bg from "./bg.png";
import LoggedInUsers from "../LoggedInUsers/LoggedInUsers";
import { useAuth } from '../Context/AuthContext';
import styles from "./Home.module.css";

function Home(props) {
  const [series, setSeries] = useState([{ data: generateInitialData() }]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={bg} alt="Logo" className={styles.logoImage} />
          <h1>PI 42</h1>
        </div>
        <div className={styles.navLinks}>
          {currentUser ? (
            <Link to="/logout" className={styles.link}>Logout</Link>
          ) : (
            <>
              <Link to="/login" className={styles.link}>Login</Link>
              <Link to="/signup" className={styles.link}>Signup</Link>
            </>
          )}
        </div>
      </div>
      <div className={styles.content}>
        
      <h2>Welcome to Pi42!</h2>
      <p>
        Pi42 is your go-to platform for trading crypto contracts. With real-time updates on crypto prices and a user-friendly interface, we make it easy for you to stay ahead in the crypto market.
      </p>
      <h3>Why Choose Pi42?</h3>
      <ul>
        <li>Real-time pricing: Get live updates on crypto prices from our platform.</li>
        <li>Secure authentication: We prioritize the security of your account with Firebase authentication.</li>
        <li>User-friendly interface: Our platform is designed to be intuitive and easy to use for both beginners and experienced traders.</li>
        <li>Share your trades: Easily share details of your crypto contracts with friends and colleagues.</li>
      </ul>
      <p>
        Ready to start trading? Login or sign up now to get started!
      </p>
    
        <p>{currentUser ? `Welcome back, ${currentUser?.displayName}!` : "Please login to view real-time updates."}</p>
        {currentUser ? (
          isLoading ? (
            <div className={styles.loading}>
              <CircularProgress />
              <p>Loading data...</p>
            </div>
          ) : (
            <LoggedInUsers />
          )
        ) : (
          <div className={styles.chart}>
            <ApexCharts options={options} series={series} type="candlestick" height={410} width={500} />
          </div>
        )}
      </div>
    </div>
  );
}

function generateInitialData() {
  const data = [];
  let time = new Date();
  time.setHours(0, 0, 0, 0);

  for (let i = 0; i < 60; i++) {
    data.push({
      x: new Date(time),
      y: [
        Math.floor(Math.random() * 100) + 50,
        Math.floor(Math.random() * 100) + 60,
        Math.floor(Math.random() * 100) + 40,
        Math.floor(Math.random() * 100) + 55
      ]
    });
    time.setDate(time.getDate() - 1);
  }
  return data.reverse();
}

function generateNewData(data) {
  const lastData = data[data.length - 1];
  const newTime = new Date(lastData.x).getTime() + 86400000;
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
