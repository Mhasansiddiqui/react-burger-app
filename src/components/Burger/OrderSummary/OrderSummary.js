import React, { Component } from 'react';

import Aux from '../../../hoc/AUX'

import Button from '../../UI/button/button'
class OrderSummary extends Component {

    componentWillUpdate(){
     console.log('order summary')
    }

    render() {


        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}> {igKey} </span> :{this.props.ingredients[igKey]}
                </li>
            })

           return (
            <Aux>
                <h3></h3>
                <p>A delicios burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}

                </ul>
                <p><strong> Total Price : {this.props.price.toFixed(2)} </strong> </p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinue} btnType="Success">CONTINUE</Button>
            </Aux>
            )

    }

}
export default OrderSummary