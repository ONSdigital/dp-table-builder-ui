import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HotTable from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-horizon.css';

class Grid extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      
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
            afterOnCellMouseOver: (event, coords) => {
                this.updateCellMouseOver(coords);
            },

        });
    }

    shouldComponentUpdate(nextProps) {        
        let shouldUpdate = this.props.handsontableData != nextProps.handsontableData
                        || this.props.formHide!=nextProps.formHide 
                        || this.props.showGridHeaderCols!=nextProps.showGridHeaderCols
                        || this.props.showGridHeaderRows!=nextProps.showGridHeaderRows

        return shouldUpdate;
    }

    componentWillUpdate() {
    }

    componentDidUpdate(prevProps){
        // re-render hot after expand/collapse of meta
        if (this.props.formHide!=prevProps.formHide) this.callHotRender();
    }

    // contentHasChanged marks the state as dirty
    contentHasChanged() {
        this.props.setDataDirty(true);
    }

    // getTableMarkup returns the outerHTML of the table, along with details of the size of the table
    getTableMarkup() {
        const Hot = this.tableRef.hotInstance;
        const table = Hot.table;
        let tableJsonOutput = {};
        tableJsonOutput['table_html'] = table.outerHTML;
        // as the handsontable headers aren't part of the output, subtract their size from the table size
        const firstRow = table.getElementsByTagName("tr")[0];
        const columns = firstRow.getElementsByTagName("th");
        tableJsonOutput['current_table_width'] = table.clientWidth - columns[0].clientWidth
        tableJsonOutput['current_table_height'] = table.clientHeight - firstRow.clientHeight
        tableJsonOutput['single_em_height'] = document.getElementById("emHeight").clientHeight;
        // remember the grid column widths - ignoring the handsontable header in the first column
        tableJsonOutput['grid_column_widths'] = Array.from(columns).map(function(col){return col.clientWidth;}).slice(1);
        this.props.updateUserTableData(tableJsonOutput); 
        return tableJsonOutput;
    }

    updateCellMouseOver(coords) {
        this.props.cellMove(coords);
    }

    // to help render when conditionally styling in grid for header/ cols 
    callHotRender(){
        const Hot = this.tableRef.hotInstance;
        Hot.render();
    }

    render() {
        let classes="grid ht-theme-horizon";
        if (this.props.formHide==true) classes+=" gridExpandFull"; else classes+=" gridExpandNormal"
        const emHeightStyle = { visibility: "hidden", display: 'inline-block', fontSize: '1em', margin: 0, padding: 0, height: 'auto', lineHeight: 1, border: 0 };
        return (
            <div className={classes}>
                <HotTable
                    root="hot"
                    renderAllRows="true"
                    renderAllColumns="true"
                    data={this.props.handsontableData}
                    contextMenu = {['row_above', 'row_below','---------','col_left','col_right','---------', 'remove_row','remove_col','---------','undo','redo','---------','alignment','---------','mergeCells','---------','copy','cut',"(Use 'ctrl+v' to paste)"]}
                    colHeaders={true} // this should be the same as ignore_first_row 
                    rowHeaders={true} // this should be the same as ignore_first_column 
                    manualColumnResize={true}
                    manualRowResize={false}
                    colWidths={this.props.colWidths}
                    mergeCells={this.props.mergeCells}
                    cell={this.props.cellAlignments}
                    ref={(c) => { this.tableRef = c; }}
                    cells= { (row, col)=> {
                        const cellProperties = {};
                        const rowHeader=this.props.showGridHeaderRows || -1 
                        const colHeader=this.props.showGridHeaderCols || -1 
                    
                        if ((col <= colHeader-1) || (row <= rowHeader-1))  {
                            cellProperties.renderer =  function(instance, td) {
                                Handsontable.renderers.HtmlRenderer.apply(this, arguments);
                                td.style.fontWeight = 'bold';         
                            }
                        }
                        else  {
                            cellProperties.renderer =  function(instance, td) {
                                Handsontable.renderers.HtmlRenderer.apply(this, arguments);
                                td.style.fontWeight = 'normal';                
                            }
                        }

                        return cellProperties;
                    }}
                />
                <div style={emHeightStyle} id="emHeight">m</div>
            </div>
        )
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
    setDataDirty:PropTypes.func,
    formHide:PropTypes.bool,
    showGridHeaderCols:PropTypes.number,
    showGridHeaderRows:PropTypes.number
}

export default Grid;
