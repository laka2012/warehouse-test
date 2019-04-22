import React, { Component } from 'react';
import './ShowItem.scss';
import Item from './IItem';

export interface Props {
	item: Item;
	addToCart: (item: Item) => void; 
}

class ShowItem extends Component<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {isToggleOn: true};
		this.handleAddCartClick = this.handleAddCartClick.bind(this);
	}

	handleAddCartClick() {
		this.props.addToCart(this.props.item);
	}
	
	render() {
		return (
			<div className='showitem'>
				<div className='name'>{this.props.item.name}</div>
				<div className='image'>
					<img src={this.props.item.image_url} ></img>
				</div>
				<div className='bottom'>
					<div className='price'>${this.props.item.price}</div>
					<button className='add-cart' onClick={this.handleAddCartClick}>Add To Cart</button>
				</div>
			</div>
		);
	}
}

export default ShowItem;
