import React, {useContext, useEffect} from "react";
import {Block} from 'react-barebones-ts'
import Content from "./Content";
import Nav from "./Nav";

import ThemeContext from "../store/theme-context";
import Cookies from "js-cookie";
import UserContext from "../store/user-context";

const AppWrapper = ({children}: any) => {

    const userCtx = useContext(UserContext)
    const themeCtx = useContext(ThemeContext);

    useEffect(() => {
        const cookie = Cookies.get(process.env.COOKIE!)
        if (cookie && userCtx.user.email === '') {
            userCtx.checkSession()
        }
    }, [])

    useEffect(() => {
        console.log(userCtx.user)
    }, [userCtx.user]);

    return(
        <Block column>
            <Nav/>
            <Block
                classes={`${themeCtx.dark ? "bb-bg-neutral-700" : "bb-bg-white"}`}
                style={{
                "minHeight": "calc(100vh - 66px)"}}>
                <Content>
                    {children}
                </Content>
            </Block>
        </Block>
    )
}

export default AppWrapper;