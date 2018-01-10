import React from 'react';

class MetaDataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { testCount: 0 };
    }


    render() {
        return (
            <div className='metaContainer'>
                <h2>Meta Data</h2>
                <p>
                    <input placeholder="Title" /> <br />
                    <input placeholder="Subtitle" /> <br />
                    <input placeholder="Units" /> <br />
                    <input placeholder="Source" /> <br />
                    <input placeholder="Notes" /> <br />
                </p>

            </div>
        );
    }

}

export default MetaDataComponent;