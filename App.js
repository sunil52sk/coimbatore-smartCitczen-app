import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './Navbar';
import Home from './Home';
// import Home from './Home';
import SpotDetail from './SpotDetail';
// import Bio from './Bio';
// import Skills from './Skills';
// import AboutProject from './AboutProject';
// import Project from './Project';
// import ProjectWorking from './ProjectWorking';
// import Contact from './Contact';
// import Portfolio from './Portfolio';
// import ProjectDetails from './ProjectDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/spot" element={<SpotDetail />} />
            
        
          {/* <Route path="/bio" element={<Bio />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/aboutproject" element={<AboutProject />} />
          <Route path="/project" element={<Project />} />
          <Route path="/projectworking" element={<ProjectWorking />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} /> */}
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
