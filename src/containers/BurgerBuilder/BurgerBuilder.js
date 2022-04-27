import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
 import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const price = {
    salad: 4.5,
    cheese: 1.2,
    bacon: 1.3,
    meat: 6.00
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },

        totalPrice: 5.00,
        purchasable: false,
        ordered: false,
        loading: false
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] += 1;

        const updatedPrice = this.state.totalPrice + price[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredienthandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };

        if (updatedIngredients[type] <= 0) return;

        updatedIngredients[type] -= 1;

        const updatedPrice = this.state.totalPrice - price[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
        this.updatePurchasable(updatedIngredients);
    }


    purchaseHandler = () => {
        this.setState({ordered : true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({ordered : false});
    }

    purchaseContinue = () => {
        // alert('Your Order Has Been Placed!');
        this.setState({loading: true});
        const order = {
            ingredients : this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Aman',
                address: {
                    pinCode: '454552',
                    country: 'India'
                },
                email: 'aman@SpeechGrammarList.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, ordered : false});
            })
            .catch(err => {
                this.setState({loading: false, ordered : false});
            });
    }

    render() {

        const disableIngredients = { ...this.state.ingredients };

        for (let ing in disableIngredients) {
            disableIngredients[ing] = disableIngredients[ing] <= 0;
        }

        let orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
         purchaseCancelled = {this.purchaseCancelHandler} 
         purchaseContinue = {this.purchaseContinue} 
         price={this.state.totalPrice}/>

         if(this.state.loading) {
             orderSummary = <Spinner/>
         }

        return (
            <Aux>
                <Modal show={this.state.ordered} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addOne={this.addIngredientHandler}
                    removeOne={this.removeIngredienthandler}
                    disableIng={disableIngredients}
                    price={this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}  
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;