import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { Table, Button, FormControl } from 'react-bootstrap';
import spinner from './spinner.gif';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
    }
    this.handleSeasonChange = this.handleSeasonChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSeasonChange(event) {
    this.setState({
      loading: true
    });
    // search for season
    axios.get('/getData?season='+event.target.value)
    .then(res => {this.setState({
      data: res.data,
      loading: false
    })
    })
    .catch(err => {console.log(err)})
  }

  handleSearchChange(event) {
    this.setState({
      loading: true
    });
    var search = event.target.value
    search = search.toLowerCase()
    axios.get('/getData')
    .then(res => {
      var data = res.data._embedded
      var resultsOfSearch = []
      for(var i=0;i<data.episodes.length;i++){
        if (data.episodes[i].name.toLowerCase().indexOf(search) != -1) {
          resultsOfSearch.push(data.episodes[i])
        }
      }
      this.setState({
        data: resultsOfSearch,
        loading: false
      })
      console.log(this.state)
    })
    .catch(err => {console.log(err)})
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Search Silicon Valley data here
        </p>
        <div className='searchBox'>
          <div className='searchTitle'>Search for an Episode</div>
          <div className='searchInput'>
            <input type='text' placeholder='Title' onChange={this.handleSearchChange}></input>
          </div>
        </div>
        <div className='searchBox'>
          <div className='searchTitle'>List episodes by Season:</div>
          <select onChange={this.handleSeasonChange}>
            <option value='1'selected>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
        </div>
        {this.state.loading ? (<img alt='' src={spinner} height="30" width="30" />) : ''}
        <div>
          {typeof this.state.data.length !== 0 ? (
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>
                    URL
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Season
                  </th>
                  <th>
                    Number
                  </th>
                  <th>
                    Airdate
                  </th>
                  <th>
                    Airtime
                  </th>
                  <th>
                    Airstamp
                  </th>
                  <th>
                    Runtime
                  </th>
                  <th>
                    Image
                  </th>
                  <th>
                    Summary
                  </th>
                  <th>
                    Links
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(element =>
                <tr>
                  <td
                    key={element}>{element.id}</td>
                  <td
                    key={element}><a href={element.url}>Click</a></td>
                  <td
                    key={element}>{element.name}</td>
                  <td
                    key={element}>{element.season}</td>
                  <td
                    key={element}>{element.number}</td>
                  <td
                    key={element}>{element.airdate}</td>
                  <td
                    key={element}>{element.airtime}</td>
                  <td
                    key={element}>{element.airstamp}</td>
                  <td
                    key={element}>{element.runtime}</td>
                  <td
                    key={element}>{<img src={element.image.medium} />}</td>
                  <td className='summary'
                    key={element}>{element.summary}</td>
                  <td
                    key={element}><a href={element._links.self.href}>Click</a></td>
                </tr>
                )}
              </tbody>
            </Table>
          ) : ''}
        </div>
      </div>
    );
  }
}

export default App;
