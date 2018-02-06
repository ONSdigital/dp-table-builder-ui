import React, { Component } from 'react';
import PropTypes from 'prop-types';



class MetaData extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.getMetaContent = this.getMetaContent.bind(this);
    }

   

    getMetaContent(event) {
        const key = event.target.id
        const val = event.target.value
        var obj = {}
        obj[key] = val;
        console.log(obj);
        this.props.setMetaData(obj);
    }

    render() {
        return (
            <div className='metaContainer'>
                <h2>Meta Data</h2>
              
                <div className="block">
                    <label>Title:</label>
                    <input   value={this.props.metaTitle} id='metaTitle' onChange={this.getMetaContent} />
                </div>
                <div className="block">
                    <label >Subtitle:</label>
                    <input   value={this.props.metaSubtitle} id='metaSubtitle' onChange={this.getMetaContent} /> <br />
                </div>

                {/* <div className="block">
                    <label >Units:</label>
                    <input  value={this.props.metaUnits} id='metaUnits'  onChange={this.getMetaContent} /> <br />
                </div> */}

                <div className="block">
                    <label >Source:</label>
                    <input  value={this.props.metaSource} id='metaSource'  onChange={this.getMetaContent} /> <br />
                </div>

                <div className="block">
                    <label >Notes:</label>
                    <textarea value={this.props.metaNotes} id='metaNotes'  onChange={this.getMetaContent} /> <br />
                </div>

                <div>
                    <label >Cell size :</label>
                    <select id="metaSizeunits" value={this.props.metaSizeunits} onChange={this.getMetaContent}>
                        <option value="auto">auto</option>
                        <option value="%">percent %</option>
                        <option value="em">css em</option>

                    </select>
                           
                </div>

                <div>
                    <label >Auto-size headers :</label>
                    <select id="metaKeepHeadersTogether" value={this.props.metaKeepHeadersTogether} onChange={this.getMetaContent}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div>
                    <label >Header Cols:</label>
                    <input   className="sml" value={this.props.metaHeadercols} id='metaHeadercols'  type="number" min="0" max="999" onChange={this.getMetaContent} /> <br />
                </div>
                <div>
                    <label >Header Rows:</label>
                    <input  className="sml" value={this.props.metaHeaderrows} id='metaHeaderrows'  type="number" min="0" max="999" onChange={this.getMetaContent} /> <br />
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
    metaHeadercols: PropTypes.string,
    metaHeaderrows: PropTypes.string,
    metaNotes: PropTypes.string,
    setMetaData:PropTypes.func,
    metaKeepHeadersTogether: PropTypes.string
   
};


// MetaData.defaultProps = {
//     metaHeadercols: '0'
// };


export default MetaData;