import React from 'react';
import HotTable from 'react-handsontable';

class GridComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { testCount: 0 };
    this.handsontableData = [
      ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"],
      ["2016", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24],
      ["2017", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24],
      ["2018", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24],
      ["2019", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24],
      ["2020", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24]
    ];
  }


  handleChange(event) {
    const targetId = event.target.id;
    console.log(hot);
    console.log(event);
  }


  render() {
    return <div className='gridContainer'>
      <HotTable
      root="hot"
        data={this.handsontableData}
        contextMenu={true}
        colHeaders={true}
      />
      <button  onClick={(e) => this.handleChange(e)}>test</button>
    </div>;

  }
}

export default GridComponent;