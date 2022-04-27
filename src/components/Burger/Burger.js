import React from 'react';

import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {
    
    let addedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <Ingredient key={igKey + i} type={igKey} />;
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    
    if(addedIngredients.length === 0) {
        addedIngredients = <p>Please start adding ingredients to your BURGER!</p>
    }
    
    
    return (
        <div className={classes.Burger}>
            <Ingredient type={"bread-top"} />
            {addedIngredients}
            <Ingredient type={"bread-bottom"} />
        </div>
    );
}

export default burger;