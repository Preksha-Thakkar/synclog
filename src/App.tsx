import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import { NotFound } from './NotFound';
import { Login } from './outer-pages/Login';
import { LayoutMenu } from './inner-pages/LayoutMenu';
import { SalesOrders } from './inner-pages/SalesOrders';
import { Dashboard } from './inner-pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LayoutMenu />}>
          <Route
            path="/sales-orders"
            element={
                <SalesOrders />
            }
          />
          <Route
          index
            element={
                <Dashboard />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/" element={<Login />} /> */}
      </Routes>
    </div>
  );
}

export default App;
