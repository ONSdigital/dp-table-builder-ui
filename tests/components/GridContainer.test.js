import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GridContainer from '../../src/components/gridContainer';
import MetaData from '../../src/components/metaData';
import GridComponent from '../../src/components/grid';


configure({ adapter: new Adapter() });

describe('MetaData Component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<MetaData />);
    });

    it('MetaData should exist', () => {
        expect(wrapper).toBeTruthy();
    });




    // beforeEach(() => {
    //   wrapper = shallow(<GridComponent />);
    // });

    // it(' Grid should exist', () => {
    //   expect(wrapper).toBeTruthy();
    // });

  
    it('should have one metaTitle', () => {
        expect(wrapper.find('#metaTitle').type()).toEqual('input');
    });

    it('should have one metaSubtitle', () => {
        expect(wrapper.find('#metaSubtitle').type()).toEqual('input');
    });

    it('should have one metaUnits', () => {
        expect(wrapper.find('#metaUnits').type()).toEqual('input');
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




// A simple example test
describe('#postPreviewDat() using Promises', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<GridContainer />);
    });

    it('should load user data', () => {
        return wrapper.postPreviewData('vnglst')
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.name).toEqual('Koen van Gilst')
            })
    })
})


