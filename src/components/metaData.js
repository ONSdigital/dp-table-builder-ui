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
                <p>
                    <div>
                        <label>Title:</label>
                        <input value={this.props.metaTitle} id='metaTitle' placeholder='Title' onChange={this.getMetaContent.bind(this)} />
                    </div>
                    <div>
                        <label >Subtitle:</label>
                        <input value={this.props.metaSubtitle} id='metaSubtitle' placeholder='Subtitle' onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>

                    <div>
                        <label >Units:</label>
                        <input value={this.props.metaUnits} id='metaUnits' placeholder='Units' onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>

                    <div>
                        <label >Source:</label>
                        <input value={this.props.metaSource} id='metaSource' placeholder='Source' onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>

                    <div>
                        <label >Notess:</label>
                        <textarea value={this.props.metaNotes} id='metaNotes' placeholder="Notes" onChange={this.getMetaContent.bind(this)} /> <br />
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
                        <input value={this.props.metaHeadercols} id='metaHeadercols' placeholder='Header columns' type="number" min="0" max="999" onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>
                    <div>
                        <label >Header Rows:</label>
                        <input value={this.props.metaHeaderrows} id='metaHeaderrows' placeholder='Header rows' type="number" min="0" max="999" onChange={this.getMetaContent.bind(this)} /> <br />
                    </div>

                </p>
            </div>
        );
    }
}


export default MetaData;