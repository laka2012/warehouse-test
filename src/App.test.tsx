import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
	it('smoke test', () => {
		const wrapper = shallow(
			<App></App>
		);
		expect(wrapper).toMatchSnapshot();
	});
})
