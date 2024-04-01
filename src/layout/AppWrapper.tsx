import React, {useContext} from "react";
import {Block} from 'react-barebones-ts'
import Content from "./Content";
import Nav from "./Nav";

import ThemeContext from "../contexts/theme-context";

const AppWrapper = ({children}: any) => {

    const {dark} = useContext(ThemeContext);

    return(
        <Block column>
            <Nav/>
            <Block
                classes={`${dark ? "bb-bg-neutral-700" : "bb-bg-white"}`}
                style={{
                "minHeight": "calc(100vh - 66px)"}}>
                <Content>
                    {children}
                </Content>
            </Block>
            <Block>Github</Block>
        </Block>
    )
}

export default AppWrapper;