import React, {useContext} from "react";

import {Block, Button, Text} from 'react-barebones-ts'
import ThemeContext from "../../../contexts/theme-context";

type FilterProps = {
    name: string,
    selected: string,
    options: any,
    setSelected: any,
}

const Filter = ({name, selected, options, setSelected}: FilterProps) => {

    const themeCtx = useContext(ThemeContext);

    return (
        <Block column classes="bb-gap-300 bb-pb-500">
            <Text classes="bb-secondary-300" type="h3" text={name}/>
            <Block>
                {options.map((option: any) =>
                    <Button
                        classes={`bb-mx-300 ${selected === option ? `wopl-button-primary${themeCtx.dark ? '-dark' : ''}` : `wopl-button-secondary${themeCtx.dark ? '-dark' : ''}`}`}
                        key={option}
                        disabled={option === name}
                        action={() => setSelected((prevState: any) => prevState === option ? '' : option)}>
                        {option}
                    </Button>
                )}
            </Block>
        </Block>
    )
}

export default Filter;