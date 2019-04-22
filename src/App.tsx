import React, { Component, ChangeEvent } from 'react';
import './App.scss';
import TopBar from './TopBar';
import ShopContent from './ShopContent';
import axios from 'axios';
import Item from './IItem';
import { LOCALSTORAGE_CARTNUMBER, LOCALSTORAGE_CURRENTITEMS } from './LocalStorageKey';
import CartItems from './ICartItem';
import 'babel-polyfill';
import 'promise-polyfill';

export interface State {
	searchText: string;
	cartNumber: number;
	pageCount: number;
	selectPage: number;
	items: Item[];
	filteredItems: Item[];
	selectedId: string;
}

const PAGE_LIMIT = 12;

class App extends Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			searchText: '',
			cartNumber: 0,
			pageCount: 0,
			selectPage: 0,
			items: [],
			filteredItems: [],
			selectedId: ''
		};
		this.searchTextHandler = this.searchTextHandler.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.handleSelectedIdClick = this.handleSelectedIdClick.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.handleSearchClear = this.handleSearchClear.bind(this);
	}

	handlePageClick(data: any) {
		this.setState({selectPage: data.selected});
	}

	handleSelectedIdClick(id: string, category: string) {
		const filteredItems = this.state.items.filter((item:Item) => item.categories == category || category == '');
		this.setState({searchText: '', selectedId: id, filteredItems});
		this.setState((state: State) => ({
			pageCount: Math.ceil(state.filteredItems.length / PAGE_LIMIT)
		}));
	}

	searchTextHandler(e: ChangeEvent<HTMLInputElement>) {
		const filteredItems = this.state.items.filter((item:Item) => 
			item.name.match(new RegExp(e.target.value, "i")) || item.brand.match(new RegExp(e.target.value, "i"))
		);
		this.setState({searchText: e.target.value, selectedId: '', filteredItems});
		this.setState((state: State) => ({
			pageCount: Math.ceil(state.filteredItems.length / PAGE_LIMIT)
		}));
	}

	handleSearchClear() {
		const filteredItems = this.state.items;
		this.setState({searchText: '', pageCount: filteredItems.length  / PAGE_LIMIT ,filteredItems});
	}

	addToCart(item: Item) {
		this.setState(state => ({cartNumber: state.cartNumber+1}), () => {
			localStorage.setItem(LOCALSTORAGE_CARTNUMBER, this.state.cartNumber.toString());
		});

		let currentCartItemsString = localStorage.getItem(LOCALSTORAGE_CURRENTITEMS);
		if (currentCartItemsString) {
			let currentCartItemsObject: CartItems = JSON.parse(currentCartItemsString) as CartItems;
			if (currentCartItemsObject[item.sku]) {
				currentCartItemsObject[item.sku].totalNumber++;
			} else {
				currentCartItemsObject[item.sku] = {
					totalNumber: 1,
					...item
				}
			}
			localStorage.setItem(LOCALSTORAGE_CURRENTITEMS, JSON.stringify(currentCartItemsObject));
		} else {
			let newCartItemsObject: CartItems = {};
			newCartItemsObject[item.sku] = {
				totalNumber: 1,
				...item
			};
			localStorage.setItem(LOCALSTORAGE_CURRENTITEMS, JSON.stringify(newCartItemsObject));
		}
	}

	componentDidMount() {
		/**
		 * This is simulated loading, load some data to client once
		 * 
		 * for server.js 
		 * /products?page={1,2...n} for paging number
		 * &limit=12 for items per page
		 * &searchText=example for text filter
		 * &category=example for category filter
		 */
		axios.get('./test.json')
			.then(response => this.setState({ 
				items: response.data,
				filteredItems: response.data,
				pageCount: Math.ceil(response.data.length / PAGE_LIMIT) 
			}))
			.catch(error => {
				console.log(error);
			});
		
		//load shopping cart
		const cartNumber = localStorage.getItem(LOCALSTORAGE_CARTNUMBER);
		if (cartNumber) {
			this.setState({cartNumber: parseInt(cartNumber)});
		}
	}

	render() {
		//simulate server data
		const allItems: Item[] = this.state.items;
		const filteredItems: Item[] = this.state.filteredItems;
		const pagingItems: Item[] = filteredItems.slice((this.state.selectPage)*PAGE_LIMIT, (this.state.selectPage+1)*PAGE_LIMIT);

		//get all categories
		const categories: Item[] = [];
		const map = new Map<string, boolean>();
		for (const item of allItems) {
			if(!map.has(item.categories)){
				map.set(item.categories, true);
				categories.push(item);
			}
		}

		return (
			<div className='root'>
				<TopBar 
					searchText={this.state.searchText}
					cartNumber={this.state.cartNumber}
					searchTextHandler={this.searchTextHandler}
					handleSearchClear={this.handleSearchClear}
				/>
				<ShopContent 
					categoryItem={categories}
					items={pagingItems}
					pageCount={this.state.pageCount}
					handlePageClick={this.handlePageClick}
					selectedId={this.state.selectedId}
					handleSelectedIdClick={this.handleSelectedIdClick}
					addToCart={this.addToCart}
					searchText={this.state.searchText}
				/>
			</div>
		);
	}
}

export default App;
