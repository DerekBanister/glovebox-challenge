import React from 'react';
import './App.css';
import Page from './components/Page';
import Navbar from './components/nav';
import Footer from './components/footer';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <br></br>
      <Page />
      <Footer />
    </div>
  );
}

export default App