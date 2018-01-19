import React from 'react';

class MetaDataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    getMetaContent(event) {
        var key = event.target.id
        var val = event.target.value
        var obj = {}
        obj[key] = val;
        console.log(obj);
        this.props.callback(obj);
    }

    render() {
        return (
            <div className='metaContainer'>
                <h2>Meta Data</h2>
                <p>
                    <input value={this.props.metaTitle} id='metaTitle' placeholder='Title' onChange={this.getMetaContent.bind(this)} />
                    <input value={this.props.metaSubtitle} id='metaSubtitle' placeholder='Subtitle' onChange={this.getMetaContent.bind(this)}/> <br />
                    <input value={this.props.metaUnits} id='metaUnits' placeholder='Units' onChange={this.getMetaContent.bind(this)} /> <br />
                    <input value={this.props.metaSource} id='metaSource' placeholder='Source' onChange={this.getMetaContent.bind(this)} /> <br />
                    {/* <input value={this.props.metaNotes} id='metaNotes'  placeholder='Notes' onChange={this.getMetaContent.bind(this)} /> <br /> */}
                    <textarea value={this.props.metaNotes} id='metaNotes'  placeholder="Notes" onChange={this.getMetaContent.bind(this)} /> <br />
                </p>

            </div>
        );
    }

}

export default MetaDataComponent;