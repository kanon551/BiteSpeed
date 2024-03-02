import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Layout from './utils/Layout';
import { FlowProvider } from './utils/FlowProvider';


const App = () => {
  return (
    <div>
      <Router>
        <FlowProvider>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
            </Routes>
        </FlowProvider>
      </Router>
    </div>
  )
}
export default App