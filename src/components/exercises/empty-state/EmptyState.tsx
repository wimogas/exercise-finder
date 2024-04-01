import React, {useContext} from "react";
import {Block, Button, Text} from 'react-barebones-ts'

import SearchLine from "../../../assets/icons/search-line.svg";
import ThemeContext from "../../../contexts/theme-context";
import {useNavigate} from "react-router-dom";

type EmptyStateProps = {
    message: string,
}
const EmptyState = ({message}: EmptyStateProps) => {

    const navigate = useNavigate()

    const {dark} = useContext(ThemeContext)

    return (
        <Block column classes={"bb-gap-300"}>
            <Text classes="bb-secondary-300" text={message}/>
            <Block justify={"flex-start"}>
                <Button
                    classes={`wopl-button-secondary${dark ? '-dark' : ''}`}
                    icon={<SearchLine/>}
                    action={() => navigate('/search')}>
                    New Search
                </Button>
            </Block>
        </Block>
    )
}

export default EmptyState;
