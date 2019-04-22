import React from 'react';
import { shallow } from 'enzyme';
import ShowList, {Props} from './ShowList';
import Item from './IItem';
import ShowItem from './ShowItem';

function showListTest(props: Partial<Props> = {}) {
    return (
        <ShowList {...{
            items: [],
            pageCount: 10,
            handlePageClick: (data: any) => {},
            addToCart: (item: Item) => {},
            searchText: '',
            ...props}}>
        </ShowList>
    );
}

describe('ShowList', () => {
	it('smoke test', () => {
		const wrapper = shallow(
			showListTest()
		);
		expect(wrapper).toMatchSnapshot();
    });

    it('search description test', () => {
		const wrapper = shallow(
			showListTest({searchText: 'test'})
		);
		expect(wrapper.find('.search-desc')).toHaveLength(1);
    });
    
    it('show ShowItem test', () => {
		const wrapper = shallow(
			showListTest({items: [{
                date_added: 'test',
                type: 'test',
                sku: 'test',
                group_id: 'test',
                name: 'test',
                model: 'test',
                brand: 'test',
                url: 'test',
                image_url: 'test',
                on_special: true,
                price: 100,
                flybuys_points: 1005,
                shipping_class: 'test',
                add_to_cart: true,
                categories: 'test',
                in_stock: true,
                sold_out: false}]})
		);
		expect(wrapper.find(ShowItem)).toHaveLength(1);
	});
})