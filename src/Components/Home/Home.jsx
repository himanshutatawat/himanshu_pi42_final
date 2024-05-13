import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';
import styles from "./Home.module.css";
import { CircularProgress } from '@mui/material';

import bg from "./bg.png";
import LoggedInUsers from "../LoggedInUsers/LoggedInUsers"
import { useAuth } from '../Context/AuthContext';

function Home(props) {
  const [series, setSeries] = useState([{
    data: generateInitialData()
  }]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  console.log(currentUser,"currr ");
  

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
     
      <h1 className={`${styles.heading} `}>Welcome to Pi42!</h1>
      <p className={`${styles.message} ${styles.neonEffect}`}>{currentUser ? `Welcome back, ${currentUser?.displayName}!` : "Please login to view real-time updates."}</p>
      {currentUser ? (
        isLoading?(<div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
        <p>Loading data...</p>
      </div>):(<LoggedInUsers/>)

): (
      <>
        <h2>Real-time pricing: Get live updates on crypto prices from our platform.</h2>
        
        <p>
          Ready to start trading? <Link to="/login" className={styles.neonEffect}>Login</Link> or <Link to="/signup" className={styles.neonEffect}>sign up</Link> now to get started!
        </p>
      </>
    )}
  </div>);

}



export default Home;
