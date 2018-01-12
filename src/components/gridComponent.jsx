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
    var x = hot.innerHTML;
    var table = hot.getElementsByTagName('table')[0];
    console.log(table);
    console.log(typeof(table));


    //console.log(this.refs.hot.hotInstance.getData());
   // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

    

    //init
    var tableJsonOutput = {'filename':'abc1234'};
    var cell_formats = [];
    var column_formats =[];

    for (var r = 0, row; row = table.rows[r]; r++) {
      //iterate through rows
      // console.log('@row=' + i);
      //rows would be accessed using the "row" variable assigned in the for loop
      for (var c = 0, col; col = row.cells[c]; c++) {
        //iterate through columns
        //if col.outerHTML
        var alignClass = col.getAttribute('class');
        var rowSpan = col.getAttribute('rowSpan');
        var colSpan = col.getAttribute('colSpan');
        if (alignClass != '' || rowSpan!=undefined || colSpan!=undefined) {
          console.log('@row =' + r + ' @col=' + c + '  cls=' + alignClass + ' rowSpan=' + rowSpan + ' colSpan=' + colSpan);
          console.log('...HTML:  ' + col.outerHTML);
          cell_formats.push(this.getCellFormat(r, c, alignClass, rowSpan, colSpan))

        }
      }
    }


    // build json
    tableJsonOutput['cell_formats']= cell_formats;
    tableJsonOutput['data']= this.refs.hot.hotInstance.getData();
    tableJsonOutput['handsontable']={"table": table.outerHTML};


    console.log('-------------------');
    console.log(tableJsonOutput)
    //console.log(JSON.stringify(tableJsonOutput));

  }



  getCellFormat(rowNum, colNum, alignType, rspan, cspan) {
    var valign, halign;

    switch (alignType) {
      case 'htLeft':
        halign = 'left';
        break;
      case 'htRight':
        halign = 'right';
        break;
      case 'htCenter':
        halign = 'center';
        break;
      case 'htJustify':
        halign = 'justify';
        break;


      case 'htTop':
        valign = 'top';
        break;
      case 'htMiddle':
        valign = 'middle';
        break;
      case 'htBottom':
        valign = 'bottom';
        break;

      //left combination
      case 'htLeft htTop':
        halign = 'left';
        valign = 'top';
        break;
      case 'htLeft htMiddle':
        halign = 'left';
        valign = 'middle';
        break;
      case 'htLeft htBottom':
        halign = 'left';
        valign = 'bottom';
        break;

      //right combination
      case 'htRight htTop':
        halign = 'right';
        valign = 'top';
        break;
      case 'htRight htMiddle':
        halign = 'right';
        valign = 'middle';
        break;
      case 'htRight htBottom':
        halign = 'right';
        valign = 'bottom';
        break;

      //center combination
      case 'htCenter htTop':
        halign = 'center';
        valign = 'top';
        break;
      case 'htCenter htMiddle':
        halign = 'center';
        valign = 'middle';
        break;
      case 'htCenter htBottom':
        halign = 'center';
        valign = 'bottom';
        break;

      //justify combination
      case 'htJustify htTop':
        halign = 'justify';
        valign = 'top';
        break;
      case 'htJustify htMiddle':
        halign = 'justify';
        valign = 'middle';
        break;
      case 'htJustify htBottom':
        halign = 'justify';
        valign = 'bottom';
        break;

      default:

    }
    console.log('in method row (r) is' + rowNum)
    var cellObj = { "row": rowNum, "col": colNum, "align": halign, "vertical_align": valign, "rowspan": rspan, "colspan": cspan }
    return cellObj;
  }


  componentDidMount() {
    console.log('@component did mount');
  }

  render() {
    return <div className='gridContainer'>
      <HotTable
        root="hot"
        data={this.handsontableData}
        contextMenu={true}
        colHeaders={true}
        mergeCells={true}
        manualColumnResize={true}
        manualRowResize={true}
        ref="hot"
      />
      <button onClick={(e) => this.handleChange(e)}>test</button>
    </div>;

  }
}

export default GridComponent;