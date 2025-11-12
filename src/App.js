import './App.css'
import {Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Popular from './pages/Popular'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import SearchResults from './pages/SearchResults'
import MovieDetails from './components/MovieDetails'

const App = () => (
  <div className="app">
    <Navbar />
    <Switch>
      <Route exact path="/" component={Popular} />
      <Route path="/top-rated" component={TopRated} />
      <Route path="/upcoming" component={Upcoming} />
      <Route path="/search" component={SearchResults} />
      <Route path="/movie/:id" component={MovieDetails} />
    </Switch>
  </div>
)

export default App
