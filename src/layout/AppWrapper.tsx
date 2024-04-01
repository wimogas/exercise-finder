import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Block, Button, Text} from 'react-barebones-ts'
import GithubIcon from '../assets/icons/github.svg'

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
            <Block column align={"center"} classes={"bb-bg-neutral-800 bb-px-500 bb-pt-500 bb-pb-200"}>
                <Text classes="bb-secondary-300" text={"Copyright 2024 Guillem Moya"}/>
                <Link to={'https://github.com/wimogas/exercise-finder'} target="_blank">
                    <Button classes="wopl-button-icon"
                            action={() => {}}
                            icon={<GithubIcon/>}
                            iconSize={24}></Button>
                </Link>
            </Block>
        </Block>
    )
}

export default AppWrapper;