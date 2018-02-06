import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HotTable from 'react-handsontable';


class Grid extends Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        console.log('did mount');
    }

    componentDidMount() {

        let Hot = this.tableRef.hotInstance;
        Hot.updateSettings({
            afterChange: () => {
                this.updateDataDump()
            },
            afterColumnMove: () => {
                this.updateDataDump()
            },
            afterRemoveRow: () => {
                this.updateDataDump()
            },
            afterRemoveCol: () => {
                this.updateDataDump()
            },
            modifyColWidth: () => {
                this.updateDataDump()
            },
            afterOnCellMouseOver: (event, coords, tableData) => {
                //console.log(tableData);
                this.updateCellMouseOver(coords);
            },

        });
    }






    shouldComponentUpdate() {
        //nextProps, nextState
    // console.log(' shouldComponentUpdate in GRID nextProps...');
        return false;
    }


    componentWillUpdate() {
    //return false;
    }


    updateDataDump() {
    //console.log('update event is fired');
        const Hot = this.tableRef.hotInstance;
        const table = Hot.table;
        // console.log(table);
        let tableJsonOutput = [];
        tableJsonOutput = { 'filename': 'abc1234' };
        tableJsonOutput['table_html'] = table.outerHTML;
        tableJsonOutput['current_table_width'] = table.clientWidth
        tableJsonOutput['current_table_height'] = table.clientHeight
        tableJsonOutput['single_em_height'] = document.getElementById("emHeight").clientHeight;
        this.props.updateUserTableData(tableJsonOutput);
    }


    updateCellMouseOver(coords) {
        this.props.cellMove(coords);

    }




    render() {

        const emHeightStyle = { visibility: "hidden", display: 'inline-block', fontSize: '1em', margin: 0, padding: 0, height: 'auto', lineHeight: 1, border: 0 };
        return <div className='grid'>
            <HotTable
                root="hot"
                stretchH="all"
                renderAllRows="true"
                renderAllColumns="true"
                height="350"
                data={this.props.handsontableData}
                contextMenu={true}
                colHeaders={true} // this should be the same as ignore_first_row 
                rowHeaders={true} // this should be the same as ignore_first_column 
                manualColumnResize={true}
                manualRowResize={false}
                colWidths={this.props.colWidths}
                mergeCells={this.props.mergeCells}
                cell={this.props.cellAlignments}
                ref={(c) => { this.tableRef = c; }}
            />
            <div style={emHeightStyle} id="emHeight">m</div>
        </div>;
    }
}


Grid.propTypes = {
    colWidths: PropTypes.array,
    mergeCells: PropTypes.array,
    cellAlignments:PropTypes.array,
    handsontableData:PropTypes.array,
    tableData:PropTypes.array,
    cellMove:PropTypes.func,
    updateUserTableData:PropTypes.func
}

export default Grid;