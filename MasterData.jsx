import React,{useEffect} from 'react';
import styles from './style.module.css';
//import axios from 'axios';
import { GetStaticPaths } from 'next';

export default function MasterData() {
  const data = JSON.parse(localStorage.getItem("redata"))

    
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <p className={styles.cardh2}>Country: {" "} {data.COUNTRY.name}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardh2}>Zone: {" "}{data.ZONE.name}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardh2}>STATE: {" "}{data.STATE.name}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardh2}>REGION: {" "}{data.REGION.name}</p>
          </div>
          
      </div>
    </div>
    
    </>
  )
}
