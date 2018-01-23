import React from 'react';
import HotTable from 'react-handsontable';


//var hot=null;

class GridComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { testCount: 0 };
    this.myRef;
  }



  handleChange(event) {

    var Hot = this.tableRef.hotInstance;
    console.log(Hot);
    //  var table = Hot.getElementsByTagName('table')[0];
    var table = Hot.table;
    console.log(table);



    //init
    var tableJsonOutput = { 'filename': 'abc1234' };

    //tableJsonOutput['data']= this.refs.hot.hotInstance.getData();
    tableJsonOutput['table_html'] = table.outerHTML;

    //console.log(JSON.stringify(tableJsonOutput));
    this.props.previewPostData(tableJsonOutput);
  }

  render() {

    //this.myRef = "Hot"; //(el) => this.btnRef = el;
    return <div className='gridContainer'>
      <HotTable
        root="hot"
        data={this.props.handsontableData}
        contextMenu={true}
        colHeaders={true} // this should be the same as ignore_first_row 
        rowHeaders={true} // this should be the same as ignore_first_column 
        mergeCells={true}
        manualColumnResize={true}
        manualRowResize={false}
        ref={(c) => { this.tableRef = c; }}
      /><br />
      <button onClick={(e) => this.handleChange(e)}>preview</button>
    </div>;

  }
}

export default GridComponent;