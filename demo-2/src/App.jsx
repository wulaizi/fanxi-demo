import './App.css';
import Popular from './pages/popular';
import Battle from './pages/battle';
import { Switch, Route,Redirect } from 'react-router-dom'
import Header from './component/header/header';
import Footer from './component/footer/footer';
import Result from './pages/result';
import { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSelect: 'Popular'
    }
  }
  onChangeSelect(item) {
    this.setState({
      currentSelect: item.label
    })
  }
  render() {
    return <div className="wrap">
      <Header currentSelect={this.state.currentSelect} onChange={(item) => this.onChangeSelect(item)} />
      <div className="content">
        <Switch >
          <Redirect exact path="/" to="/Popular" />
          <Route path="/Popular" component={Popular}></Route>
          <Route path="/battle" component={Battle}></Route>
          <Route exact path="/result" component={Result}></Route>
        </Switch>
      </div>
      <Footer />
    </div>

  }
}
export default App;
