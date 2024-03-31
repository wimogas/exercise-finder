import React, {useContext} from 'react'
import {Badge, Block, Text} from "react-barebones-ts";

import ExerciseContext from "../../../store/exercise-context";

const SearchQuery = () => {

    const exerciseCtx = useContext(ExerciseContext)

    return (
        <Block classes="bb-bg-neutral-800 bb-p-300 bb-border-radius-300 bb-gap-300">

            <Text classes="bb-secondary-300" text="Results for:"/>
            {exerciseCtx.lastQuery.title && <Text classes="bb-secondary-300" text={`"${exerciseCtx.lastQuery.title}"`}/>}
            {exerciseCtx.lastQuery.type && <Badge classes="wopl-badge">{exerciseCtx.lastQuery.type}</Badge>}
            {exerciseCtx.lastQuery.bodyPart && <Badge classes="wopl-badge">{exerciseCtx.lastQuery.bodyPart}</Badge>}
            {exerciseCtx.lastQuery.equipment && <Badge classes="wopl-badge">{exerciseCtx.lastQuery.equipment}</Badge>}
            {exerciseCtx.lastQuery.level && <Badge classes="wopl-badge">{exerciseCtx.lastQuery.title}</Badge>}
        </Block>
    )
}

export default SearchQuery;