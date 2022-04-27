import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}} >{igKey}</span>: {props.ingredients[igKey]}
                </li>
        })


    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your Delicious Burger Is Ready : </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price : ₹ {props.price.toFixed(2)}</strong></p>
            <p>Checkout?</p>
            <Button clicked={props.purchaseCancelled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.purchaseContinue} btnType='Success'>CONTINUE</Button>
        </Aux>
    )


}

export default orderSummary;