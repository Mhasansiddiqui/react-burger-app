import React, { Component } from 'react'

import Aux from './../hoc/auxile'

import BuildControls from './../components/Burger/BuildControls/BuildControls'

import Burger from './../components/Burger/Burger'

import Modal from '../components/UI/Modal/Modal'

import OrderSummary from '../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES =
    {
        salad: 0.4,
        chesse: 0.3,
        meat: 1.3,
        bacon: 0.3


    }
class BurgerBuilder extends Component {
    /* 
    constructor(props){
        super(props);
        this.state = {...}
    } */

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchaseable: sum > 0 })

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngerdients = {
            ...this.state.ingredients
        };
        updatedIngerdients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngerdients })
        this.updatePurchaseState(updatedIngerdients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngerdients = {
            ...this.state.ingredients
        };
        updatedIngerdients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngerdients })
        this.updatePurchaseState(updatedIngerdients);

    }


    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        alert('continue');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        purchaseContinue={this.purchaseContinueHandler}
                        purchaseCanceled={this.purchaseCancelHandler}
                        ingredients={this.state.ingredients} ></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    disabled={disabledInfo}
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchaseable={this.state.purchaseable}
                />


            </Aux>
        );
    }
}
export default BurgerBuilder;