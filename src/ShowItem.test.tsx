import React from 'react';
import { shallow } from 'enzyme';
import ShowItem, {Props} from './ShowItem';
import Item from './IItem';

function showItemTest(props: Partial<Props> = {}) {
    return (
        <ShowItem {...{
            item: {
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
                sold_out: false
            },
	        addToCart: (item: Item) => {},
            ...props}}>
        </ShowItem>
    );
}

describe('ShowItem', () => {
	it('smoke test', () => {
		const wrapper = shallow(
			showItemTest()
		);
		expect(wrapper).toMatchSnapshot();
    });
});