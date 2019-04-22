import React, { Component } from 'react';
import './ShoppingCartDetails.scss';
import { CartItem } from './ICartItem';

export interface Props {
    item: CartItem;
}

class ShoppingCartDetails extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}
	
	render() {
		return (
			<div className='shoppingcartdetails'>
				<div className='image'><img src={this.props.item.image_url}></img></div>
                <div className='name'>{this.props.item.name}</div>
                <div className='price'>${this.props.item.price}</div>
			</div>
		);
	}
}

export default ShoppingCartDetails;
