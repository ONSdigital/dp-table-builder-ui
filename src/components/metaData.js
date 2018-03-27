import React, { Component } from 'react';
import PropTypes from 'prop-types';



class MetaData extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            expandNotes: false,
            notesFocusflag:false};
        this.getMetaContent = this.getMetaContent.bind(this);
        this.onExpandNotes = this.onExpandNotes.bind(this);
    }

   
    componentDidUpdate() {
        if (this.state.expandNotes===true && this.state.notesFocusflag===true) {
            this.metaNotesRef.focus();
            this.setState({notesFocusflag:false})
        }
    }


    getMetaContent(event) {
        let key = event.target.id
        const val = event.target.value
       
        var obj = {}
        obj[key] = val;
        obj["isDirty"]=true;
        console.log(obj);
        this.props.setMetaData(obj);


        if (key ==='metaNotesExp') {
            this.props.setMetaData({metaNotes:val});
        }

        if (key ==='metaNotes') {
            this.props.setMetaData({metaNotesExp:val})
        }

    }


    onExpandNotes() {
       
        this.setState({
            expandNotes:!this.state.expandNotes,
            notesFocusflag:!this.state.expandNotes
        });
    }



    render() {
        const metaContainerVisibility = this.props.formHide === true? " hide": " show";
        let metaFormCls = metaContainerVisibility;
        if (this.state.expandNotes === true) metaFormCls=" hide";
              
        let tbNotesContainerCls = this.state.expandNotes === true? " show": " hide";
        if (this.props.formHide === true) tbNotesContainerCls =" hide";
        
        const metaContainerClass = `metaContainer ${metaContainerVisibility}`
        const expanderClass = `expandCollapse ${metaFormCls}`
        
        return (
            <div className={metaContainerClass} >

                <div className={expanderClass}> <a onClick={this.props.setMetaDataHide} href='#'>{this.props.formHide === true? ">": "<"}</a></div>
              
                <div id="tbNotesContainer" className={tbNotesContainerCls}>
                    <label >Notes:  <a onClick={this.onExpandNotes} href='#'>collapse</a></label>
                    <textarea  ref={(textarea) => { this.metaNotesRef = textarea; }}  value={this.props.metaNotesExp} id='metaNotesExp'  onChange={this.getMetaContent}  /> 
                </div>

                <div id="tbMetaForm" className={metaFormCls}>
              
                    <div className="title">
                        <label>Title:</label>
                        <input   value={this.props.metaTitle} id='metaTitle' onChange={this.getMetaContent} />
                    </div>
                    <div className="subtitle">
                        <label >Subtitle:</label>
                        <input   value={this.props.metaSubtitle} id='metaSubtitle' onChange={this.getMetaContent} /> <br />
                    </div>

                    <div className="source">
                        <label >Source:</label>
                        <input  value={this.props.metaSource} id='metaSource'  onChange={this.getMetaContent} /> <br />
                    </div>

                    <div className="notes">
                        <label >Notes:  <a onClick={this.onExpandNotes} href='#'>expand</a></label>
                        <textarea value={this.props.metaNotes} id='metaNotes'    onChange={this.getMetaContent} /> <br />
                    </div>

                    <div className="rows">
                        <label ># of Header Rows:</label>
                        <input  className="sml" value={this.props.metaHeaderrows} id='metaHeaderrows'  type="number" min="0" max="999"  onChange={this.getMetaContent} /> <br />
                    </div>

                    <div className="cols">
                        <label ># of Header Cols:</label>
                        <input   className="sml" value={this.props.metaHeadercols} id='metaHeadercols'  type="number" min="0" max="999" onChange={this.getMetaContent} /> <br />
                    </div>

                    <div className="sizeUnits">
                        <label title="auto: we'll do our best to keep headings on one line&#10;percent: Column width is a percentage of table width&#10;css em: Column width is relative to font size">Column size:</label>
                        <div className="select-wrap">
                            <select id="metaSizeunits" value={this.props.metaSizeunits} onChange={this.getMetaContent}>
                                <option value="auto">auto</option>
                                <option value="%">percent %</option>
                                <option value="em">css em</option>
                            </select>
                        </div>                          
                    </div>

                </div>
            </div>
        );
    }
}



MetaData.propTypes = {
    metaTitle: PropTypes.string,
    metaSubtitle: PropTypes.string,
    metaUnits: PropTypes.string,
    metaSource: PropTypes.string,
    metaSizeunits: PropTypes.string,
    metaHeadercols: PropTypes.number,
    metaHeaderrows: PropTypes.number,
    metaNotes: PropTypes.string,
    metaNotesExp: PropTypes.string,
    setMetaData:PropTypes.func,
    setMetaDataHide:PropTypes.func,
    formHide:PropTypes.bool
   
};


export default MetaData;