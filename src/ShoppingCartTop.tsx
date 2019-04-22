import React, { Component } from 'react';
import './ShoppingCartTop.scss';
import { Link } from "react-router-dom";

class ShoppingCartTop extends Component<any> {
	render() {
		return (
			<div className='topbar'>
				<div className='title'>Current Shopping Cart</div>
				<div className='right-container'>
					<Link to="/">Back To Shop</Link>
				</div>
			</div>
		);
	}
}

export default ShoppingCartTop;
