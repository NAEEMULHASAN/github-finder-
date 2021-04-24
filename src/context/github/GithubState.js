import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
        githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
        githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

}
else{
    githubClientId = process.env.GITHUB_CLIENT_ID;
        githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState);
    //Search User
    //This function is called from the search component by passing props up
    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items 
        })
                        
     }
    //Get User
    //This function is called from the UserItem component to display User Details
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
     
    dispatch({
        type: GET_USER,
        payload: res.data
    })

    }
    //Get Repos
    
    //This fumction is called from the user.js component to display the latest repos from Github
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
       dispatch({
           type: GET_REPOS,
           payload: res.data
       })
      }
    //Clear User
    //tHis function is called from the search component to clear users from state
 const  clearUsers = () =>dispatch({ type: CLEAR_USERS}) 
    
    //Set Loading
    const setLoading =() => dispatch({type: SET_LOADING})
    return <GithubContext.Provider
                  value={{
                    users: state.users,
                    user: state.user,
                    repos: state.repos,
                    loading: state.loading,
                    searchUsers,
                    clearUsers,
                    getUser,
                    getUserRepos
                    }}>
        {props.children}
        </GithubContext.Provider>

}

export default GithubState;

