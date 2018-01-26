import React, { Component } from 'react';
import HotTable from 'react-handsontable';


class GridComponent extends Component {

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

    });


  }


  shouldComponentUpdate(nextProps, nextState) {
    console.log(' shouldComponentUpdate in GRID nextProps...');
    console.log(nextProps);
    return false;
  }


  componentWillUpdate() {
    //return false;
  }


  updateDataDump() {
    //console.log('update event is fired');
    //console.log(this);
    var Hot = this.tableRef.hotInstance;
    var table = Hot.table;
    // console.log(table);
    var tableJsonOutput = [];
    tableJsonOutput = { 'filename': 'abc1234' };
    tableJsonOutput['table_html'] = table.outerHTML;
    tableJsonOutput['current_table_width'] = table.clientWidth
    tableJsonOutput['current_table_height'] = table.clientHeight
    tableJsonOutput['single_em_height'] = document.getElementById("emHeight").clientHeight;
    this.props.updateUserTableData(tableJsonOutput);
  }




  // handleChange(event) {
  //   var Hot = this.tableRef.hotInstance;
  //   console.log(Hot);
  //   var table = Hot.table;
  //   console.log(table);

  //   //init
  //   var tableJsonOutput = { 'filename': 'abc1234' };
  //   tableJsonOutput['table_html'] = table.outerHTML;
  //   tableJsonOutput['current_table_width'] = table.clientWidth
  //   tableJsonOutput['current_table_height'] = table.clientHeight
  //   tableJsonOutput['single_em_height'] = document.getElementById("emHeight").clientHeight
  //   console.log(table.clientWidth);
  //   console.log(table.clientHeight);
  //   console.log(document.getElementById("emHeight").clientHeight);
  //   this.props.previewPostData(tableJsonOutput);
  // }





  render() {

    var emHeightStyle = { visibility: "hidden", display: 'inline-block', fontSize: '1em', margin: 0, padding: 0, height: 'auto', lineHeight: 1, border: 0 };
    return <div className='gridContainer'>
      <HotTable
        root="hot"
        stretchH="all"
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

export default GridComponent;