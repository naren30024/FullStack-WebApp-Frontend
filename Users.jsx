import React, { useState, useEffect } from 'react'
import style from './style.module.css';

export default function Users() {

    const [userData, setUserData] = useState(
      {
        "regionId":"",
        "name": "",
        "age": "",
        "gender": "",
        "caste": "",
        "religion": "",
        "education": "",
        "employment": "",
        "voterId": "",
        "boothNo": "",
        "preVotingDate": "",
        "preVoteTo": "",
        "membership": "",
        "affiliation": "",
        "influenceFactor": "",
        "fatherName": ""
      }
    )
    const [userData2, setUserData2] = useState(
      {
        "id":"",
        "regionId":"",
        "name": "",
        "age": "",
        "gender": "",
        "caste": "",
        "religion": "",
        "education": "",
        "employment": "",
        "voterId": "",
        "boothNo": "",
        "preVotingDate": "",
        "preVoteTo": "",
        "membership": "",
        "affiliation": "",
        "influenceFactor": "",
        "fatherName": ""
      }
    )
    const [users, setUsers] = useState([]);
    const [regions, setRegions] = useState([]);
    const redata = JSON.parse(localStorage.getItem("redata"))

    //change add data
    const handleAddChange = (e) =>{
      setUserData({...userData,[e.target.name]:e.target.value})
    }
    const handleindChange = (e) =>{
      setUserData2({...userData2,[e.target.name]:e.target.value})
    }

    // submit and sent to backend user added data
    const handleAddSubmit = async (e) =>{
      e.preventDefault();
      const jsondata = {
        "mandalId":redata.MANDAL.id,
        "regionId":parseInt(userData.regionId),
        "name": userData.name,
        "age": parseInt(userData.age),
        "gender": userData.gender,
        "caste": userData.caste,
        "religion": userData.religion,
        "education": userData.education,
        "employment": userData.employment,
        "voterId": userData.voterId,
        "boothNo": userData.boothNo,
        "preVotingDate": userData.preVotingDate,
        "preVoteTo": userData.preVoteTo,
        "membership": userData.membership,
        "affiliation": userData.affiliation,
        "influenceFactor": userData.influenceFactor,
        "fatherName": userData.fatherName
      }
      console.log(jsondata)
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsondata),
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 201) {
          
          alert("user added successfully");
    
        }
      } catch (error) {
        console.error('Error during sadding user:', error.message);
      }
    }
    //individual user edit
    const handleindSubmit = async (e,id) =>{
      e.preventDefault();
      const jsondata = {
        "id":id,
        "regionId":parseInt(userData2.regionId),
        "name": userData2.name,
        "age": parseInt(userData2.age),
        "gender": userData2.gender,
        "caste": userData2.caste,
        "religion": userData2.religion,
        "education": userData2.education,
        "employment": userData2.employment,
        "voterId": userData2.voterId,
        "boothNo": userData2.boothNo,
        "preVotingDate": userData2.preVotingDate,
        "preVoteTo": userData2.preVoteTo,
        "membership": userData2.membership,
        "affiliation": userData2.affiliation,
        "influenceFactor": userData2.influenceFactor,
        "fatherName": userData2.fatherName
      }
      console.log(jsondata)
      try {
        const response = await fetch('http://localhost:5000/api/users/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsondata),
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 201) {
          
          alert("Data edited successfully");
    
        }
      } catch (error) {
        console.error('Error during user updating:', error.message);
      }
    }
    // open modal 
    function toggleModal() {
      document.getElementById("myModal").style.display = "block";
      
    }
    function toggleModal2() {
      document.getElementById("myModal1").style.display = "block";
      
    }
    //close modal
    function closeModel(){
      document.getElementById("myModal").style.display = "none";
      
    }
    function closeModel2(){
      document.getElementById("myModal1").style.display = "none";
      
    }
    
    // Close the modal when clicking outside the modal content
    window.onclick = function(event) {
      const modal = document.getElementById("myModal");
      const modal2 = document.getElementById("myModal1");
      if (event.target == modal) {
        modal.style.display = "none";
        
      }
      if (event.target == modal2){
        modal2.style.display = "none";
      }
    
     };
      useEffect(() => {
        async function fetchCountries() {
            try {
              const response = await fetch(`http://127.0.0.1:5000/api/users/${redata.MANDAL.id}`);
              const data = await response.json();
              setUsers(data);
              console.log(users)
            } catch (error) {
              console.error('Error fetching countries:', error);
            }
          }
          fetchCountries();
        
      }, []);

      // fetch regions and set regions
      useEffect(() => {
        async function fetchRegions() {
            try {
              const response = await fetch(`http://127.0.0.1:5000/api/villages`);
              const data = await response.json();
              setRegions(data);
              console.log("regions",regions)
            } catch (error) {
              console.error('Error fetching countries:', error);
            }
          }
          fetchRegions();
        
      }, []);
      
      console.log("global",regions)
      const [showDetails, setShowDetails] = useState({});
    
      const toggleDetails = (id) => {
        setShowDetails((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
      };
    
      return (
        <div>
          <h1>Voter List</h1>
          {users.map((user) => (
            <div key={user.id} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>{user.name}</h3>
                <button onClick={() => toggleDetails(user.id)}>
                  {showDetails[user.id] ? '▼' : '►'}
                </button>
              </div>
              {showDetails[user.id] && (
                <div style={{ marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>
                  <p>Name : {user.name}</p>
                  <p>father's name: {user.father_name}</p>
                  <p>age: {user.age}</p>
                  <p>gender: {user.gender}</p>
                  <p>caste: {user.caste}</p>
                  <p>religion: {user.religion}</p>
                  <p>education: {user.education}</p>
                  <p>employement: {user.employement}</p>
                  <p>voter ID: {user.voter_id}</p>
                  <p>booth no: {user.booth_no}</p>
                  <p>prev voting date: {user.pre_voting_date}</p>
                  <p>prev vote to: {user.pre_vote_to}</p>
                  <p>membership: {user.membership}</p>
                  <p>affiliation: {user.affiliation}</p>
                  <p>influence factor: {user.influence_factor}</p>
                  <button className={style.add} onClick={toggleModal2}>edit</button>
                  <div id="myModal1" className={style.modal}>
              <div className={style.modalContent}>
              
                <h2 style={{textAlign:"center"}}>EDIT USERS</h2>
                <span className={style.close} onclick={closeModel2}>&times;</span>
                <div>
                <form onSubmit={(e) =>handleindSubmit(e,user.id)}>
                  <label htmlFor="regionid" style={{marginLeft:"120px"}}>Village </label>
                  <select className={style.selctuser} name="regionId" id="" value={userData2.regionId} onChange={handleindChange} style={{marginLeft:"40px",marginBottom:"5px"}}>
                    <option value="">Select village</option>
      
                    {redata.VILLAGE.map((reg) => 
                      <option key={reg.id} value={reg.id}>{reg.name}</option>
                    )}
                  </select><br />
                  <label htmlFor="name" style={{marginLeft:"120px"}} >name { " "}</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"70px",marginBottom:"5px"}} name='name'  value={user.name} onChange={handleindChange} /><br />
                  <label htmlFor="Father Name" style={{marginLeft:"120px"}}>Father Name</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='fatherName' defaultValue={user.fatherName} value={userData2.fatherName} onChange={handleindChange} /><br />
                  <label htmlFor="age" style={{marginLeft:"120px"}}>age</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"85px",marginBottom:"5px"}} name='age' defaultValue={user.age} value={userData2.age} onChange={handleindChange}/><br />
                  <label htmlFor="gender" style={{marginLeft:"120px"}}>gender </label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"60px",marginBottom:"5px"}} name="gender" defaultValue={user.gender} value={userData2.gender} onChange={handleindChange}/><br />
                  <label htmlFor="caste" style={{marginLeft:"120px"}}>caste </label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"70px",marginBottom:"5px"}} name='caste' defaultValue={user.caste} value={userData2.caste}  onChange={handleindChange}/><br />
                  <label htmlFor="religion" style={{marginLeft:"120px"}}>religion </label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"50px",marginBottom:"5px"}} name='religion' defaultValue={user.religion} value={userData2.religion} onChange={handleindChange} /><br />
                  <label htmlFor="education" style={{marginLeft:"120px"}}>education </label>
                  <select className={style.selctuser} name="education" style={{marginLeft:"40px",marginBottom:"5px"}} id="" defaultValue={user.education} value={userData2.education} onChange={handleindChange}>
                    <option key="primary" value="primary">primary</option>
                    <option key="highschool" value="highschool">highschool</option>
                    <option key="inter" value="inter">inter</option>
                    <option key="degree" value="degree">degree</option>
                    <option key="pg" value="pg">pg</option>
                  </select><br />
                  <label htmlFor="employement" style={{marginLeft:"120px"}}>employement</label>
                  <select className={style.selctuser} name="employment" id="" style={{marginLeft:"20px",marginBottom:"5px"}} defaultValue={user.employment} value={userData2.employment} onChange={handleindChange}>
                    <option key="labour" value="labour">labour</option>
                    <option key="self" value="self">self</option>
                    <option key="pvt jobs" value="pbt jobs">pvt jobs</option>
                    <option key="agriculture" value="agriculture">agriculture</option>
                    
                  </select><br />
                  <label htmlFor="voterId" style={{marginLeft:"120px"}}>VoterId</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"60px",marginBottom:"5px"}} name='voterId' defaultValue={user.voterId} value={userData2.voterId} onChange={handleindChange} /><br />
                  <label htmlFor="boothNo" style={{marginLeft:"120px"}}>booth no</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"50px",marginBottom:"5px"}} name='boothNo' defaultValue={user.boothNo} value={userData2.boothNo} onChange={handleindChange} /><br />
                  <label htmlFor="pre_voting_date" style={{marginLeft:"120px"}}>pre_voting_date</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"5px",marginBottom:"5px"}} name='preVotingDate' defaultValue={user.preVotingDate} value={userData2.preVotingDate} onChange={handleindChange} /><br />
                  <label htmlFor="prev_vote_to" style={{marginLeft:"120px"}}>prev_vote_to</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='preVoteTo' value={userData2.preVoteTo} defaultValue={user.preVoteTo} onChange={handleindChange} /><br />
                  <label htmlFor="membership" style={{marginLeft:"120px"}}>membership</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"30px",marginBottom:"5px"}} name='membership' value={userData2.membership} defaultValue={user.membership} onChange={handleindChange} /><br />
                  <label htmlFor="affiliation"style={{marginLeft:"120px"}}>affiliation</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"45px",marginBottom:"5px"}} name='affiliation' value={userData2.affiliation} defaultValue={user.affiliation} onChange={handleindChange} /><br />
                  <label htmlFor="influence_factor" style={{marginLeft:"120px"}}>influence_factor</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"5px",marginBottom:"5px"}} name='influenceFactor' value={userData2.influenceFactor} defaultValue={user.influenceFactor} onChange={handleindChange} /><br />
                  <input type="submit" className={style.add} id="" />

                </form>
                </div>
                

              </div>
               
            </div>

                  
                </div>
              )}
            </div>
          ))}
          <div>
            <button onClick={toggleModal} className={style.add}>ADD</button>
            
            <div id="myModal" className={style.modal}>
              <div className={style.modalContent}>
              
                <h2 style={{textAlign:"center"}}>ADD USERS</h2>
                <span className={style.close} onclick={closeModel}>&times;</span>
                <div>
                <form onSubmit={handleAddSubmit}>
                  <label htmlFor="regionid" style={{marginLeft:"120px"}}>Village </label>
                  <select className={style.selctuser} name="regionId" id="" value={userData.regionId} onChange={handleAddChange} style={{marginLeft:"40px",marginBottom:"5px"}}>
                    <option value="">Select village</option>
      
                    {redata.VILLAGE.map((reg) => 
                      <option key={reg.id} value={reg.id}>{reg.name}</option>
                    )}
                  </select><br />
                  <label htmlFor="name" style={{marginLeft:"120px"}} >name { " "}</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"70px",marginBottom:"5px"}} name='name' value={userData.name} onChange={handleAddChange} /><br />
                  <label htmlFor="Father Name" style={{marginLeft:"120px"}}>Father Name</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='fatherName' value={userData.fatherName} onChange={handleAddChange} /><br />
                  <label htmlFor="age" style={{marginLeft:"120px"}}>age</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"85px",marginBottom:"5px"}} name='age' value={userData.age} onChange={handleAddChange}/><br />
                  <label htmlFor="gender" style={{marginLeft:"120px"}}>gender </label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"60px",marginBottom:"5px"}} name="gender" value={userData.gender} onChange={handleAddChange}/><br />
                  <label htmlFor="caste" style={{marginLeft:"120px"}}>caste </label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"70px",marginBottom:"5px"}} name='caste' value={userData.caste}  onChange={handleAddChange}/><br />
                  <label htmlFor="religion" style={{marginLeft:"120px"}}>religion </label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"50px",marginBottom:"5px"}} name='religion' value={userData.religion} onChange={handleAddChange} /><br />
                  <label htmlFor="education" style={{marginLeft:"120px"}}>education </label>
                  <select className={style.selctuser} name="education" style={{marginLeft:"40px",marginBottom:"5px"}} id="" value={userData.education} onChange={handleAddChange}>
                    <option key="primary" value="primary">primary</option>
                    <option key="highschool" value="highschool">highschool</option>
                    <option key="inter" value="inter">inter</option>
                    <option key="degree" value="degree">degree</option>
                    <option key="pg" value="pg">pg</option>
                  </select><br />
                  <label htmlFor="employement" style={{marginLeft:"120px"}}>employement</label>
                  <select className={style.selctuser} name="employment" id="" style={{marginLeft:"20px",marginBottom:"5px"}} value={userData.employment} onChange={handleAddChange}>
                    <option key="labour" value="labour">labour</option>
                    <option key="self" value="self">self</option>
                    <option key="pvt jobs" value="pbt jobs">pvt jobs</option>
                    <option key="agriculture" value="agriculture">agriculture</option>
                    
                  </select><br />
                  <label htmlFor="voterId" style={{marginLeft:"120px"}}>VoterId</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"60px",marginBottom:"5px"}} name='voterId' value={userData.voterId} onChange={handleAddChange} /><br />
                  <label htmlFor="boothNo" style={{marginLeft:"120px"}}>booth no</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"50px",marginBottom:"5px"}} name='boothNo' value={userData.boothNo} onChange={handleAddChange} /><br />
                  <label htmlFor="pre_voting_date" style={{marginLeft:"120px"}}>pre_voting_date</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"5px",marginBottom:"5px"}} name='preVotingDate' value={userData.preVotingDate} onChange={handleAddChange} /><br />
                  <label htmlFor="prev_vote_to" style={{marginLeft:"120px"}}>prev_vote_to</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='preVoteTo' value={userData.preVoteTo} onChange={handleAddChange} /><br />
                  <label htmlFor="membership" style={{marginLeft:"120px"}}>membership</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"30px",marginBottom:"5px"}} name='membership' value={userData.membership} onChange={handleAddChange} /><br />
                  <label htmlFor="affiliation"style={{marginLeft:"120px"}}>affiliation</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"45px",marginBottom:"5px"}} name='affiliation' value={userData.affiliation} onChange={handleAddChange} /><br />
                  <label htmlFor="influence_factor" style={{marginLeft:"120px"}}>influence_factor</label>
                  <input className={style.selctuser} type="text" style={{marginLeft:"5px",marginBottom:"5px"}} name='influenceFactor' value={userData.influenceFactor} onChange={handleAddChange} /><br />
                  <input type="submit" className={style.add} id="" />

                </form>
                </div>
                

              </div>
               
            </div>
          </div>
        </div>
    
  )
}
