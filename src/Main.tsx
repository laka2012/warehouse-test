import React, { Component } from 'react';
import './ShoppingCart.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ShoppingCart from './ShoppingCart';
import App from './App';

class Main extends Component<any> {
	render() {
		return (
			<Router>
				<Route exact path="/" component={App} />
				<Route path="/shoppingcart" component={ShoppingCart} />
			</Router>
		);
	}
}

export default Main;
