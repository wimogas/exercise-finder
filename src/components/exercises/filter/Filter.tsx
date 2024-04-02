import React, {useContext} from "react";

import {Block, Button, Dropdown, Icon, Text} from 'react-barebones-ts'
import ThemeContext from "../../../contexts/theme-context";
import ArrowDownIcon from '../../../assets/icons/arrow-down-s-line.svg'

type FilterProps = {
    filter: string,
    name: string,
    filters: any,
    options: any,
    setSelected: any,
}

const Filter = ({name, filter, filters, options, setSelected}: FilterProps) => {

    const {dark} = useContext(ThemeContext);

    const menuOptions = options.map((option: any) =>
            <Button
                classes={`bb-mx-300 wopl-button-${filters[filter] === option ? 'primary' : 'secondary'}${dark ? '-dark' : ''}`}
                key={option}
                action={() => setSelected((filters: any) => {
                    return {
                    ...filters,
                    [filter]: filters[filter] === option ? '' : option
                }})}>
                {option}
            </Button>
        )

    return (
        <Block align={"center"} classes="bb-gap-300">
            <Dropdown
                buttonClasses={`wopl-button-${filters[filter] ? 'primary' : 'secondary'}${dark ? '-dark' : ''}`}
                buttonChildren={<>
                    {filters[filter] || name}
                    <Icon icon={<ArrowDownIcon/>}/>
                </>}
                menuClasses={"wopl-dropdown-dark"}
                buttonStyle={{"minWidth": "70px"}}
                direction={"right"}
                items={menuOptions}/>
        </Block>
    )
}

export default Filter;