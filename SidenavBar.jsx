import React, { useState } from 'react';
import Link from 'next/link';
import ParentHierarchy from './ParentHierarchy';
import MasterData from './MasterData';
import Users from './Users';
import TopNavBar from './TopNavBar';
import style from './style.module.css';

export default function SidenavBar() {
    
    const contents = [
        {
            name:'Parent Hierarchy',
            link:'/components/ParentHierarchy'
        },
        {name:'masterdata',link:'/components/MasterData'},
        {name:'roles',link:''},
        {name:'responsibilities',link:''},
        {name:'users',link:'/components/Users'},
        {name:'election',link:''},
        {name:'survey',link:''}
    ]

    return (
        <div className="flex">
            
            <div className="w-1/5 lg:w-1/6 h-screen bg-gray-200 fixed left-5 top-20 z-20 hidden md:block">
                <ul className="mt-20">
                    {contents.map((content) => (
                        <li
                        className={`${style.li} cursor-pointer py-2 px-4`}
                    
                    >
                        <Link href={content.link}>{content.name}</Link>
                        
                    </li>
                    ))}
                    
                    
                    
    
                   
                </ul>
            </div>

            
            
        </div>
    );
}
