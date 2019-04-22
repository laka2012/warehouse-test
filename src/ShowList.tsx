import React, { Component } from 'react';
import './ShowList.scss';
import ShowItem from './ShowItem';
import ReactPaginate from 'react-paginate';
import Item from './IItem';

export interface Props {
    items: Item[];
    pageCount: number;
    handlePageClick: (data:any) => void;
    addToCart: (item: Item) => void;
    searchText: string;
}

class ShowList extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(data: any) {
        this.props.handlePageClick(data);
    }

    render() {
        return (
            <div className='showlist'>
                { this.props.searchText != '' &&
                    <div className='search-desc'>You are searching "{this.props.searchText}" in name or brand</div>
                }
                <div className='items'>
                    {this.props.items.map((item: Item) =>
                        <ShowItem key={item.sku} item={item} addToCart={this.props.addToCart} />
                    )}
                </div>
                <div className='pagingbar'>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.props.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.onPageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        );
    }
}

export default ShowList;
