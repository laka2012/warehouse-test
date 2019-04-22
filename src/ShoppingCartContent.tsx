import React, { Component, ReactElement } from 'react';
import './ShoppingCartContent.scss';
import ShoppingCartDetails from './ShoppingCartDetails';
import CartItems from './ICartItem';

export interface Props {
    currentCartItems: CartItems;
    handleDeleteClick: (id: string, deletedItemCount: number) => void;
    handleAddOneClick: (id: string) => void;
    handleRemoveOneClick: (id: string) => void;
}

class ShoppingCartContent extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleAddOneClick = this.handleAddOneClick.bind(this);
        this.handleRemoveOneClick = this.handleRemoveOneClick.bind(this);
    }

    handleDeleteClick(id: string, deletedItemCount: number) {
        this.props.handleDeleteClick(id, deletedItemCount);
    }

    handleAddOneClick(id: string) {
        this.props.handleAddOneClick(id);
    }

    handleRemoveOneClick(id: string) {
        this.props.handleRemoveOneClick(id);
    }

    render() {
		let currentItemsInCart: ReactElement[] = [];
        const currentItems = this.props.currentCartItems;
        let totalPrice: number = 0;
        for (let item in currentItems) {
            let currentItem = currentItems[item];
            totalPrice += currentItem.price * currentItem.totalNumber;
            currentItemsInCart.push(
                <div key={currentItem.sku} className='shoppingcartdetailsrow'>
                    <div className='delete-btn' onClick={this.handleDeleteClick.bind(this, currentItem.sku, currentItem.totalNumber)}><button>Delete</button></div>
                    <ShoppingCartDetails item={currentItem}></ShoppingCartDetails>
                    <div className='add-delet-btns'>
                        <button className='add' onClick={this.handleAddOneClick.bind(this, currentItem.sku)}>+</button>
                        {currentItem.totalNumber}
                        <button className='delete' onClick={this.handleRemoveOneClick.bind(this, currentItem.sku)}>-</button>
                    </div>
                </div>
            )
        }

        return (
            <div className='shoppingCartContent'>
                <div className='cart-list'>
					{currentItemsInCart}
                </div>
                <div className='total-price'>
                    Total Price: ${totalPrice.toFixed(2)}
                </div>
                <div className='action'>
                    <button>Go To Pay</button>
                </div>
            </div>
        );
    }
}

export default ShoppingCartContent;
