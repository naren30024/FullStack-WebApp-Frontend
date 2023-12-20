import React, { useState, useEffect } from 'react'
import style from './style.module.css';
import TopNavBar from './TopNavBar';
import SidenavBar from './SidenavBar';

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
    
    let redata ={
      VILLAGE:[]
    }
    //const redata = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('redata')) : [];
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Check if window (browser environment) is defined
        redata = JSON.parse(localStorage.getItem('redata'));
        // Use localStorage here
        // ...
      }
    }, []);
    

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
    useEffect(() =>{
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
    },[])
   
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
        <>
        <div className="w-full fixed top-0 z-10">
         <TopNavBar/>
        </div>
        <div>
          <SidenavBar/>
        </div>
        <div className="flex justify-center mt-8 grid h-screen place-items-center">
                <div className="w-full lg:w-2/3">
                    <h1 className="text-3xl font-semibold text-center mb-6">Voter List</h1>
                    <div className="flex flex-col gap-4">
                        {users.map((user) => (
                            <div key={user.id} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl">{user.name}</h3>
                                    <button
                                        onClick={() => toggleDetails(user.id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        {showDetails[user.id] ? '▼' : '►'}
                                    </button>
                                </div>
                                {showDetails[user.id] && (
                                    <div className="border-t mt-4 pt-4">
                                        <p><strong>Name:</strong> {user.name}</p>
                                        <p><strong>Father's name:</strong> {user.father_name}</p>
                                        <p><strong>age:</strong> {user.age}</p>
                                        <p><strong>gender:</strong> {user.gender}</p>
                                        <p><strong>caste:</strong> {user.caste}</p>
                                        <p><strong>religion:</strong> {user.religion}</p>
                                        <p><strong>education:</strong> {user.education}</p>
                                        <p><strong>employement:</strong> {user.employement}</p>
                                        <p><strong>voter ID:</strong> {user.voter_id}</p>
                                        <p><strong>booth no:</strong> {user.booth_no}</p>
                                        <p><strong>prev voting date:</strong> {user.pre_voting_date}</p>
                                        <p><strong>prev vote to:</strong> {user.pre_vote_to}</p>
                                        <p><strong>membership: </strong>{user.membership}</p>
                                        <p><strong>affiliation:</strong> {user.affiliation}</p>
                                        <p><strong>influence factor:</strong> {user.influence_factor}</p>
                  <button className={style.add} onClick={toggleModal2}>edit</button>
                  <div id="myModal1" className={style.modal}>
                
              <div className={style.modalContent}>
              
                <h2 className='text-2xl font-semibold mb-4' style={{textAlign:"center"}}>EDIT USERS</h2>
                <span className={style.close} onclick={closeModel2}>&times;</span>
                <div className='flex justify-center items-center'>
                <form onSubmit={(e) =>handleindSubmit(e,user.id)}>
                  <label className=' text-gray-700' htmlFor="regionid" style={{marginLeft:"120px"}}>Village </label> <br />
                  <select className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' name="regionId" id="" value={userData2.regionId} onChange={handleindChange} style={{marginLeft:"25px",marginBottom:"5px"}}>
                    <option value="">Select village</option>
      
                    {redata.VILLAGE.map((reg) => 
                      <option key={reg.id} value={reg.id}>{reg.name}</option>
                    )}
                  </select><br />
                  <label htmlFor="name" style={{marginLeft:"120px"}} >name { " "}</label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='name'  value={user.name} onChange={handleindChange} /><br />
                  <label htmlFor="Father Name" style={{marginLeft:"120px"}}>Father Name</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='fatherName' defaultValue={user.fatherName} value={userData2.fatherName} onChange={handleindChange} /><br />
                  <label htmlFor="age" style={{marginLeft:"120px"}}>age</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='age' defaultValue={user.age} value={userData2.age} onChange={handleindChange}/><br />
                  <label htmlFor="gender" style={{marginLeft:"120px"}}>gender </label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name="gender" defaultValue={user.gender} value={userData2.gender} onChange={handleindChange}/><br />
                  <label htmlFor="caste" style={{marginLeft:"120px"}}>caste </label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='caste' defaultValue={user.caste} value={userData2.caste}  onChange={handleindChange}/><br />
                  <label htmlFor="religion" style={{marginLeft:"120px"}}>religion </label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='religion' defaultValue={user.religion} value={userData2.religion} onChange={handleindChange} /><br />
                  <label htmlFor="education" style={{marginLeft:"120px"}}>education </label><br />
                  <select className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' name="education" style={{marginLeft:"25px",marginBottom:"5px"}} id="" defaultValue={user.education} value={userData2.education} onChange={handleindChange}>
                    <option key="primary" value="primary">primary</option>
                    <option key="highschool" value="highschool">highschool</option>
                    <option key="inter" value="inter">inter</option>
                    <option key="degree" value="degree">degree</option>
                    <option key="pg" value="pg">pg</option>
                  </select><br />
                  <label htmlFor="employement" style={{marginLeft:"120px"}}>employement</label><br />
                  <select className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' name="employment" id="" style={{marginLeft:"25px",marginBottom:"5px"}} defaultValue={user.employment} value={userData2.employment} onChange={handleindChange}>
                    <option key="labour" value="labour">labour</option>
                    <option key="self" value="self">self</option>
                    <option key="pvt jobs" value="pbt jobs">pvt jobs</option>
                    <option key="agriculture" value="agriculture">agriculture</option>
                    
                  </select><br />
                  <label htmlFor="voterId" style={{marginLeft:"120px"}}>VoterId</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='voterId' defaultValue={user.voterId} value={userData2.voterId} onChange={handleindChange} /><br />
                  <label htmlFor="boothNo" style={{marginLeft:"120px"}}>booth no</label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='boothNo' defaultValue={user.boothNo} value={userData2.boothNo} onChange={handleindChange} /><br />
                  <label htmlFor="pre_voting_date" style={{marginLeft:"120px"}}>pre_voting_date</label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='preVotingDate' defaultValue={user.preVotingDate} value={userData2.preVotingDate} onChange={handleindChange} /><br />
                  <label htmlFor="prev_vote_to" style={{marginLeft:"120px"}}>prev_vote_to</label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='preVoteTo' value={userData2.preVoteTo} defaultValue={user.preVoteTo} onChange={handleindChange} /><br />
                  <label htmlFor="membership" style={{marginLeft:"120px"}}>membership</label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='membership' value={userData2.membership} defaultValue={user.membership} onChange={handleindChange} /><br />
                  <label htmlFor="affiliation"style={{marginLeft:"120px"}}>affiliation</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='affiliation' value={userData2.affiliation} defaultValue={user.affiliation} onChange={handleindChange} /><br />
                  <label htmlFor="influence_factor" style={{marginLeft:"120px"}}>influence_factor</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='influenceFactor' value={userData2.influenceFactor} defaultValue={user.influenceFactor} onChange={handleindChange} /><br />
                  <input type="submit" className={style.add} id="" />

                </form>
                </div>
                

              </div>
               
            </div>

                  
                </div>
              )}
            </div>
          ))}
          </div>
          <div>
            <button onClick={toggleModal} className={style.add}>ADD</button>
            
            <div id="myModal" className={style.modal}>
              <div className={style.modalContent}>
              
                <h2 className='text-2xl font-semibold mb-4' style={{textAlign:"center"}}>ADD USERS</h2>
                <span className={style.close} onclick={closeModel}>&times;</span>
                <div className='flex justify-center items-center'>
                <form onSubmit={handleAddSubmit}>
                  <label htmlFor="regionid" style={{marginLeft:"120px"}}>Village </label><br />
                  <select className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' name="regionId" id="" value={userData.regionId} onChange={handleAddChange} style={{marginLeft:"40px",marginBottom:"5px"}}>
                    <option value="">Select village</option>
      
                    {redata.VILLAGE.map((reg) => 
                      <option key={reg.id} value={reg.id}>{reg.name}</option>
                    )}
                  </select><br />
                  <label htmlFor="name" style={{marginLeft:"120px"}} >name { " "}</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='name' value={userData.name} onChange={handleAddChange} /><br />
                  <label htmlFor="Father Name" style={{marginLeft:"120px"}}>Father Name</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='fatherName' value={userData.fatherName} onChange={handleAddChange} /><br />
                  <label htmlFor="age" style={{marginLeft:"120px"}}>age</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='age' value={userData.age} onChange={handleAddChange}/><br />
                  <label htmlFor="gender" style={{marginLeft:"120px"}}>gender </label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name="gender" value={userData.gender} onChange={handleAddChange}/><br />
                  <label htmlFor="caste" style={{marginLeft:"120px"}}>caste </label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='caste' value={userData.caste}  onChange={handleAddChange}/><br />
                  <label htmlFor="religion" style={{marginLeft:"120px"}}>religion </label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='religion' value={userData.religion} onChange={handleAddChange} /><br />
                  <label htmlFor="education" style={{marginLeft:"120px"}}>education </label> <br />
                  <select className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' name="education" style={{marginLeft:"25px",marginBottom:"5px"}} id="" value={userData.education} onChange={handleAddChange}>
                    <option key="primary" value="primary">primary</option>
                    <option key="highschool" value="highschool">highschool</option>
                    <option key="inter" value="inter">inter</option>
                    <option key="degree" value="degree">degree</option>
                    <option key="pg" value="pg">pg</option>
                  </select><br />
                  <label htmlFor="employement" style={{marginLeft:"120px"}}>employement</label><br />
                  <select className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' name="employment" id="" style={{marginLeft:"25px",marginBottom:"5px"}} value={userData.employment} onChange={handleAddChange}>
                    <option key="labour" value="labour">labour</option>
                    <option key="self" value="self">self</option>
                    <option key="pvt jobs" value="pbt jobs">pvt jobs</option>
                    <option key="agriculture" value="agriculture">agriculture</option>
                    
                  </select><br />
                  <label htmlFor="voterId" style={{marginLeft:"120px"}}>VoterId</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='voterId' value={userData.voterId} onChange={handleAddChange} /><br />
                  <label htmlFor="boothNo" style={{marginLeft:"120px"}}>booth no</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='boothNo' value={userData.boothNo} onChange={handleAddChange} /><br />
                  <label htmlFor="pre_voting_date" style={{marginLeft:"120px"}}>pre_voting_date</label><br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='preVotingDate' value={userData.preVotingDate} onChange={handleAddChange} /><br />
                  <label htmlFor="prev_vote_to" style={{marginLeft:"120px"}}>prev_vote_to</label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='preVoteTo' value={userData.preVoteTo} onChange={handleAddChange} /><br />
                  <label htmlFor="membership" style={{marginLeft:"120px"}}>membership</label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='membership' value={userData.membership} onChange={handleAddChange} /><br />
                  <label htmlFor="affiliation"style={{marginLeft:"120px"}}>affiliation</label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='affiliation' value={userData.affiliation} onChange={handleAddChange} /><br />
                  <label htmlFor="influence_factor" style={{marginLeft:"120px"}}>influence_factor</label> <br />
                  <input className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' type="text" style={{marginLeft:"25px",marginBottom:"5px"}} name='influenceFactor' value={userData.influenceFactor} onChange={handleAddChange} /><br />
                  <input type="submit" className={style.add} id="" />

                </form>
                </div>
                

              </div>
               
            </div>
          </div>
        </div>
        </div>
        </>
    
  )
}
