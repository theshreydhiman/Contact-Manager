
         import React, { Component } from 'react';

         class ErrorBoundary extends Component {
           constructor(props) {
             super(props);
             this.state = { hasError: false };
           }

           static getDerivedStateFromError(error) {
             return { hasError: true };
           }

           componentDidCatch(error, errorInfo) {
             console.error('Uncaught error:', error, errorInfo);
           }

           render() {
             if (this.state.hasError) {
               return (
                 <div>
                   <h1>Something went wrong.</h1>
                   <p>We're sorry for the inconvenience. Please try refreshing the page or contact support if the issue persists.</p>
                   <button onClick={() => window.location.reload()}>Try Again</button>
                 </div>
               );
             }

             return this.props.children;
           }
         }

         export default ErrorBoundary;
       