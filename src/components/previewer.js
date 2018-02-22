import React, { Component } from 'react';
import PropTypes from 'prop-types';



class Previewer extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

   
  

    render() {
        return (
         
            <div className="previewhtml" dangerouslySetInnerHTML={{ __html: this.props.previewHtml }}></div>
          
        );
    }
}



Previewer.propTypes = {
    previewHtml: PropTypes.string   
}


export default Previewer