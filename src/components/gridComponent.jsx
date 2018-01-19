import React from 'react';
import HotTable from 'react-handsontable';


class GridComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { testCount: 0 };
  }



  handleChange(event) {

    //console.log(hot);
    var table = hot.getElementsByTagName('table')[0];

    //init
    var tableJsonOutput = { 'filename': 'abc1234' };

    //tableJsonOutput['data']= this.refs.hot.hotInstance.getData();
    tableJsonOutput['table_html'] = table.outerHTML;

    //console.log(JSON.stringify(tableJsonOutput));
    this.props.previewPostData(tableJsonOutput);
  }


  render() {
    return <div className='gridContainer'>
      <HotTable
        root="hot"
        data={this.props.handsontableData}
        contextMenu={true}
        colHeaders={true}
        mergeCells={true}
        manualColumnResize={true}
        manualRowResize={true}
        ref="hot"
      /><br />
      <button onClick={(e) => this.handleChange(e)}>preview</button>
    </div>;

  }
}

export default GridComponent;