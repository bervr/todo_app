import './App.css';
import React from 'react';
import UserList from './components/users'
import Menu from './components/menu'
import Footer from './components/footer'
import Projects from './components/projects'
import axios from 'axios'
import TodoItems from "./components/todoitems";
import {Route, Navigate, useLocation, Routes, BrowserRouter, Link,} from 'react-router-dom'
import ProjectList from "./components/projectDetail";
import TodoList from "./components/todoByProject";
import LoginForm from "./components/auth";
import Cookies from "universal-cookie";
import ProjectForm from "./components/projectForm";


const apiRoot = "http://127.0.0.1:8000"
const apiPoint = "http://127.0.0.1:8000/api/"


function PageNotFound(){
  let location = useLocation();

  return (
    <div>
      <h1>Странно, но по адресу '{location.pathname}' ничего нет</h1>
    </div>
  );
}

function getUrl(url, api){
    let endPoint = new URL(url, api).href
    return endPoint
}

async function makeRequest(url, api, headers, method, data={}) {
    const config = {
        method: method,
        url: getUrl(url, api),
        headers: headers,
        data: data


    }
    let res = await axios(config)

    return res;
}

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
        'users':[],
        'projects':[],
        'todoitems':[],
        'token': '',
         'auth': {'username': '', 'isLogin': false},
        }
    }

setToken(token, username) {
    const cookies = new Cookies()
    cookies.set('token', token)
    cookies.set('username', username)
    this.setState({'token': token},
        ()=>this.loadData())

    }
isAuthenticated() {
    return this.state.token !== ''
}
logout() {
    this.setToken('', '')
    this.setState({'auth': {'username': '', 'isLogin': false}})
    }

async get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const username = cookies.get('username')
    await this.setState({'token': token})
    if ((username != "") & (username != null)) {
            this.setState({'auth': {'username': username, 'isLogin': true}})
        }
    this.loadData()
    }

get_owner() {
    if (this.state.auth.isLogin) {
        const username = this.state.auth.username
        const owner = this.state.users.filter((item)=>item.username ===
    username)
        return owner
    return 0

    }
}

get_headers() {
    let headers = {'Content-Type': 'application/json'}
    if (this.isAuthenticated()) {headers['Authorization'] = 'Token ' + this.state.token}
    return headers
}

get_token(username, password) {
    axios.post(getUrl('api-token-auth/', apiRoot), {username: username, password: password})
        .then(response => {this.setToken(response.data['token'], username); this.setState({'auth': {'username': username, 'isLogin': true}})})
        .catch(error => alert('Неверный логин или пароль'))
}

deleteProject(id) {
    const headers = this.get_headers()
    makeRequest(`projects/${id}`, apiPoint, headers, 'delete')
    .then(response => {
    this.setState({projects: this.state.projects.filter((item)=>item.id !==
    id)})
    }).catch(error => {
        this.setState({projects:[]})
        console.log(error)})
    }

createProject(projectName, repoLink, projectGroup,) {
    const headers = this.get_headers()
    const projectOwner = this.get_owner()
    console.log(projectOwner)
    console.log(projectName)
    console.log(projectGroup)
    const data = {"projectName":projectName, "repoLink":repoLink, "projectGroup":projectGroup, "projectOwner":projectOwner[0].id}
    console.log(data)
    makeRequest(`projects/`, apiPoint, headers, 'post', data)
        .then(response => {
            this.loadData()})
        .catch(error => {
            this.setState({projects:[]})
            console.log(error)}
            )}



loadData(){
    const headers = this.get_headers()
    makeRequest('todousers/', apiPoint, headers, 'get').
        then(res => {this.setState({'users':res.data.results})}).
        catch(error =>{console.log(error);
            this.setState({users: []});
        })

    makeRequest('projects/', apiPoint, headers, 'get').
        then(res => {this.setState({'projects':res.data.results})}).catch(error =>console.log(error))

    makeRequest('todoitems/', apiPoint, headers, 'get').
        then(res => {this.setState({'todoitems':res.data.results})}).catch(error =>console.log(error))
}


componentDidMount() {
this.get_token_from_storage()

// this.loadData()

}
    render(){

      return (
        <div>
             <BrowserRouter>
                 <Menu auth={this.state.auth} logout={() => this.logout()} />
                     <Routes>
                        <Route exact path ='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='projects' element={<Projects projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)}/>} />
                        <Route exact path='todo' element={<TodoItems todoitems={this.state.todoitems} />} />
                        <Route exact path="/authors" element={<Navigate to="/projects" replace />} />
                        <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route path="/project/:id" element={<ProjectList items={this.state.projects}  deleteProject={(id)=>this.deleteProject(id)} />} />
                        <Route exact path='/project/create' element={<ProjectForm users={this.state.users}
                            createProject={(projectName, repoLink, projectGroup)=> this.createProject(projectName, repoLink, projectGroup)}/>}  />
                         <Route path="/projectTodo/:projectName" element={<TodoList items={this.state.todoitems} />} />
                        <Route path='*' element={<PageNotFound />} />
                     </Routes>
            </BrowserRouter>
            <Footer />
        </div>
        )
      }
   }
export default App;
