import React, { Component } from 'react';

import Grid from './grid';
import MetaData from './metaData';

import FileSaver from 'file-saver';
import DataService from '../utility/dataService';


// const previewURi = 'http://localhost:23100/parse/html';
// const renderPrefix = 'http://localhost:23100/render/';
const defaultRendererUri = 'http://localhost:23300';

const ignore_first_row = true;
const ignore_first_column = true;

class GridContainer extends Component {


    // rawData: initial data from handsontable output
    // parseData: output from parse endpoint
    // previewHtml: output from parse endpoint

    constructor(props) {
        super(props);

        // props.data holds the json used to define the table.
        // props.onSave holds the function that should be invoked to save the json
        // props.onCancel holds the function that should be invoked if the cancel button is clicked
        // props.rendererUri holds the uri of the renderer


        this.state = {
            view: 'editTable',
            rendererUri: props.rendererUri ? props.rendererUri : defaultRendererUri,
            tableJsonOutput: [],
            handsontableData: [["","",""], ["","",""]],
            previewHtml: '',
            parsedData: '',
            rawData: '',
            metaTitle: '',
            metaSubtitle: '',
            metaUnits: '',
            metaSource: '',
            metaNotes: '',
            metaSizeunits: '',
            metaHeadercols: '',
            metaHeaderrows: '',
            colWidths: [],
            mergeCells: [],
            cellAlignments: [],
            colrowStatus: {}
        };

        //callback handlers
        this.setMetaDataCallbk = this.setMetaData.bind(this);
        this.changeview = this.changeView.bind(this);
        this.previewPostData = this.processHandsontableData.bind(this);
        this.updateUserTableData = this.updateTableJsonOutput.bind(this);
        this.cellMove = this.cellMove.bind(this);

        this.previewGrid = this.previewGrid.bind(this);
        this.rebuildGrid = this.rebuildGrid.bind(this);
        this.onBackFromPreview = this.onBackFromPreview.bind(this);
        this.saveGrid = this.saveGrid.bind(this);
        this.cancel = this.cancel.bind(this);
    
    }



    componentDidMount() {
        console.log('preLoadData');
        console.log(this.props.data);
        console.log(Object.keys(this.props.data).length === 0)

        if (!(Object.keys(this.props.data).length === 0))
        {
            this.setState({
                handsontableData: this.props.data.data
            })
            this.populateMetaForm(this.props.data);
            this.rebuildGrid(this.props.data)
        // this.changeView('editTable');
        }}




    onBackFromPreview() {
        console.log(this.state.parsedData.render_json);
        this.rebuildGrid(this.state.parsedData.render_json);
        this.changeView('editTable');
    }



    rebuildGrid(rebuildData) {
        console.log('inside rebuild');
        console.log(rebuildData);
        this.setColWidths(rebuildData);
        this.setMergeCells(rebuildData.cell_formats);
        this.setCellAlignments(rebuildData);
    }


    populateMetaForm(rebuildData){
        console.log(rebuildData);
        this.setState({
            metaTitle:rebuildData.title,
            metaSubtitle:rebuildData.subtitle,
            metaNotes: this.getFootNotes(rebuildData), //rebuildData.footnotes,
            metaSource:rebuildData.source,
            metaSizeunits: rebuildData.cell_size_units,
            metaHeadercols:  this.getHeaderColumnCount(rebuildData) || 0,
            metaHeaderrows: this.getHeaderRowCount(rebuildData) || 0
        })

    }

    changeView(viewType) {
        this.setState({
            view: viewType
        })
    }




    cellMove(cellCoord) {
        this.setState({
            colrowStatus: cellCoord
        });
    }


    setMetaData(metaObject) {
        this.setState(metaObject);
    }



    saveGrid() {
        let renderJson = this.state.parsedData.render_json;
        if (this.props.onSave) {
            this.props.onSave(renderJson);
        }
        console.log('saved ' + renderJson);
    }

    cancel() {
        console.log('cancel');
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }


    previewGrid() {
        console.log('preview grid');
        // console.log(this.state.tableJsonOutput)
        this.processHandsontableData();
    }



    updateTableJsonOutput(usertabledata) {
    // console.log('in updateTableJson - setState: tableJsonOutput: usertabledata');
    // console.log(usertabledata);
        this.setState({ tableJsonOutput: usertabledata });
    }



    // Before we post data to prevew parse endpoint 
    // we add details from meta form
    processHandsontableData() {
        console.log('@@@@pre-process');
        let data = this.state.tableJsonOutput;

        data["footnotes"] = this.addFootNotes();
        data["title"] = this.state.metaTitle;
        data["subtitle"] = this.state.metaSubtitle;
        data["source"] = this.state.metaSource;
        data["units"] = this.state.metaUnits;
        data["ignore_first_row"] = ignore_first_row;
        data["ignore_first_column"] = ignore_first_column;
        data["header_rows"] = parseInt(this.state.metaHeaderrows) || 0
        data["header_cols"] = parseInt(this.state.metaHeadercols) || 0;
        data["cell_size_units"] = this.state.metaSizeunits; 
        data["keep_headers_together"] = this.state.metaKeepHeadersTogether; 
        data["alignment_classes"] = {
            "top": "htTop",
            "middle": "htMiddle",
            "bottom": "htBottom",
            "left": "htLeft",
            "center": "htCenter",
            "right": "htRight",
            "justify": "htJustify"
        }


        console.log(data);
        this.postPreviewData(data);
    }


    addFootNotes() {
        if (this.state.metaNotes === '')
            return null
        else {
            const notelist = this.state.metaNotes.split("\n");
            return notelist;
        }
    }

    addHeaderRows() {
        const num = parseInt(this.state.metaHeaderrows) || 0;
        return num;
    }


    addHeaderCols() {
        const num = parseInt(this.state.metaHeadercols) || 0;
        return num;
    }



    // set Column widths render_json > handsontable
    setColWidths(data) {
        console.log('data in setColwidths');
        console.log(data);
        let colWidths = [];
        let emUnits = false;
        switch (data.cell_size_units) {
            case "em":
                emUnits = true;
                // deliberately falling through to next case
            case "%":
                data.column_formats.forEach((entry) => {
                    let widthVal = 50;
                    if (entry.width != null) {
                        if (emUnits) {
                            widthVal = parseFloat(entry.width.replace('em', '')) * data.single_em_height || 0;
                        } else {
                            widthVal = (parseFloat(entry.width.replace('%', '')) / 100.0) * data.current_table_width || 0;
                        }
                    }
                    colWidths.push(Math.round(widthVal));
                });
        }

        this.setState({ colWidths: colWidths });
        console.log('col widths');
        console.log(this.state.colWidths);
    }





    // MergeCells render_json > handsontable
    // filter form render_json if contains rowspan
    setMergeCells(cellformats) {
        let mergeArr = cellformats.filter((obj) => {
            return obj.hasOwnProperty("rowspan");
        });
        this.setState({ mergeCells: mergeArr });
        console.log(this.state.mergeCells);
    }




    setCellAlignments(parsedData) {
    // in  {row: 1, col: 1, align: "Left", vertical_align:"Middle"}
    // out  {row: 1, col: 1, className: "htLeft htMiddle"}
        const cellformats = parsedData.cell_formats;
        const colformats = parsedData.column_formats;
        console.log('in alignment cells');
        console.log(cellformats)

        let cellAlignments = [];
   
        cellformats.forEach((entry) => {
            if (entry.hasOwnProperty("align") || entry.hasOwnProperty("vertical_align")) {
                cellAlignments.push({ row: entry.row, col: entry.col, className: this.getMapAlignmentClass(entry) });
            }
        });

        //for entire col alignment we need to iterate over column_formats
        //that was returned from the parser and add cell alignment array per cell for col
        colformats.forEach((entry) => {
            if (entry.hasOwnProperty("align")) {
                for (let i = 0; i < parsedData.data.length; i++) { 
                    cellAlignments.push({ row: i, col: entry.col, className: this.getMapAlignmentClass(entry) });
                }
            }
        });

        this.setState({ cellAlignments: cellAlignments });
        console.log('new cellAlignment');
        console.log(this.state.cellAlignments);
    }




    getMapAlignmentClass(cellObj) {
        let className = " ";
        if (cellObj.hasOwnProperty("align")) {

            switch (cellObj.align) {
            case "Left":
                className += "htLeft ";
                break;
            case "Right":
                className += "htRight ";
                break;
            case "Center":
                className += "htCenter ";
                break;
            }


        }

        if (cellObj.hasOwnProperty("vertical_align")) {
            switch (cellObj.vertical_align) {
            case "Top":
                className += "htTop";
                break;
            case "Middle":
                className += "htMiddle";
                break;
            case "Bottom":
                className += "htBottom";
                break;
            }
        }

        return className.trim();
    }






    // extract the HeaderCol num from column_formats json
    // when loading an existing table
    getHeaderColumnCount(data) {
        const colformats = data.column_formats;
        let colCount=0;
        colformats.forEach((entry) => {
            if (entry.hasOwnProperty("heading")) {
                colCount++;
            }
        });
        return colCount;
    }
    


    // extract the HeaderRow  num from row_formats json
    // when loading an existing table
    getHeaderRowCount(data) {
        const rowformats = data.row_formats;
        let rowCount=0;
        rowformats.forEach((entry) => {
            if (entry.hasOwnProperty("heading")) {
                rowCount++;
            }
        });
        return rowCount;
    }


    
    // extract the Meta notes string from footnotes json
    // when loading an existing table
    getFootNotes(data) {
        return  data.footnotes.toString().replace(",","\n",-1);
        
    }




    postPreviewData(data) {
        console.log('data sending to parse endpoint');
        console.log(data);
        const uri = this.state.rendererUri + '/parse/html'
        const prm = DataService.tablepostPreview(data,uri)
        Promise.resolve(prm).then((previewData) => {
            /* do something with the result */
            console.log('@@@@p resolve data from parse endpoint');
            console.log(previewData)
            previewData.render_json.current_table_width = data.current_table_width;
            previewData.render_json.current_table_height = data.current_table_height;
            previewData.render_json.single_em_height = data.single_em_height;
            previewData.render_json.cell_size_units = data.cell_size_units;
            this.setState({
                previewHtml: previewData.preview_html,
                parsedData: previewData,
                view: 'preview'
            })
        })
            .catch(function (e) {
                /* error :( */
                console.log('@@@@p error',e);

            })
    }



   
    postRenderData(fileType) {
        const uri = this.state.rendererUri + "/render/" + fileType
        console.log(uri);
        const prm = DataService.tableRenderFilePreview(this.state.parsedData.render_json,uri,fileType)
        Promise.resolve(prm).then((data) => {
            /* do something with the result */
            FileSaver.saveAs(data, this.state.parsedData.render_json.filename + '.' + fileType);
        })
            .catch(function (e) {
                /* error :( */
                console.log('@@@@p error',e);

            })
    }



    render() {
        if (this.state.view === 'editTable') {
            return (
                <div className="gridContainer">
                    <MetaData
                        // setMetaDataCallbk={this.setMetaData.bind(this)}
                        setMetaData={this.setMetaDataCallbk}
                        metaTitle={this.state.metaTitle}
                        metaSubtitle={this.state.metaSubtitle}
                        metaKeepHeadersTogether={this.state.metaKeepHeadersTogether}
                        metaSource={this.state.metaSource}
                        metaNotes={this.state.metaNotes}
                        metaHeadercols={this.state.metaHeadercols}
                        metaHeaderrows={this.state.metaHeaderrows}
                        metaSizeunits={this.state.metaSizeunits}
                    />
                    <Grid
                        handsontableData={this.state.handsontableData}
                        view={this.view}
                        previewPostData={this.previewPostData}
                        updateUserTableData={this.updateUserTableData}
                        colWidths={this.state.colWidths}
                        mergeCells={this.state.mergeCells}
                        cellAlignments={this.state.cellAlignments}
                        cellMove={this.cellMove}
                    />&nbsp;<br />
                    <div className="statusBar">
                        <div className="statusBtnsGroup">
                            <button className="btn--positive" onClick={this.saveGrid} >save</button>&nbsp;
                            <button onClick={this.cancel}>cancel</button> &nbsp;
                            <button onClick={this.previewGrid}>preview html</button> &nbsp;
                        </div><div className="rowColStatus">Row:&nbsp;{this.state.colrowStatus.row}&nbsp;&nbsp;Col:&nbsp;{this.state.colrowStatus.col}</div>
                    </div>

                    {/* <h1>Current table for parsing</h1>
          <div id="debug">{JSON.stringify(this.state.tableJsonOutput)}</div>
          <h1>this is rebuild test {this.state.colWidths}</h1>
          <div>
            {JSON.stringify(this.state.parsedData.render_json)}
            <br /> <br /><h1>colWidths</h1>
            {JSON.stringify(this.state.colWidths)}
            <br /> <br /><h1>MergeCells</h1>
            {JSON.stringify(this.state.mergeCells)}
            <br /> <br /><h1>Cell:</h1>
            {JSON.stringify(this.state.cellAlignments)}
            <br/>[{this.state.metaSizeunits}]
          </div>
          <br /> */}
                </div>
            )
        }

        if (this.state.view === 'preview') {
            return (
                <div id="previewContainer" className="previewContainer">
                    <h1>preview</h1>
                    <div className="previewhtml" dangerouslySetInnerHTML={{ __html: this.state.previewHtml }}></div>
                    <br />
                    {/* <button onClick={this.rebuildGrid}>back</button> &nbsp; */}
                    <button onClick={this.onBackFromPreview}>back</button> &nbsp;
                    <button onClick={() => this.postRenderData('xlsx')}>preview xlsx</button> &nbsp;
                    <button onClick={() => this.postRenderData('csv')}>preview csv</button> &nbsp;
                </div>
            )
        }

    }

}


export default GridContainer;

