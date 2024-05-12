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

  const options = {
    chart: {
      type: 'candlestick',
      height: 500,
      width: '100%'
    },
    title: {
      text: 'Stock Price Movement',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: undefined
      },
      x: {
        show: true,
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      },
      fillSeriesColor: false,
      marker: {
        show: false,
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...series[0].data, ...generateNewData(series[0].data)];
      setSeries([{ data: newData }]);
      setIsLoading(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [series]);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={bg} alt="Logo" className={styles.logoImage} />
          <h1>My Brand</h1>
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
        <h2>Welcome to our Crypto Trading Platform</h2>
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
