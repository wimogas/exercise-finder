import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";

import ThemeContext from "../store/theme-context";

import SunIcon from '../assets/icons/sun-fill.svg';
import MoonIcon from '../assets/icons/moon-fill.svg';
import LogoutIcon from '../assets/icons/logout-box-r-line.svg';

import {Block, Button, Dropdown, Text} from 'react-barebones-ts'
import GoogleIcon from "../assets/icons/google-16.svg";
import HeartIcon from '../assets/icons/heart-fill.svg'

import UserContext from "../store/user-context";
import SearchLine from "../assets/icons/search-line.svg";

const Nav = () => {

    const navigate = useNavigate()

    const themeCtx = useContext(ThemeContext);
    const userCtx = useContext(UserContext)

    const handleThemeToggle = () => {
        themeCtx.toggleDark();
    }

    const dropdownMenuItems = [
        <Button
            classes={`wopl-button-secondary${themeCtx.dark ? '-dark' : ''} bb-mx-300`}
            key="theme"
            action={() => handleThemeToggle()}
            icon={themeCtx.dark ? <MoonIcon/> : <SunIcon/>}
            iconColor={`${themeCtx.dark ? 'white' : 'black'}`}
            disabled
        >{themeCtx.dark ? "Dark theme" : "Light theme"}</Button>,
        <Button
            classes={`wopl-button-secondary${themeCtx.dark ? '-dark' : ''} bb-mx-300`}
            key="logout"
            action={() => userCtx.logout()}
            icon={<LogoutIcon/>}
            iconColor={`${themeCtx.dark ? 'white' : 'black'}`}
        >Logout</Button>
    ];

    return (
        <Block
            classes={`bb-px-600 bb-py-400 bb-w-100 ${themeCtx.dark ? "bb-bg-neutral-900" : "bb-bg-white"}`}
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
                        classes={`wopl-button-${userCtx.newFavorites ? 'primary' : 'secondary'}${themeCtx.dark ? '-dark' : ''}`}
                        icon={<HeartIcon/>}
                        action={() => navigate('/favorites/')}></Button>
                    <Button
                        classes={`wopl-button-secondary${themeCtx.dark ? '-dark' : ''}`}
                        icon={<SearchLine/>}
                        action={() => navigate('/search/')}></Button>
                    {userCtx.user.email.length > 0 ?
                    <Dropdown
                        menuClasses={`wopl-dropdown${themeCtx.dark ? '-dark' : ''}`}
                        buttonClasses={`wopl-button-secondary${themeCtx.dark ? '-dark' : ''}`}
                        buttonChildren={userCtx.user.email}
                        direction="left"
                        items={dropdownMenuItems}
                    /> :
                        <Button
                            classes={`wopl-button-secondary${themeCtx.dark ? '-dark' : ''}`}
                            action={userCtx.loginWithGoogle}
                            icon={<GoogleIcon/>}
                            iconSize={16}>Sign in with Google</Button>
                    }
                </Block>
            </Block>
        </Block>
    );
};

export default Nav;
