import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';



class Grid extends Component {
    constructor(props) {
        super(props);
        Handsontable.renderers.registerRenderer('firstRowRenderer',this.firstRowRenderer);
    }


    componentWillMount() {
        console.log('did mount');
    }

    componentDidMount() {
        let Hot = this.tableRef.hotInstance;
        Hot.updateSettings({
            afterChange: () => {
                this.contentHasChanged();              
            },
            afterColumnMove: () => {
                this.contentHasChanged();              
            },
            afterRemoveRow: () => {
                this.contentHasChanged();              
            },
            afterRemoveCol: () => {
                this.contentHasChanged();              
            },
            afterCreateCol: () => {
                this.contentHasChanged();              
            },
            afterCreateRow: () => {
                this.contentHasChanged();              
            },
            beforeCellAlignment: () => {
                this.contentHasChanged();              
            },
            afterColumnResize: () => {
                this.contentHasChanged();              
            },
            afterOnCellMouseOver: (event, coords, tableData) => {
                this.updateCellMouseOver(coords);
            },

        });
    }

    // contentHasChanged marks the state as dirty
    contentHasChanged() {
        this.props.setDataDirty(true);
    }

    shouldComponentUpdate(nextProps, nextState) {
        //nextProps, nextState
        // console.log(' shouldComponentUpdate in GRID nextProps...');
        //console.log(this.props.handsontableData);
        //console.log(nextProps.handsontableData);
        // console.log(nextProps);
        let dataDiff = this.props.handsontableData == nextProps.handsontableData;
        if (dataDiff) return false; else return true;
    }


    componentWillUpdate() {
    //return false;
    }


    // getTableMarkup returns the outerHTML of the table, along with details of the size of the table
    getTableMarkup() {
        const Hot = this.tableRef.hotInstance;
        const table = Hot.table;
        let tableJsonOutput = {};
        tableJsonOutput['table_html'] = table.outerHTML;
        // as the handsontable headers aren't part of the output, subtract their size from the table size
        tableJsonOutput['current_table_width'] = table.clientWidth - table.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].clientWidth
        tableJsonOutput['current_table_height'] = table.clientHeight - table.getElementsByTagName("tr")[0].clientHeight
        tableJsonOutput['single_em_height'] = document.getElementById("emHeight").clientHeight;
        this.props.updateUserTableData(tableJsonOutput); 
        return tableJsonOutput;
    }


    updateCellMouseOver(coords) {
        this.props.cellMove(coords);
    }




    render() {

        const emHeightStyle = { visibility: "hidden", display: 'inline-block', fontSize: '1em', margin: 0, padding: 0, height: 'auto', lineHeight: 1, border: 0 };
        return <div className='grid'>
            <HotTable
                root="hot"
                renderAllRows="true"
                renderAllColumns="true"
                data={this.props.handsontableData}
                contextMenu = {['row_above', 'row_below','---------','col_left','col_right','---------', 'remove_row','remove_col','---------','undo','redo','---------','alignment','---------','mergeCells','---------','copy','cut']}
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
    updateUserTableData:PropTypes.func,
    setDataDirty:PropTypes.func
}

export default Grid;