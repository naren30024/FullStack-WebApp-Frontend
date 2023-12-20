import React, { useState } from 'react';
import { FaCog, FaAddressBook } from 'react-icons/fa';
import Users from './Users';
import ParentHierarchy from './ParentHierarchy';
import MasterData from './MasterData';
import Link from 'next/link';


export default function TopNavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [settingMenuOpen, setSettingMenuOpen] = useState(false);
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
    let [content, setContent] = useState(<Users />);

    const contentChange = (cname) => {
        console.log("hello")
        
        switch(cname){
            case 'Parent Hierarchy':
                console.log("hey");
                setContent(<ParentHierarchy />)
                break;
            case 'masterdata':
                console.log("heym");
                setContent(<MasterData />)
                break;
            case 'users':
                setContent(<Users />)
                break;
            default:
                setContent("")
        }
        setContent(<ParentHierarchy />);
    };


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const settingToggleMenu = () => {
        setSettingMenuOpen(!settingMenuOpen)
    };

    const logoutfunc = () => {
        localStorage.removeItem("at");
        window.location.href = "/components/Login";
    };

    return (
        <>
        <nav className="bg-gray-900 text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <div className="bg-gray-800 text-white px-4 py-2 mr-4 rounded-lg">
                        Logo Of ABC
                    </div>
                    <div className="hidden sm:block font-semibold">
                        ABC
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="cursor-pointer mr-10 relative ">
                        <FaAddressBook onClick={toggleMenu} className="text-2xl" />
                        {menuOpen && (
                            <div className="absolute top-full  mt-2 bg-black rounded-lg p-2">
                                <a onClick={logoutfunc} className="text-white cursor-pointer block" href="#">Logout</a>
                            </div>
                        )}
                    </div>
                    <div className="cursor-pointer block lg:hidden">
                        <FaCog className="text-2xl" onClick={settingToggleMenu} />
                        {settingMenuOpen && (
                            <div className="absolute top-20 right-0 mt-0  bg-black rounded-lg p-2">
                                {contents.map((cname) => (
                                    <p className="text-white cursor-pointer hover:bg-white hover:text-black"><Link href={cname.link}>{cname.name}</Link></p>
                                ))}
                                
                                
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </nav>
        
        
        </>
    );
}

