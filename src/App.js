import React from 'react';
import './App.css';
import Starwars from './components/starwars';
import Films from './components/films';
import Navbar from './components/common/navbar';
import FilmDetail from './components/filmdetail';
import People from './components/people';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Route component={Navbar} />
      <main>
        <Switch>
          <Route exact path='/' component={Starwars} />
          <Route exact path='/films/:id' component={FilmDetail} />
          <Route path='/films' component={Films} />
          <Route path='/people' component={People} />
          <Route path='/planets' component={Films} />
          <Route path='/species' component={Films} />
          <Route path='/starships' component={Films} />
          <Route path='/vehicles' component={Films} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;