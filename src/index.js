
         import React from "react";
         import ReactDOM from "react-dom";
         import App from "./components/App";
         import { BrowserRouter } from 'react-router-dom';
         import ErrorBoundary from './components/ErrorBoundary';

         ReactDOM.render(
           <React.StrictMode>
             <BrowserRouter>
               <ErrorBoundary>
                 <App />
               </ErrorBoundary>
             </BrowserRouter>
           </React.StrictMode>,
           document.getElementById("root")
         );
       