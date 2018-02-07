import React  from 'react';
import ReactDOM from 'react-dom';
import GridContainer from './components/gridContainer';

import  "./assets/scss/main.scss";
//import css from './styles/style.css';


// module.exports = {
//     GridContainer,
// };

ReactDOM.render(
    <div>
        {/* <GridContainer  data={{"title":"this is the title","subtitle":"subtitle","source":"ons","type":"table","type_version":"2","filename":"abc1234","row_formats":[{"row":0,"heading":true}],"column_formats":[{"col":0,"heading":true,"width":"14.94em"},{"col":1,"align":"Center","width":"9.88em"},{"col":2,"width":"9.88em"},{"col":3,"width":"9.88em"}],"cell_formats":[{"row":1,"col":2,"align":"Right"},{"row":2,"col":3,"align":"Center"}],"data":[["","CPIH","CPI","OOH"],["Nov 2007","2.2","2.1","2.6"],["Dec 2007","2.3","2.1","2.8"],["Jan 2008","2.4","2.2","2.8"],["Feb 2008","2.6","2.5","2.8"],["Mar 2008","2.6","2.5","2.7"],["Apr 2008","3.0","3.0","2.8"],["May 2008","3.3","3.3","2.8"],["Jun 2008","3.7","3.8","2.7"],["Jul 2008","4.2","4.4","2.7"],["Aug 2008","4.4","4.7","2.5"],["Sep 2008","4.8","5.2","2.6"],["Oct 2008","4.2","4.5","2.6"]],"footnotes":["a","b","c"],"current_table_width":764,"current_table_height":326,"single_em_height":16,"cell_size_units":"em"}} />
      */}
        <GridContainer data={{}} />
    </div>
    ,
    document.getElementById('app')
);


//module.hot.accept();