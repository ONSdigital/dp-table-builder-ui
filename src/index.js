import React  from 'react';
import ReactDOM from 'react-dom';
import GridContainer from './components/gridContainer';

import  "./assets/scss/main.scss";
//import css from './styles/style.css';

ReactDOM.render(
    <div>
        <GridContainer/>
    </div>
    ,
    document.getElementById('app')
);


//module.hot.accept();