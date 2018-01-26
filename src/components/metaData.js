import React, { Component } from 'react';

class MetaData extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.getMetaContent = this.getMetaContent.bind(this);
    }


    getMetaContent(event) {
        var key = event.target.id
        var val = event.target.value
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
                        <input value={this.props.metaTitle} id='metaTitle' onChange={this.getMetaContent.bind(this)} />
                    </div>
                    <div className="block">
                        <label >Subtitle:</label>
                        <input value={this.props.metaSubtitle} id='metaSubtitle' onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>

                    <div className="block">
                        <label >Units:</label>
                        <input value={this.props.metaUnits} id='metaUnits'  onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>

                    <div className="block">
                        <label >Source:</label>
                        <input value={this.props.metaSource} id='metaSource'  onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>

                    <div className="block">
                        <label >Notes:</label>
                        <textarea value={this.props.metaNotes} id='metaNotes'  onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>

                    <div>
                        <label >Cell size :</label>
                        <select id="metaSizeunits" value={this.props.metaSizeunits} onChange={this.getMetaContent}>
                            <option value="auto">auto</option>
                            <option value="%">percent %</option>
                            <option value="em">css em</option>

                        </select></div>


                    <div>
                        <label >Header Cols:</label>
                        <input value={this.props.metaHeadercols} id='metaHeadercols'  type="number" min="0" max="999" onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>
                    <div>
                        <label >Header Rows:</label>
                        <input value={this.props.metaHeaderrows} id='metaHeaderrows'  type="number" min="0" max="999" onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>

               
            </div>
        );
    }
}


export default MetaData;