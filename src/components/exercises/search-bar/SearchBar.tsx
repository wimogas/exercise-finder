import React, {useContext} from "react";
import {Input} from 'react-barebones-ts'

import ThemeContext from "../../../contexts/theme-context";

type SearchBarProps = {
    setSearchField: any
}

const SearchBar = ({setSearchField}: SearchBarProps) => {

    const {dark} = useContext(ThemeContext);

    const handleSetFieldName = (e: any) => {
        setSearchField(e.target.value)
    }

    return (
        <Input
            classes={`bb-border-1 ${dark ? 'bb-border-secondary-300 bb-bg-neutral-700 bb-secondary-100' : 'bb-border-secondary-500'}`}
            name={"search"}
            placeholder={`Search by name...`}
            onChange={handleSetFieldName}/>
    )
}

export default SearchBar;