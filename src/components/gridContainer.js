import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import GridComponent from './grid';
import MetaDataComponent from './metaData';



const previewURi = 'http://localhost:23100/parse/html';
const ignore_first_row=true;
const ignore_first_column=true;
const ignore_column_width="50px"


class ParentContainer extends Component {


  // rawData: initial data from handsontable output
  // parseData: output from parse endpoint
  // previewHtml: output from parse endpoint

  constructor(props) {
    super(props);

    this.state = {
      view: 'handsontable',
      handsontableData: [
        ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"],
        ["2016", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24],
        ["2017", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24],
        ["2018", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24],
        ["2019", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24],
        ["2020", 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24]
      ],
      previewHtml: '',
      parsedData: '',
      rawData:'',
      metaTitle: '',
      metaSubtitle: '',
      metaUnits: '',
      metaSource: '',
      metaNotes: ''

    };

  }



  changeView(viewType) {
    this.setState({
      view: viewType
    })
  }


  setMetaData(metaObject) {
    this.setState(metaObject);
  }



  saveGrid(event) {
    console.log(this.state.saveData);
    console.log('saved');
  }


  loadGrid(event) {
    console.log('load');
  }



processHandsontableData(data) {
console.log('@@@@pre-process');

data["footnotes"] = this.addFootNotes();
data["title"] = this.state.metaTitle;
data["subtitle"] = this.state.metaSubtitle;
data["source"] = this.state.metaSource;
data["units"] = this.state.metaUnits;
data["ignore_first_row"]= ignore_first_row;
data["ignore_first_column"]=ignore_first_column;
data["column_width_to_ignore"]=ignore_column_width;
data["header_rows"]=1;
data["header_cols"]=1;
data["size_units"]="%";
data["alignment_classes"] = {
  "top": "htTop",
  "middle": "htMiddle",
  "bottom": "htBottom",
  "left": "htLeft",
  "center": "htCenter",
  "right": "htRight"
}


console.log(data);
  this.postPreviewData(data);
}



addFootNotes() {
  let notelist = this.state.metaNotes.split( "\n" );
  return notelist;
}


addRowformats() {
//return [{}]
}

addColumnFormat() {

}

addCellformat() {

}

  postPreviewData(dta) {
    console.log('dta in');
    console.log(dta)
    fetch(previewURi, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dta)
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log('returned...', data);
        this.setState({
          previewHtml: data.preview_html,
          parsedData: data
        })
        this.changeView('preview');
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    if (this.state.view === 'handsontable') {
      return (
        <div>
          <MetaDataComponent
            callback={this.setMetaData.bind(this)}
            metaTitle={this.state.metaTitle}
            metaSubtitle={this.state.metaSubtitle}
            metaUnits={this.state.metaUnits}
            metaSource={this.state.metaSource}
            metaNotes={this.state.metaNotes}
          />
          <GridComponent
            handsontableData={this.state.handsontableData}
            view={this.changeView.bind(this)}
            previewPostData={this.processHandsontableData.bind(this)}
          />&nbsp;
        <div className="statusBar" >
            <button onClick={(e) => this.saveGrid(e)} >save</button>&nbsp;
        <button onClick={(e) => this.loadGrid(e)}>load</button> &nbsp;
        <button>cancel</button>{this.state.metaTitle}</div>
        </div>
      )
    }



    if (this.state.view === 'preview') {
      return (
        <div>
          <h1>this is preview</h1>
          <div dangerouslySetInnerHTML={{ __html: this.state.previewHtml }}></div>
          <br />
          <button onClick={(e) => this.changeView('handsontable')}>back</button> &nbsp;
      </div>
      )
    }

  }

}


export default ParentContainer;

