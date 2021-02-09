import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Loading extends React.Component {
  render() {
    return <div className="lds-dual-ring"></div>
  }
}

class Currencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currencyList: [],
      history: []
    }
    this.fetchCurrency = this.fetchCurrency.bind(this);

    
  }

  fetchCurrency() {
    this.setState({
      loading: true
    })
    fetch('https://api.ifcityevent.com/currency')
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          currencyList: resp,
          loading: false,
          history: [...this.state.history, <p>{resp.rateBuy}</p>]
        });
      });
  }

  componentDidMount() {
    this.fetchCurrency();

    setInterval(
      () => this.fetchCurrency(),
      30000
    );
  }


  render() {
    return (
      <div>
        {this.state.loading ? <Loading /> : null}
        <p>{this.state.currencyList.name} - {this.state.currencyList.rateBuy}</p>
        <p>History</p>
        <div>{this.state.history}</div>
        <button onClick={this.fetchCurrency}>Оновити</button>
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <Currencies />
  </div>,
  document.getElementById('root')
);
{}