import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GridContainer from '../../dist';

function onSave(result) {
    console.log("onSave invoked. result=" + JSON.stringify(result));
}
function onCancel() {
    console.log("onCancel invoked.");
}

ReactDOM.render(
<div id="example-component">
<GridContainer data={{}} onSave={onSave} onCancel={onCancel} />
</div>, 
document.getElementById('app'));
