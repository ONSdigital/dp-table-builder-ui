import React  from 'react';
import ReactDOM from 'react-dom';
import GridContainer from './components/gridContainer';

import styles from "./assets/scss/main.scss";

ReactDOM.render(
  <div>
   <GridContainer/>
  </div>
  ,
  document.getElementById('app')
);



//module.hot.accept();