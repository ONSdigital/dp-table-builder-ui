import React  from 'react';
import ReactDOM from 'react-dom';
import GridContainer from './components/gridContainer';

import  "./assets/scss/main.scss";
//import css from './styles/style.css';

module.exports = {
    GridContainer,
};

ReactDOM.render(
    <div>
        <GridContainer preLoadData="123" />
    </div>
    ,
    document.getElementById('app')
);


//module.hot.accept();