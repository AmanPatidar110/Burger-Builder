import React from 'react';

import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
    <ul className={classes.NavItems} >
        <NavItem link='/' active>Burger Builder</NavItem>
        <NavItem link='/' >Check Out</NavItem>
    </ul>
);

export default navItems;