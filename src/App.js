import React, { Component } from 'react';
import $ from 'jquery';


class App extends Component {
  constructor(props) {
  super(props);
  this.printTop30 = this.printTop30.bind(this);
  this.printTopAll = this.printTopAll.bind(this);


  this.state = {
      users: []

      };
  }


  render() {
    return (
      <table id="users">

        <tbody>{this.state.users}</tbody>

      </table>
    );
  }

  componentDidMount(){
    let listusers = this.state.users;
    let catprops = {key: -1, name: "", recent: "", alltime: "", img: ""}
    listusers.push(<User key={catprops.key} infos={catprops} printTopAll={this.printTopAll} printTop30={this.printTop30}/>);
    this.setState({users: listusers});
    this.printTop30()
  }

  printTop30() {
    let tempUsers = this.state.users;
    tempUsers = [this.state.users[0]]
    this.setState({users: tempUsers});

    let jUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    $.getJSON(jUrl, function(data) {
          for(let i = 0; i < 100; i++)
          {
            this.createUser({key: i, name: data[i].username, recent: data[i].recent, alltime: data[i].alltime, img: data[i].img})
          }
    }.bind(this));

  }

  printTopAll() {
    let tempUsers = this.state.users;
    tempUsers = [this.state.users[0]]
    this.setState({users: tempUsers});

    let jUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
    $.getJSON(jUrl, function(data) {
          for(let i = 0; i < 100; i++)
          {
            this.createUser({key: i, name: data[i].username, recent: data[i].recent, alltime: data[i].alltime, img: data[i].img})
          }
    }.bind(this));


  }


  createUser(userprops) {
    let listusers = this.state.users;
    listusers.push(<User  key={userprops.key} infos={userprops}/>);
    this.setState({users: listusers});
  }
}

class User extends Component {
  constructor(props) {
  super(props);
  this.state = this.props.infos;
  this.handleClick = this.handleClick.bind(this)
  this.handleLink = this.handleLink.bind(this)
  }

  render() {
    if(this.state.key === -1) // Create the categories
    {
      return(
        <tr>
          <th id="img"></th>
          <th id="position">Position</th>
          <th id="name">Name</th>
          <th id="recent"><button className="btn" id="recentbtn" onClick={this.handleClick}>▼ Last 30 Days</button></th>
          <th id="alltime" ><button className="btn" id="alltimebtn" onClick={this.handleClick}>All Time</button></th>
        </tr>
      )
    }
else {
    return(
      <tr onClick={this.handleLink}>

        <td id="img" ><img src={this.state.img} alt={this.state.name}></img></td>
        <td id="position">{this.state.key+1}</td>
        <td id="name">{this.state.name}</td>
        <td id="recent">{this.state.recent}</td>
        <td id="alltime" >{this.state.alltime}</td>

      </tr>
    )  }}

      handleClick(e) {
        e.preventDefault();
        if(e.target.id === 'recentbtn')
        {
          document.getElementById('recentbtn').innerHTML = "▼ Last 30 Days"
          document.getElementById('alltimebtn').innerHTML = "All Time"
          this.props.printTop30()
        }
        else {
          document.getElementById('alltimebtn').innerHTML = "▼ All Time"
          document.getElementById('recentbtn').innerHTML = "Last 30 Days"
          this.props.printTopAll();
        }

      }

      handleLink() {
        let url = "http://www.freecodecamp.org/" + this.state.name;
        window.open(url, '_blank');
      }
}

export default App;
