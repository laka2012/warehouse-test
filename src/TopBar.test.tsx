import React from 'react';
import { shallow } from 'enzyme';
import TopBar, {Props} from './TopBar';

function topBarTest(props: Partial<Props> = {}) {
    return (
        <TopBar {...{
            searchText:'',
            cartNumber:0,
            searchTextHandler: (e)=>{},
            handleSearchClear: ()=>{},
            ...props}}>
        </TopBar>
    );
}

describe('TopBar', () => {
	it('smoke test', () => {
		const wrapper = shallow(
			topBarTest()
		);
		expect(wrapper).toMatchSnapshot();
    });

    it('no clear button test', () => {
		const wrapper = shallow(
			topBarTest()
		);
		expect(wrapper.find('.input-clear')).toHaveLength(0);
	});
    
    it('clear button test', () => {
		const wrapper = shallow(
			topBarTest({searchText: 'test'})
		);
		expect(wrapper.find('.input-clear')).toHaveLength(1);
	});
})