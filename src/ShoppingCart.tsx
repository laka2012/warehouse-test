import React, { Component } from 'react';
import './ShoppingCart.scss';
import ShoppingCartTop from './ShoppingCartTop';
import { LOCALSTORAGE_CARTNUMBER, LOCALSTORAGE_CURRENTITEMS } from './LocalStorageKey';
import CartItems from './ICartItem';
import ShoppingCartContent from './ShoppingCartContent';

export interface State {
	currentCartItems: CartItems;
}

class ShoppingCart extends Component<any, State> {
	currentCartNumber: number | null;
	currentCartItemsObject: CartItems | null;

	constructor(props: any) {
		super(props);
		this.state = {
			currentCartItems: {}
		};
		this.currentCartItemsObject = null;
		this.currentCartNumber = null;
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleAddOneClick = this.handleAddOneClick.bind(this);
		this.handleRemoveOneClick = this.handleRemoveOneClick.bind(this);
	}

	handleDeleteClick(id: string, deleteItemCount: number) {
		if (this.currentCartItemsObject) {
			delete this.currentCartItemsObject[id];
			this.setState({
				currentCartItems: this.currentCartItemsObject
			});
			localStorage.setItem(LOCALSTORAGE_CURRENTITEMS, JSON.stringify(this.currentCartItemsObject));
		}

		if (this.currentCartNumber) {
			this.currentCartNumber = this.currentCartNumber - deleteItemCount;
			localStorage.setItem(LOCALSTORAGE_CARTNUMBER, this.currentCartNumber.toString());
		}
	}

	handleAddOneClick(id: string) {
		if (this.currentCartItemsObject) {
			this.currentCartItemsObject[id].totalNumber++;
			this.setState({
				currentCartItems: this.currentCartItemsObject
			});
			localStorage.setItem(LOCALSTORAGE_CURRENTITEMS, JSON.stringify(this.currentCartItemsObject));
			if (this.currentCartNumber) {
				this.currentCartNumber++;
				localStorage.setItem(LOCALSTORAGE_CARTNUMBER, (this.currentCartNumber).toString());
			}
		}
	}

	handleRemoveOneClick(id: string) {
		if (this.currentCartItemsObject) {
			if (this.currentCartItemsObject[id].totalNumber - 1 > 0) {
				this.currentCartItemsObject[id].totalNumber--;
				this.setState({
					currentCartItems: this.currentCartItemsObject
				});
				localStorage.setItem(LOCALSTORAGE_CURRENTITEMS, JSON.stringify(this.currentCartItemsObject));

				if (this.currentCartNumber) {
					this.currentCartNumber--;
					localStorage.setItem(LOCALSTORAGE_CARTNUMBER, (this.currentCartNumber).toString());
				}
			}
		}
	}

	componentDidMount() {
		//load shopping cart info
		const currentCartItemsString = localStorage.getItem(LOCALSTORAGE_CURRENTITEMS);
		if (currentCartItemsString) {
			this.currentCartItemsObject = JSON.parse(currentCartItemsString) as CartItems;
			this.setState({ currentCartItems: this.currentCartItemsObject });
		}

		const currentCartNumberString = localStorage.getItem(LOCALSTORAGE_CARTNUMBER);
		if (currentCartNumberString) {
			this.currentCartNumber = parseInt(currentCartNumberString);
		}
	}

	render() {
		return (
			<div className='shoppingcart'>
				<ShoppingCartTop></ShoppingCartTop>
				<ShoppingCartContent
					currentCartItems={this.state.currentCartItems}
					handleDeleteClick={this.handleDeleteClick}
					handleAddOneClick={this.handleAddOneClick}
					handleRemoveOneClick={this.handleRemoveOneClick}>
				</ShoppingCartContent>
			</div>
		);
	}
}

export default ShoppingCart;
