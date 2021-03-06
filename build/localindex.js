import React from 'react';
import ReactDOM from 'react-dom';
import GridContainer from '../src/components/gridContainer';





const onError = function(msg) {
    alert(msg);
}

function onSave(result) {
    console.log("onSave invoked. result=" + JSON.stringify(result));
}
function onCancel() {
    console.log("onCancel invoked.");
}



ReactDOM.render(
    <div className="builder__inner" id="example-component">
        <GridContainer onCancel={onCancel} onSave={onSave} onError={onError} data={{}} />
    </div>, 
    document.getElementById('app'));

