import React, { Component } from "react";
import "./../App.css";
import {api} from "../api/data";
import axios from 'axios';
import TextField from '@material-ui/core/TextField'

class Search extends Component {
  state = {
    tenentaName: "",
    tenantStateData: "",
    showData: false,
  };

  getData = async () => {
    var tenantInfo = await axios.get(`${api.baseUrl}${api.getTenanatData(this.state.tenentaName)}`);
    console.log('tenanat data is ',tenantInfo.data);
    this.setState({
      tenantStateData: tenantInfo.data,
      showData: true
    });
  };

  clearData = async () => {
    this.setState({
      showData: false
    });
  }

  tenentChange = event => {
    this.setState({
      tenentaName: event.target.value
    });
  };

  render() {
    var showdata = null;
    console.log("in if block", this.state.showData);
    if(this.state.showData)
    {
      var data = (
        <div>

          <p>{this.state.tenantStateData.flows}</p>

          <p>{this.state.tenantStateData.validations}</p>

          <p>{this.state.tenantStateData.badges}</p>

          <p>{this.state.tenantStateData.kc}</p>
          </div>
          );
    }
    return (
      <div className="App">
        <TextField
          type="text"
          onChange={this.tenentChange}
          name="name"
          value={this.state.tenentaName}
        />
        <button onClick={this.getData} >Submit </button>
        <button onClick ={this.clearData} > Clear Data </button>
        <div>Workflows</div>
        <div>Validations</div>
        <div>Badges</div>
        <div>KC</div>
          {data}
      </div>
    );
  }
}

export default Search;
