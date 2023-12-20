import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import style from './style.module.css';
import TopNavBar from './TopNavBar';
import SidenavBar from './SidenavBar';

export default function ParentHierarchy() {
  const [options, setOptions] = useState({
    COUNTRY: '',
    ZONE: '',
    STATE: '',
    REGION: '',
    MP: '',
    ASSEMBLY: '',
    MANDAL: '',
    VILLAGE: '',
  });
  // dropdown disable
  const [dropdownsDisabled, setDropdownsDisabled] = useState(true);
  const handleEdit = () => {
    setDropdownsDisabled(!dropdownsDisabled);
  };
  const[reUseData, setReUseData] = useState({
    COUNTRY : {},
    ZONE:{},
    STATE:{},
    REGION:{},
    MP:{},
    ASSEMBLY:{},
    MANDAL:{},
    VILLAGE:{},

  })
  const [countryList, setCountryList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [mpList, setMpList] = useState([]);
  const [assemblyList, setAssemblyList] = useState([]);
  const [mandalList, setMandalList] = useState([]);
  const [villageList, setVillageList] = useState([]);

  // fetch all Countries
  useEffect(() => {
    async function fetchCountries() {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/countries');
          const data = await response.json();
          setCountryList(data);
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      }
      fetchCountries();
    
  }, []);

  // fetch zone for a specific country
  useEffect(() =>{
    async function fetchZones() {
        if (options.COUNTRY){
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/zones/${options.COUNTRY}`);
                const data = await response.json();
                setZoneList(data);
              } catch (error) {
                console.error('Error fetching zones:', error);
              }
          }

    }
    fetchZones();
  },[options.COUNTRY])

  //fetch state for a specific zone
  useEffect(() =>{
    async function fetchStates() {
        if (options.ZONE) {
          try {
            const response = await fetch(`http://127.0.0.1:5000/api/states/${options.ZONE}`);
            const data = await response.json();
            setStateList(data);
          } catch (error) {
            console.error('Error fetching zones:', error);
          }
        }
      }
      fetchStates();
  },[options.ZONE])

  // fetch region for a specific state
  useEffect(() =>{
    async function fetchRegion() {
        if (options.STATE){
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/regions/${options.STATE}`);
                const data = await response.json();
                setRegionList(data);
              } catch (error) {
                console.error('Error fetching zones:', error);
              }
          }

    }
    fetchRegion();
  },[options.STATE])

  //fetch mp for a specific region
  useEffect(() =>{
    async function fetchMp() {
        if (options.REGION){
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/mps/${options.REGION}`);
                const data = await response.json();
                setMpList(data);
              } catch (error) {
                console.error('Error fetching zones:', error);
              }
          }

    }
    fetchMp();
  },[options.REGION])

  //fetch assembly for a specific mp
  useEffect(() =>{
    async function fetchAssembly() {
        if (options.MP){
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/assemblies/${options.MP}`);
                const data = await response.json();
                setAssemblyList(data);
              } catch (error) {
                console.error('Error fetching zones:', error);
              }
          }

    }
    fetchAssembly();
  },[options.MP])

  //fetch mandals for a specific assembly
  useEffect(() =>{
    async function fetchMandals() {
        if (options.ASSEMBLY){
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/mandals/${options.ASSEMBLY}`);
                const data = await response.json();
                setMandalList(data);
              } catch (error) {
                console.error('Error fetching zones:', error);
              }
          }

    }
    fetchMandals();
  },[options.ASSEMBLY])

  //fetch villages for a specific mandal
  useEffect(() =>{
    async function fetchVillages() {
        if (options.MANDAL){
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/villages/${options.MANDAL}`);
                const data = await response.json();
                setVillageList(data);
              } catch (error) {
                console.error('Error fetching zones:', error);
              }
          }

    }
    fetchVillages();
  },[options.MANDAL])

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setOptions({ COUNTRY: selectedCountry, ZONE: '', STATE: '', REGION: '' });
    const filterCountry = countryList.filter(country => country.id == selectedCountry)
    setReUseData({...reUseData,COUNTRY:filterCountry[0]});
  };

  const handleZoneChange = (e) => {
    const selectedZone = e.target.value;
    setOptions({ ...options, ZONE: selectedZone, STATE: '', REGION: '' });
    const filterZone = zoneList.filter(zone => zone.id == selectedZone)
    setReUseData({...reUseData,ZONE:filterZone[0]});
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setOptions({ ...options, STATE: selectedState, REGION: '' });
    const filterState = stateList.filter(state => state.id == selectedState)
    setReUseData({...reUseData,STATE:filterState[0]});
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setOptions({ ...options, REGION: selectedRegion });
    const filterRegion = regionList.filter(region => region.id == selectedRegion)
    setReUseData({...reUseData,REGION:filterRegion[0]});
    
  };
  const handleMPChange = (e) => {
    const selectedMP = e.target.value;
    setOptions({ ...options, MP: selectedMP, ASSEMBLY: '', MANDAL: '', VILLAGE: '' });
    const filterMP = mpList.filter(region => region.id == selectedMP)
    setReUseData({...reUseData,MP:filterMP[0]});
    console.log(reUseData);
    
  };

  const handleAssemblyChange = (e) => {
    const selectedAssembly = e.target.value;
    setOptions({ ...options, ASSEMBLY: selectedAssembly, MANDAL: '', VILLAGE: '' });
    const filterASSEMBLY = assemblyList.filter(region => region.id == selectedAssembly)
    setReUseData({...reUseData,ASSEMBLY:filterASSEMBLY[0]});
  };

  const handleMandalChange = (e) => {
    const selectedMandal = e.target.value;
    setOptions({ ...options, MANDAL: selectedMandal, VILLAGE: '' });
    const filterMandal = mandalList.filter(region => region.id == selectedMandal)
    setReUseData({...reUseData,MANDAL:filterMandal[0]});
  };

  const handleVillageChange = (e) => {
    const selectedVillage = e.target.value;
    setOptions({ ...options, VILLAGE: selectedVillage });
    const filterVillage = villageList.filter(region => region.id == selectedVillage)
    setReUseData({...reUseData,VILLAGE:villageList});
    
    window.localStorage.setItem("redata",JSON.stringify(reUseData));
  };
  

  return (

    <>
    <div className="w-full fixed top-0 z-10">
      <TopNavBar/>
    </div>
    <div>
      <SidenavBar/>
    </div>
    <div className='container  p-0 mt-10 grid h-screen place-items-center'>
      <ul className='grid gap-3'>
        <div>
          <li>
            <label htmlFor="Country">COUNTRY</label>
            <select className={` w-full ${style.country}`} name="COUNTRY" id="country" value={options.COUNTRY} onChange={handleCountryChange} disabled={dropdownsDisabled}>
              <option value="">Select Country</option>
              {countryList.map((country) => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
          </li>
        </div>
        <div>
          <li>
            <label htmlFor="Zone">ZONE</label>
            <select className={` w-full ${style.zone}`} name="ZONE" id="zone" value={options.ZONE} onChange={handleZoneChange} disabled={dropdownsDisabled}>
              {options.COUNTRY && (
                <option value="">Select Zone</option>
              )}
              {zoneList.map((zone) => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </li>
        </div>
        <div>
          <li>
            <label htmlFor="State">STATE</label>
            <select className={` w-full ${style.state}`}name="STATE" id="state" value={options.STATE} onChange={handleStateChange} disabled={dropdownsDisabled}>
              {options.ZONE && (
                <option value="">Select State</option>
              )}
              {stateList.map((state) => (
                <option key={state.id} value={state.id}>{state.name}</option>
              ))}
            </select>
          </li>
        </div>
        <div>
          <li>
            <label htmlFor="Region">REGION</label>
            <select className={style.region} name="REGION" id="region" value={options.REGION} onChange={handleRegionChange} disabled={dropdownsDisabled}>
              {options.STATE && (
                <option value="">Select Region</option>
              )}
              {regionList.map((region) => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </li>
        </div>
        <div>
          <li>
            <label htmlFor="MP">MP</label>
            <select className={style.mp}name="MP" id="MP" value={options.MP} onChange={handleMPChange} disabled={dropdownsDisabled}>
              {options.REGION && (
                <option value="">Select MP</option>
              )}
              {mpList.map((mp) => (
                <option key={mp.id} value={mp.id}>{mp.name}</option>
              ))}
            </select>
          </li>
        </div>
        <div>
          <li>
            <label htmlFor="Assembly">Assembly</label>
            <select className={style.assembly} name="Assembly" id="Assembly" value={options.ASSEMBLY} onChange={handleAssemblyChange} disabled={dropdownsDisabled}>
              {options.MP && (
                <option value="">Select Assembly</option>
              )}
              {assemblyList.map((assembly) => (
                <option key={assembly.id} value={assembly.id}>{assembly.name}</option>
              ))}
            </select>
          </li>
        </div>
        <div>
          <li>
            <label htmlFor="Mandal">Mandal</label>
            <select className={style.mandal} name="Mandal" id="Mandal" value={options.MANDAL} onChange={handleMandalChange} disabled={dropdownsDisabled}>
              {options.ASSEMBLY && (
                <option value="">Select Mandal</option>
              )}
              {mandalList.map((mandal) => (
                <option key={mandal.id} value={mandal.id}>{mandal.name}</option>
              ))}
            </select>
          </li>
        </div>
        <div>
          <li>
            <label htmlFor="Village">Village</label>
            <select className={style.village} name="Village" id="Village" value={options.VILLAGE} onChange={handleVillageChange} disabled={dropdownsDisabled}>
              {options.MANDAL && (
                <option value="">Select Village</option>
              )}
              {villageList.map((village) => (
                <option key={village.id} value={village.id}>{village.name}</option>
              ))}
            </select>
          </li>
        </div>
      </ul>
      <button className={`w-full mt-0 px-4 py-2 bg-blue-500 text-white rounded-md ${style.edit}`} onClick={handleEdit}>{dropdownsDisabled ? 'Edit' : 'Done'}</button>
    </div>
    </>
  );
}


