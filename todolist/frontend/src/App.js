import './App.css';
import React from 'react';
import UserList from './components/users'
import Menu from './components/menu'
import Footer from './components/footer'
import Projects from './components/projects'
import axios from 'axios'
import TodoItems from "./components/todoitems";
import {HashRouter, Route, useLocation, Routes, Link} from 'react-router-dom'


function getDataFromApi(url){
   return axios.get(url).then(response => response.data.results).catch(error =>console.log(error))
}

function PageNotFound(){
  let location = useLocation();

  return (
    <div>
      <h1>Странно, но по адресу '{location.pathname}' ничего нет</h1>
    </div>
  );
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
             <HashRouter>
                 <Menu />

                     <Routes>
                        <Route exact path ='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='projects' element={<Projects projects={this.state.projects} />} />
                        <Route exact path='todo' element={<TodoItems todoitems={this.state.todoitems} />} />
                        <Route path='*' element={<PageNotFound />} />

                     </Routes>

            </HashRouter>
            <Footer />
        </div>
        )
      }
   }
export default App;
