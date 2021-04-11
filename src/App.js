import React,{Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search'; 
class App extends Component{

  state = {
    users: [],

    loading:false,
    alert: null
  }

  
  
  //This function is called from the search component by passing props up
  searchUsers = async (text) => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users:res.data.items,loading: false});
  

  }
  //tHis function is called from the search component to clear users from state
  clearUsers = () => this.setState({users: [],loading:false})

  //This function is called from the Search component to raise an alert empty text field
  setAlert = (msg,type) => {
    this.setState({ alert: { msg,type}})

  }

  
  render(){

    const {loading,users}=this.state





    return (
      <div className="App">
        
     <Navbar />
     <div className="container">
       <Search searchUsers={this.searchUsers}
               clearUsers={this.clearUsers}
               showClear={users.length>0 ? true: false}
               setAlert={this.setAlert}
               />
     <Users loading={loading} users={users}/>
     </div>
     
      </div>
    
    );

  

}
}

export default App;
