import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MetaData from '../../src/components/metaData';

configure({ adapter: new Adapter() });

describe('Meta Data form', () => {
    
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<MetaData />);
    });


    it('should render correctly', () => {
        const output = shallow(
            <MetaData title="mockTitle" url="mockUrl" />
        );
  
    });



    it('should have one metaTitle', () => {
        expect(wrapper.find('#metaTitle').type()).toEqual('input');
    });

    it('should have one metaSubtitle', () => {
        expect(wrapper.find('#metaSubtitle').type()).toEqual('input');
    });

    it('should have one metaSource', () => {
        expect(wrapper.find('#metaSource').type()).toEqual('input');
    });

    it('should have one metaNotes', () => {
        expect(wrapper.find('#metaNotes').type()).toEqual('textarea');
    });

    it('should have one meta Size units', () => {
        expect(wrapper.find('#metaSizeunits').type()).toEqual('select');
    });

    it('should have one meta Header Cols', () => {
        expect(wrapper.find('#metaHeadercols').type()).toEqual('input');
    });

    it('should have one meta Header Rows', () => {
        expect(wrapper.find('#metaHeaderrows').type()).toEqual('input');
    });


});