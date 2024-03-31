import React, {useContext} from "react";

import {Block} from 'react-barebones-ts'
import Content from "./Content";

import ThemeContext from "../contexts/theme-context";


const OverlayWrapper = ({children}: any) => {

    const themeCtx = useContext(ThemeContext);

    return(
        <Block column classes={"tf-overlay"}>
            <Block
                classes={`${themeCtx.dark ? "bb-bg-neutral-700" : "bb-bg-white"}`}
                style={{
                "minHeight": "calc(100vh - 80px)"}}>
                <Content>
                    {children}
                </Content>
            </Block>
        </Block>
    )
}

export default OverlayWrapper;