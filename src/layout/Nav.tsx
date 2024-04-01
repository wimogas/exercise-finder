import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";

import ThemeContext from "../contexts/theme-context";
import UserContext from "../contexts/user-context";

import SunIcon from '../assets/icons/sun-fill.svg';
import MoonIcon from '../assets/icons/moon-fill.svg';
import LogoutIcon from '../assets/icons/logout-box-r-line.svg';

import {Block, Button, Dropdown, Text} from 'react-barebones-ts'
import GoogleIcon from "../assets/icons/google-16.svg";
import HeartIcon from '../assets/icons/heart-fill.svg'



const Nav = () => {

    const navigate = useNavigate()

    const {dark, toggleDark} = useContext(ThemeContext);
    const {user, logout, loginWithGoogle, newFavorites} = useContext(UserContext)

    const handleThemeToggle = () => {
        toggleDark();
    }

    const dropdownMenuItems = [
        <Button
            classes={`wopl-button-secondary${dark ? '-dark' : ''} bb-mx-300`}
            key="theme"
            action={() => handleThemeToggle()}
            icon={dark ? <MoonIcon/> : <SunIcon/>}
            iconColor={`${dark ? 'white' : 'black'}`}
            disabled
        >{dark ? "Dark theme" : "Light theme"}</Button>,
        <Button
            classes={`wopl-button-secondary${dark ? '-dark' : ''} bb-mx-300`}
            key="logout"
            action={() => logout()}
            icon={<LogoutIcon/>}
            iconColor={`${dark ? 'white' : 'black'}`}
        >Logout</Button>
    ];

    return (
        <Block
            classes={`bb-px-600 bb-py-400 bb-w-100 ${dark ? "bb-bg-neutral-900" : "bb-bg-white"}`}
           align={'center'} justify={'space-between'}
           style={{
               "height": "66px",
            }}
        >
            <Block classes="bb-gap-300">
                <Link to="/">
                    <Text classes="bb-secondary-300 bb-font-bold" text="Exercise Finder"/>
                </Link>
            </Block>
            <Block>
                <Block align="center" classes={"bb-gap-300"}>
                    <Button
                        disabled={user.email === ''}
                        classes={`wopl-button-${newFavorites ? 'primary' : 'secondary'}${dark ? '-dark' : ''}`}
                        icon={<HeartIcon/>}
                        action={() => navigate('/favorites/')}></Button>
                    {user.email.length > 0 ?
                    <Dropdown
                        menuClasses={`wopl-dropdown${dark ? '-dark' : ''}`}
                        buttonClasses={`wopl-button-secondary${dark ? '-dark' : ''}`}
                        buttonChildren={user.email}
                        direction="left"
                        items={dropdownMenuItems}
                    /> :
                        <Button
                            classes={`wopl-button-secondary${dark ? '-dark' : ''}`}
                            action={loginWithGoogle}
                            icon={<GoogleIcon/>}
                            iconSize={16}>Sign in with Google</Button>
                    }
                </Block>
            </Block>
        </Block>
    );
};

export default Nav;
