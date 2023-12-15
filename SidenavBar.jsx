import React, { useState } from 'react'
//import styles from './sample.module.css'
import Link from 'next/link'
import ParentHierarchy from './ParentHierarchy'
import MasterData from './MasterData'
import Users from './Users'
import TopNavBar from './TopNavBar'
import style from './style.module.css';



export default function SidenavBar() {
    let [content, setContent] = useState(<ParentHierarchy/>);
    
    const parentHierarchy = () =>{
        setContent(<ParentHierarchy/>);
    }
    const masterData = () =>{
        setContent(<MasterData/>);
    }
    const users = () =>{
        setContent(<Users/>);
    }
    
  return (
    <div>
        <div className={style.fixedtop}>
            <TopNavBar/>
        </div>
        <div style={{display:"flex", marginTop:"50px"}}>
            <div className={style.fixedleft} style={{marginTop:"90px", background:"skyblue"}}>
                <ul>
                    <li className={style.li} style={{cursor:"pointer", padding:"20px"}} onClick={parentHierarchy}>
                         ParentHierachy
                    </li>
                    <li className={style.li} style={{cursor:"pointer", padding:"20px"}} onClick={masterData}>MASTERDATA</li>
                    <li className={style.li} style={{cursor:"pointer", padding:"20px"}}>ROLES</li>
                    <li className={style.li} style={{cursor:"pointer", padding:"20px"}}>RESPONSIBILITIES</li>
                    <li className={style.li} style={{cursor:"pointer", padding:"20px"}} onClick={users}>USERS</li>
                    <li className={style.li} style={{cursor:"pointer",padding:"20px"}}> ELECTION </li>
                    <li className={style.li} style={{cursor:"pointer", padding:"20px"}}>SURVEY</li>
                </ul>
            </div>
            <div className={style.contents}>
                {content}
            </div>
        </div>
        
    </div>
  )
}
