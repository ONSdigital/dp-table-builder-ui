import React from 'react';
import ReactDOM from 'react-dom';
import TestComponent from './TestComponent.jsx';
import GridComponent from './components/gridComponent';
import MetaDataComponent from './components/metaDataComponent'



ReactDOM.render(
  <div>
  <div>
    <MetaDataComponent />
    <GridComponent />
  </div>
  <div className="statusBar" ><button>save</button> &nbsp;<button>load</button> &nbsp;<button>cancel</button></div>
  </div>
  ,
  document.getElementById('app')
);




// class AppComponent extends React.Component {


//   render() {
//     return (
//       <div className='metaContainer'>
//       <h2>Meta Data</h2>
//       <p>
//        <input placeholder="Title"/> <br/>
//        <input placeholder="Subtitle"/> <br/>
//        <input placeholder="Units"/> <br/>
//        <input placeholder="Source"/> <br/>
//        <input placeholder="Notes"/> <br/>
//        </p>
       
//       </div>
//     );
//   }

// }

// export default AppComponent;


module.hot.accept();