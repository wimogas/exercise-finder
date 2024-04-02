import React, {useContext, useEffect, useState} from 'react'
import {Badge, Block, Text} from "react-barebones-ts";
import ExerciseContext from "../../../contexts/exercise-context";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import Spinner from "../../spinner/Spinner";

type SearchQueryProps = {
    query: any,
}
const SearchQuery = ({query} : SearchQueryProps) => {

    const [queryList, setQueryList] = useState<any[]>([])

    useEffect(() => {
        if (query) {
            setQueryList(Object.values(query))
        }
    }, [query]);

    return (
        <>
            {queryList.length > 0 &&
                <Block classes="bb-bg-neutral-800 bb-p-300 bb-border-radius-300 bb-gap-300">
                    <Text classes="bb-secondary-300" text="Results for:"/>
                    {queryList.map(query => <Badge key={query} classes={"wopl-badge"}>{query}</Badge>)}
                </Block>
            }
        </>
    )
}

export default SearchQuery;