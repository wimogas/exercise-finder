import React from 'react'
import {Block, Button, Icon, Text} from "react-barebones-ts";

import SearchForm from "../components/exercises/search-form/SearchForm";
import OverlayWrapper from "../layout/OverlayWrapper";
import CloseIcon from "../assets/icons/close-fill.svg";
import SearchLine from "../assets/icons/search-line.svg";

const SearchExercises = () => {

    return (
        <OverlayWrapper>
            <Block column>
                <Block justify={"space-between"} align={"center"}>
                    <Block align={"center"} classes={"bb-secondary-300 bb-gap-300"}>
                        <Icon icon={<SearchLine/>} size={24} color={"#C7C8C9"}></Icon>
                        <Text type="h1" text={"Search Exercise"}/>
                    </Block>
                    <Button classes="wopl-button-icon" action={() => history.back()} icon={<CloseIcon/>} iconSize={24}></Button>
                </Block>
                <SearchForm/>
            </Block>
        </OverlayWrapper>
    );
}

export default SearchExercises;