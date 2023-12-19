import React,{useState,useEffect} from 'react'
import style from './style.module.css'
import TopNavBar from './TopNavBar';

export default function NUsers() {
    const [users, setUsers] = useState([]);
    const [showDetails, setShowDetails] = useState({});
    useEffect(() => {
        async function fetchCountries() {
            try {
              const response = await fetch(`http://127.0.0.1:5000/api/users`);
              const data = await response.json();
              setUsers(data.data);
              console.log(users)
            } catch (error) {
              console.error('Error fetching countries:', error);
            }
          }
          fetchCountries();
        
    }, []);
    const toggleDetails = (id) => {
        setShowDetails((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
      };
    
    
  return (
    <>
     <div className={style.fixedtop}>
        <TopNavBar/>
     </div>
     <div className={style.users}>
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
                <div style={{ marginTop: '10px', border: '1px solid #ccc', padding: '10px', width:"300px" }}>
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
                </div>
              )}
            </div>
            ))}
      </div>
    </>
  )
}
