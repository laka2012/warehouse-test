import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';

describe('Main', () => {
	it('smoke test', () => {
		const wrapper = shallow(
			<Main></Main>
		);
		expect(wrapper).toMatchSnapshot();
	});
})
