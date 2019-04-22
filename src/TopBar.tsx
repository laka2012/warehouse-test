import React, { Component, ChangeEvent } from 'react';
import './TopBar.scss';
import { Link } from "react-router-dom";

export interface Props {
	searchText: string;
	cartNumber: number;
	searchTextHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	handleSearchClear: () => void;
}

class TopBar extends Component<Props> {
	render() {
		return (
			<div className='topbar'>
				<div className='title'>Funny Shopping Mall</div>
				<div className='right-container'>
					<div className='search-icon'><i className="fas fa-search"></i></div>
					<div className='search'>	
						<input className='search-input' placeholder='Search...' value={this.props.searchText} onChange={this.props.searchTextHandler}></input>
						{ this.props.searchText != '' &&
							<span className='input-clear' onClick={this.props.handleSearchClear}>x</span>
						}
					</div>
					<div className='cart'>
						<i className="fas fa-shopping-cart"></i><span className='cart-number'><Link to="/shoppingcart">Current Cart({this.props.cartNumber})</Link></span>
					</div>
				</div>
			</div>
		);
	}
}

export default TopBar;
