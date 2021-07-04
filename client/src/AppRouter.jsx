import React from 'react'
import Homepage from './pages/Homepage'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Homepage} />
      </div>
    </Router>
  );
}

export default AppRouter;
