import React, { useState } from 'react';
import Link from 'next/link';
import ParentHierarchy from './ParentHierarchy';
import MasterData from './MasterData';
import Users from './Users';
import TopNavBar from './TopNavBar';
import style from './style.module.css';

export default function SidenavBar() {
    let [content, setContent] = useState(<ParentHierarchy />);

    const parentHierarchy = () => {
        setContent(<ParentHierarchy />);
    };

    const masterData = () => {
        setContent(<MasterData />);
    };

    const users = () => {
        setContent(<Users />);
    };

    return (
        <div className="flex">
            {/* Top Navigation */}
            <div className="w-full fixed top-0 z-10">
                <TopNavBar />
            </div>

            {/* Side Navigation (Fixed Left) */}
            <div className="w-1/5 lg:w-1/6 h-screen bg-gray-200 fixed left-5 top-20 z-20 hidden md:block">
                <ul className="mt-20">
                    <li
                        className={`${style.li} cursor-pointer py-2 px-4`}
                        onClick={parentHierarchy}
                    >
                        ParentHierarchy
                    </li>
                    <li
                        className={`${style.li} cursor-pointer py-2 px-4`}
                        onClick={masterData}
                    >
                        MASTERDATA
                    </li>
                    <li
                        className={`${style.li} cursor-pointer py-2 px-4`}
                        
                    >
                        ROLES
                    </li>
                    <li
                        className={`${style.li} cursor-pointer py-2 px-4`}
                       
                    >
                        RESPONSIBILITIES
                    </li>
                    <li
                        className={`${style.li} cursor-pointer py-2 px-4`}
                        onClick={users}
                    >
                        USERS
                    </li>
                    <li
                        className={`${style.li} cursor-pointer py-2 px-4`}
                        
                    >
                        ELECTION
                    </li>
                    <li
                        className={`${style.li} cursor-pointer py-2 px-4`}
                        
                    >
                        SURVEY
                    </li>
                    {/* Other list items */}
                </ul>
            </div>

            {/* Content Section */}
            <div className="ml-70 lg:ml-64 w-full p-8 mt-20 flex justify-center items-center hidden md:block ">
                {content}
            </div>
        </div>
    );
}

