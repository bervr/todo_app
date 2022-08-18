import './App.css';
import React from 'react';
import UserList from './components/users'
import Menu from './components/menu'
import Footer from './components/footer'
import Projects from './components/projects'
import axios from 'axios'
import TodoItems from "./components/todoitems";

function getDataFromApi(url){
   return axios.get(url).then(response => response.data.results).catch(error =>console.log(error))
}

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
        'users':[],
        'projects':[],
        'todoitems':[]
        }
    }




componentDidMount() {
        // this.setState({'users': getDataFromApi('http://127.0.0.1:8000/api/todousers/')})

axios.get('http://127.0.0.1:8000/api/todousers/').then(response =>{
        this.setState(
        {'users':response.data.results}
        )
       }
    ).catch(error =>console.log(error))

axios.get('http://127.0.0.1:8000/api/projects/').then(response =>{
        this.setState(
        {'projects':response.data.results}
        )
       }
    ).catch(error =>console.log(error))

axios.get('http://127.0.0.1:8000/api/todoitems/').then(response =>{
        this.setState(
        {'todoitems':response.data.results}
        )
       }
    ).catch(error =>console.log(error))
}
    render(){
      return (
        <div>
            <Menu/>
            <UserList users = {this.state.users}/>
            <Projects projects = {this.state.projects}/>
            <TodoItems todoitems = {this.state.todoitems}/>
            <Footer/>
        </div>
        )
      }
   }
export default App;
