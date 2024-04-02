import React, {useContext} from "react";
import {Block, Button, Text} from 'react-barebones-ts'

import SearchLine from "../../../assets/icons/search-line.svg";
import ThemeContext from "../../../contexts/theme-context";
import {useNavigate} from "react-router-dom";

type EmptyStateProps = {
    message: string,
}
const EmptyState = ({message}: EmptyStateProps) => {

    return (
        <Block column classes={"bb-gap-300"}>
            <Text classes="bb-secondary-300" text={message}/>
        </Block>
    )
}

export default EmptyState;
