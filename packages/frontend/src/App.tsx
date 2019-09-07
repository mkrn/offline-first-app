import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Users from './components/Users';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Users} />
        </Switch>
      </div>
    </BrowserRouter>   
  );
}

export default App;
