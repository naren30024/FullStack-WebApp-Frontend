import React from 'react'
import { FaCog, FaAddressBook } from 'react-icons/fa';

export default function TopNavBar() {

    const clickmenu = () =>{
        const menu = document.getElementById("menu");
        menu.style.display = menu.style.display === "none" ? "block" : "none";
    }
    const logoutfunc = () =>{
        window.location.href = "/components/Login";

    }
  return (
    <div>
        <nav>
            <div style={{display:"flex"}}>
                <div style={{backgroundColor:"gray", width:"15%", height:"50px", fontSize:"25px", margin:"10px", padding:"5px"}}>
                    Logo Of ABC
                </div>
                <div style={{backgroundColor:"gray", width:"85%", height:"60px", fontSize:"25px", margin:"10px", display:"flex"}}>
                    <div style={{marginLeft:"30%", marginTop:"0px"}}>
                        <div style={{marginTop:"10px", fontWeight:"bold"}}>
                            ABC
                        </div>
                    </div>
                    <div  style={{display:"flex"}}>
                        <div style={{marginLeft:"600px", marginTop:"15px", cursor:"pointer"}} onClick={clickmenu}>
                            
                            <FaAddressBook/>
                            <div>
                                <a id="menu" style={{fontSize:"15px",display:"none", backgroundColor:"black", height:"40px",width:"90px",borderRadius:"10px",color:"white",margin:"0px",padding:"5px",fontSize:"20px"}} onClick={logoutfunc}>Logout</a>
                            </div>
                        </div>
                        <div style={{marginLeft:"10px", marginTop:"15px", cursor:"pointer"}}>
                            <FaCog/>
                        </div>

                    </div>

                </div>
            </div>
        </nav>
    </div>
  )
}
