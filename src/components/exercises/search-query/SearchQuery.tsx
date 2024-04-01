import React, {useContext} from 'react'
import {Badge, Block, Text} from "react-barebones-ts";

import ExerciseContext from "../../../contexts/exercise-context";

const SearchQuery = () => {

    return (
        <Block classes="bb-bg-neutral-800 bb-p-300 bb-border-radius-300 bb-gap-300">
            <Text classes="bb-secondary-300" text="Results for:"/>
        </Block>
    )
}

export default SearchQuery;