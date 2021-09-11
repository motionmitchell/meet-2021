import React from 'react';
import MainView from './components/MainView';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <div className='container bg-white p-4 mt-5'>
        <h1>Events:</h1>
        <MainView />
      </div>
    </div>
  );
}

export default App;
