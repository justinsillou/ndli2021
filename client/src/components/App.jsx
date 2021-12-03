import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Search from './Search'
import Groups from './Groups'
import Admin from './Admin'
import Header from './Header'
import Accueil from './Accueil'
import My404Component from './Error'
import ApiContext from './ApiContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const App = () => {
  const API_URL = 'http://localhost:8000'

  return (
    <ApiContext.Provider value={API_URL}>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Accueil} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/build" component={Groups} />
            <Route exact path="/admin" component={Admin} />
            <Route path='/404' component={My404Component} />
            <Redirect from='*' to='/404' />
          </Switch>
          <ToastContainer limit={2} />
        </div>
      </Router>
    </ApiContext.Provider>
  )
}

export default App
