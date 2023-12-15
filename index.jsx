import React from 'react';
import { useRouter } from 'next/router';
import { Route,Routes } from 'react-router-dom';
import Login from './components/Login'
import SidenavBar from './components/SidenavBar';
import ParentHierarchy from './components/ParentHierarchy';
import MasterData from './components/MasterData';
import TopNavBar from './components/TopNavBar';
import Users from './components/Users';
import Signup from './components/Signup';


const HomePage = () => {
  return (
    <div>
      <div>
        <Signup/>
      </div>
      
    </div>
  );
};

export default HomePage;