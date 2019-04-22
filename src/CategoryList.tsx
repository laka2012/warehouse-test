import React, { Component } from 'react';
import './CategoryList.scss';
import classNames from 'classnames';
import Tooltip from 'react-tooltip-lite';
import Item from './IItem';

export interface Props {
    items: Item[];
    selectedId: string;
    handleSelectedIdClick: (id: string, category: string) => void;
}

class CategoryList extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.handleSelectedIdClick = this.handleSelectedIdClick.bind(this);
    }

    handleSelectedIdClick(id: string, cate: string) {
        this.props.handleSelectedIdClick(id, cate);
    }

    render() {
        return (
            <div className='category-list'>
                <p className='category-title'>Categories</p>
                <div className={classNames({
                        item: true,
                        isSelect: this.props.selectedId == 'emptyId'
                    })} onClick={(e) => this.props.handleSelectedIdClick('emptyId', '')}>
                        All
                </div>
                {this.props.items.map((item: Item) =>
                    <Tooltip content={item.categories} key={item.sku} direction='right' styles={{position: 'inherit'}}>
                        <div className={classNames({
                            item: true,
                            isSelect: this.props.selectedId == item.sku
                        })} onClick={this.handleSelectedIdClick.bind(this, item.sku, item.categories)}>
                            {item.group_id} - {item.categories}
                        </div>
                    </Tooltip>
                )}
            </div>
        );
    }
}

export default CategoryList;
