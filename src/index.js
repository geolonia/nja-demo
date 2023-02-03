import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container mt-4">
      <h1>住所正規化デモ</h1>
    </div>
    <App />
    <div 
      className="container" 
      style={{"marginTop": "80px", "borderTop": "3px solid #dedede", "padding": "8px"}}
    >
      <p style={{"textAlign": "center"}}>By <a href="https://github.com/geolonia/normalize-japanese-addresses">@geolonia/normalize-japanese-addresses</a></p>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
