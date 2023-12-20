import React, { useState } from 'react';
import { FaCog, FaAddressBook } from 'react-icons/fa';
import Users from './Users';
import ParentHierarchy from './ParentHierarchy';
import MasterData from './MasterData';


export default function TopNavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [settingMenuOpen, setSettingMenuOpen] = useState(false);
    const contents = ['Parent Hierarchy','masterdata','roles','responsibilities','users','election','survey']
    let [content, setContent] = useState(<ParentHierarchy />);

    const contentChange = (cname) => {
        console.log("hello")
        setContent(<MasterData/>)
        switch(cname){
            case 'Parent Hierarchy':
                console.log("hey");
                setContent(<ParentHierarchy/>)
                break;
            case 'masterdata':
                setContent(<MasterData/>)
                break;
            case 'users':
                setContent(<Users/>)
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
                                    <p className="text-white cursor-pointer hover:bg-white hover:text-black" onClick={() => contentChange(cname)}>{cname}</p>
                                ))}
                                
                                
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </nav>
        
        <div className='lgs'>
            <div className="ml-70 lg:ml-64 w-full p-8 mt-20 flex justify-center items-center  ">
                {content}
            </div>
        </div>
        </>
    );
}

