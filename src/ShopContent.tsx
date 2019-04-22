import React, { Component } from 'react';
import './ShopContent.scss';
import CategoryList from './CategoryList';
import ShowList from './ShowList';
import Item from './IItem';

export interface Props {
	categoryItem: Item[];
	items: Item[];
	pageCount: number;
	handlePageClick: (data: any) => void;
	selectedId: string;
	handleSelectedIdClick: (id: string, category: string) => void;
	addToCart: (item: Item) => void;
	searchText: string;
	selectPage: number;
}

class ShopContent extends Component<Props> {
	render() {
		return (
			<div className='showcontent'>
				<CategoryList 
					items={this.props.categoryItem} 
					selectedId={this.props.selectedId} 
					handleSelectedIdClick={this.props.handleSelectedIdClick} 
				/>
				<ShowList
					items={this.props.items} 
					pageCount={this.props.pageCount} 
					handlePageClick={this.props.handlePageClick} 
					addToCart={this.props.addToCart}
					searchText={this.props.searchText}
					selectPage={this.props.selectPage}
				/>
			</div>
		);
	}
}

export default ShopContent;
