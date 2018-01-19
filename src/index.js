import React  from 'react';
import ReactDOM from 'react-dom';
import ParentContainer from './components/parentContainer'



ReactDOM.render(
  <div>
  <div>
   <ParentContainer/>
  </div>
  </div>
  ,
  document.getElementById('app')
);



module.hot.accept();