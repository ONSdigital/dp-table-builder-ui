import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import GridContainer from '../../src/components/gridContainer';
import MetaData from '../../src/components/metaData';
import Grid from '../../src/components/grid';
import HotTable from 'react-handsontable';


configure({ adapter: new Adapter() });

describe('child Components exist', () => {
    let metawrapper
    let gridcontainerWrapper
    let grid
    

    // example dataset that is returned from the renderer parse endpoint
    // this is used to render a table from existing data
    const renderJson = {"title":"this is the title","subtitle":"this is the subtitle","source":"ons","type":"table","type_version":"2","filename":"abc1234","row_formats":[{"row":0,"heading":true}],"column_formats":[{"col":0,"heading":true,"width":"14.25em"},{"col":1,"width":"9.62em"},{"col":2,"width":"9.62em"},{"col":3,"width":"9.69em"}],"cell_formats":[{"row":1,"col":1,"align":"Center","rowspan":1,"colspan":2},{"row":1,"col":2,"align":"Center"},{"row":2,"col":3,"align":"Center"},{"row":3,"col":3,"align":"Center"},{"row":4,"col":1,"align":"Right"},{"row":4,"col":2,"align":"Center"},{"row":4,"col":3,"align":"Center"},{"row":5,"col":3,"align":"Center"},{"row":6,"col":3,"align":"Center"},{"row":7,"col":3,"align":"Center"},{"row":8,"col":3,"align":"Center"},{"row":9,"col":3,"align":"Center"},{"row":10,"col":3,"align":"Center"},{"row":11,"col":3,"align":"Center"},{"row":12,"col":3,"align":"Center"},{"row":13,"col":3,"align":"Center"},{"row":14,"col":3,"align":"Center"},{"row":15,"col":3,"align":"Center"},{"row":16,"col":3,"align":"Center"},{"row":17,"col":3,"align":"Center"},{"row":18,"col":3,"align":"Center"},{"row":19,"col":3,"align":"Center"},{"row":20,"col":3,"align":"Center"}],"data":[["","","",""],["","col b and col c are merged cells","",""],["","CPIH","CPI","OOH"],["Nov 2007","2.2","2.1","2.6"],["Dec 2007","2.3","2.1","2.8"],["Jan 2008","2.4","2.2","2.8"],["Feb 2008","2.6","2.5","2.8"],["Mar 2008","2.6","2.5","2.7"],["Apr 2008","3.0","3.0","2.8"],["May 2008","3.3","3.3","2.8"],["Jun 2008","3.7","3.8","2.7"],["Jul 2008","4.2","4.4","2.7"],["Aug 2008","4.4","4.7","2.5"],["Sep 2008","4.8","5.2","2.6"],["Oct 2008","4.2","4.5","2.6"],["Nov 2008","3.8","4.1","2.7"],["Dec 2008","3.0","3.1","2.6"],["Jan 2009","2.9","3.0","2.2"],["Feb 2009","3.1","3.2","2.3"],["Mar 2009","2.8","2.9","2.1"],["Apr 2009","2.3","2.3","1.9"]],"footnotes":["a","b","c"],"current_table_width":741,"current_table_height":510,"single_em_height":16,"cell_size_units":"em"}

    const baseProps = {
        onError: jest.fn()
    }


    beforeEach(() => {
        metawrapper = shallow(<MetaData />);
        gridcontainerWrapper = shallow(<GridContainer {...baseProps} />);
        //grid = shallow(<Grid />);
    });


    afterEach(() => {
        baseProps.onError.mockClear()
    })


    it('MetaData component should exist', () => {
        expect(metawrapper).toBeTruthy();
    });




    it('Gridcontainer component should exist', () => {
        // const gridcon = shallow(<GridContainer/>);
        expect(gridcontainerWrapper).toBeTruthy();
    });

  

    //test merge cells parse function is converted 
    //to format expected by handsontable
    it('Merge cells is parsed in correct format', () => {
        const instance = gridcontainerWrapper.instance();
        const expResult =  [ { row: 1, col: 1, align: 'Center', rowspan: 1, colspan: 2 } ]
        instance.setMergeCells(renderJson.cell_formats)
        expect(instance.state.mergeCells).toEqual(expResult)
    });



    //test col width parse function is converted 
    //to format expected by handsontable
    it('Col width is parsed in correct format', () => {
        const instance = gridcontainerWrapper.instance();
        const expResult =  [ 228, 154, 154, 155 ];
        instance.setColWidths(renderJson)
        expect(instance.state.colWidths).toEqual(expResult)
    });



    //test cellAlignments parse function is converted 
    //to format expected by handsontable
    it('Cell alingment is parsed in correct format', () => {
        const instance = gridcontainerWrapper.instance();
        const expResult =  { row: 1, col: 1, className: 'htCenter' }
        instance.setCellAlignments(renderJson)
        expect(instance.state.cellAlignments).toContainEqual(expect.objectContaining(expResult))
    });




    //test getHeaderColCount parse function is converted 
    //to format expected by handsontable
    it('Gets correct header  column count from parsed data', () => {
        const instance = gridcontainerWrapper.instance();
        const expResult =  1;
        const headerColCount= instance.getHeaderColumnCount(renderJson)
        expect(headerColCount).toEqual(expResult)
    });


    //test getHeaderRowCount parse function is converted 
    //to format expected by handsontable
    it('Gets correct header row  count from parsed data', () => {
        const instance = gridcontainerWrapper.instance();
        const expResult =  1;
        const headerRowCount= instance.getHeaderRowCount(renderJson)
        expect(headerRowCount).toEqual(expResult)
    });


    //test Footnotes parse function is converted 
    //from comma separated to one with newlines
    it('convert comma separated footnotes to newline from parsed data', () => {
        const instance = gridcontainerWrapper.instance();
        const testString= "a,b,c";
        const expResult= instance.getFootNotes(testString)
        expect(expResult).toMatch("\n");
    });

    it('handles errors when all validation methods fail', () => {
        const instance = gridcontainerWrapper.instance()
        instance.handsontableData = [["", "", ""], ["", "", ""]]
        instance.onPreviewGrid()
        expect(baseProps.onError).toHaveBeenCalledTimes(1)
    })

    it('handles errors when header rows are not properly set', () => {
        const instance = gridcontainerWrapper.instance()
        instance.handsontableData = [["123", "456", "789"], ["A", "B", "C"]]
        instance.onPreviewGrid()
        expect(instance.tableHasAppropriateHeaderRowsSet()).toBeTruthy();
        expect(baseProps.onError).toHaveBeenCalledTimes(1)
    })

    it('handles errors when header columns are not properly set', () => {
        const instance = gridcontainerWrapper.instance()
        instance.handsontableData = [["", "456", "789"], ["Row Heading", "B", "C"]]
        instance.onPreviewGrid()
        expect(instance.tableHasAppropriateHeaderColumnsSet()).toBeTruthy();
        expect(baseProps.onError).toHaveBeenCalledTimes(1)
    })

    it('passes validation with a simple table structure', () => {
        const instance = gridcontainerWrapper.instance()
        instance.handsontableData = [
            ["Name", "Age", "Height"], 
            ["Name A", "30", "180cm"], 
            ["Name B", "32", "182cm"]
        ];
        const topRow = instance.handsontableData[0]
        expect(instance.calculateNumberOfHeaderColumnsRequired(topRow)).toEqual(0)
        expect(instance.calculateNumberOfHeaderRowsRequired(instance.handsontableData)).toEqual(0)
    })

    it('passes validation with a two tier header table', () => {
        const instance = gridcontainerWrapper.instance()
        instance.handsontableData = [
            ["", "Mars", "", "Venus", ""], // empty string elements after Mars/Venus = merged cell
            ["", "Produced", "Sold", "Produced", "Sold"], 
            ["Teddy Bears", "50,000", "30,000", "100,000", "80,000"],
            ["Board Games", "10,000", "5,000", "12,000", "9,000"]
        ];
        const topRow = instance.handsontableData[0]
        expect(instance.calculateNumberOfHeaderColumnsRequired(topRow)).toEqual(1)
        expect(instance.calculateNumberOfHeaderRowsRequired(instance.handsontableData)).toEqual(2)
    })

    it('passes validation with a table with three headers related to each data cell', () => {
        const instance = gridcontainerWrapper.instance()
        instance.handsontableData = 
            [
                ["", "Studio", "Apt", "Chalet", "Villa"], 
                ["Paris", "", "", "", ""], // merged cells
                ["1 Bed", "10", "3", "3", "4"],
                ["2 Bed", "10", "3", "3", "4"],
                ["Rome", "", "", "", ""], // merged cells
                ["1 Bed", "10", "3", "3", "4"],
                ["2 Bed", "10", "3", "3", "4"]
            ]
        const topRow = instance.handsontableData[0]
        expect(instance.calculateNumberOfHeaderColumnsRequired(topRow)).toEqual(1)
        expect(instance.calculateNumberOfHeaderRowsRequired(instance.handsontableData)).toEqual(1)
    })

    



    // it('Meta Data sets state in parent', () => {
       
    //     const form =  metawrapper.find('#metaTitle');
    //     form.props().onChange({target: {
    //         name: 'metaTitle',
    //         value: 'xx'
    //     }});
           
    //     // then
    //     expect(gridcontainerWrapper.state('metaTitle')).toEqual('xx');
    // });


  

    // it('Testing add Num', () => {
    //     //
    //     // then
    //     expect( gridcontainerWrapper.instance().addNum(5)).toBe(10)
    // });





  



});



// works - test('adds 1 + 2 to equal 3', () => {
//     const gridcon = shallow(<GridContainer/>);
//     expect( gridcon.instance().addNum(5)).toBe(10)
// })





// A simple example test
// describe('#postPreviewDat() using Promises', () => {
//     let wrapper;

//     beforeEach(() => {
//         wrapper = shallow(<GridContainer />);
//     });

//     it('should load user data', () => {
//         return wrapper.postPreviewData('vnglst')
//             .then(data => {
//                 expect(data).toBeDefined()
//                 expect(data.entity.name).toEqual('xxx')
//             })
//     })
// })


