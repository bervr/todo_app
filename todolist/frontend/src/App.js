import './App.css';
import React from 'react';
import UserList from './components/users'
import Menu from './components/menu'
import Footer from './components/footer'
import Projects from './components/projects'
import axios from 'axios'
import TodoItems from "./components/todoitems";
import {Route, Navigate, useLocation, Routes, BrowserRouter, useParams, useNavigate} from 'react-router-dom'
import ProjectList from "./components/projectDetail";
import TodoList from "./components/todoByProject";
import LoginForm from "./components/auth";
import Cookies from "universal-cookie";
import ProjectForm from "./components/projectForm";
import * as PropTypes from "prop-types";
import TodoItemForm from "./components/todoItemForm";


const apiRoot = "http://127.0.0.1:8000"
const apiPoint = "http://127.0.0.1:8000/api/"

function PageNotFound(){
    // переброс на 404 с некорректного адреса
  let location = useLocation();

  return (
    <div>
      <h1>Странно, но по адресу '{location.pathname}' ничего нет</h1>
    </div>
  );
}

function getUrl(url, api){
    // получение URL из частей
    let endPoint = new URL(url, api).href
    return endPoint
}

async function makeRequest(url, api, headers, method, data={}) {
    // запрос к API
    const config = {
        method: method,
        url: getUrl(url, api),
        headers: headers,
        data: data


    }
    let res = await axios(config)

    return res;
}

function Redirect(props) {
    return null;
}


Redirect.propTypes = {to: PropTypes.string};

class App extends React.Component {
    // основной класс приеложения
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
        //записывает токен и пользователя в cookies
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
        // сброс логона
    this.setToken('', '')
    this.setState({'auth': {'username': '', 'isLogin': false}})
    }

async get_token_from_storage() {
        // получение данных из cookies если они есть
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
        // получение автора изменений
    if (this.state.auth.isLogin) {
        const username = this.state.auth.username
        const owner = this.state.users.filter((item)=>item.username ===
    username)
        return owner
    return 0

    }
}

get_headers() {
        //составление заголовков запроса с авторизацией
    let headers = {'Content-Type': 'application/json'}
    if (this.isAuthenticated()) {headers['Authorization'] = 'Token ' + this.state.token}
    return headers
}

get_token(username, password) {
        // запрос токена с сарвера
    axios.post(getUrl('api-token-auth/', apiRoot), {username: username, password: password})
        .then(response => {this.setToken(response.data['token'], username); this.setState({'auth': {'username': username, 'isLogin': true}})})
        .catch(error => alert('Неверный логин или пароль'))
}

deleteProject(id) {
        // метод удаления проекта
    const headers = this.get_headers()
    makeRequest(`projects/${id}`, apiPoint, headers, 'delete')
    .then(response => {
    this.setState({projects: this.state.projects.filter((item)=>item.id !==
    id)})
    }).catch(error => {
        this.setState({projects:[]})
        console.log(error)})
    }

deleteTodoItem(id) {
        // метод удаления tod o, не удаляем, а меняет статус на закрытое
    const headers = this.get_headers()
    makeRequest(`todoitems/${id}`, apiPoint, headers, 'delete')
    .then(response => {
    this.setState({todoitems: this.state.todoitems.filter((item)=>item.id !==
    id)})
    }).catch(error => {
        this.setState({todoitems:[]})
        console.log(error)})
    }

createProject(projectName, repoLink, projectGroup,) {
        // метод создание нового проекта
    const headers = this.get_headers()
    const projectOwner = this.get_owner()
    const data = {"projectName":projectName, "repoLink":repoLink, "projectGroup":projectGroup, "projectOwner":projectOwner[0].id}
    makeRequest(`projects/`, apiPoint, headers, 'post', data)
        .then(response => {
            this.loadData()
        })
        .catch(error => {
            this.setState({projects:[]})
            console.log(error)}
            )}

createTodoItem(projectId, note) {
        // метод создания нового tod o
    const headers = this.get_headers()
    const itemOwner = this.get_owner()
    const data = {"itemProject":projectId, "note":note, "itemOwner":itemOwner[0].id}
    makeRequest(`todoitems/`, apiPoint, headers, 'post', data)
        .then(response => {
            this.loadData()
        })
        .catch(error => {
            this.setState({todoitems:[]})
            console.log(error)}
            )}

loadData(){
        // запрос данных с сервера
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
    return;

}


componentDidMount() {// инициализация страницы

this.get_token_from_storage()


}
render(){ //отрисовка)
        const Wrapper = (props) => {// Обертка для передачи номера проекта в форму создания новой заметки:
        const params = useParams();
        const backUrl = useNavigate()
            return <TodoItemForm createTodoItem={(projectId, note)=> this.createTodoItem(projectId, note)} backurl={backUrl} {...{...props, match: {params}}}/>
        }

        const ProjectWrapper = (props) => {// Обертка для передачи  useNavigate в форму и создания нового проекта:
        const backUrl = useNavigate()
            return <ProjectForm users={this.state.users} createProject={(projectName, repoLink, projectGroup)=> this.createProject(projectName, repoLink, projectGroup)} backurl={backUrl} {...{...props}}/>
        }

      return (
        <div>
             <BrowserRouter>
                 <Menu auth={this.state.auth} logout={() => this.logout()} />
                     <Routes>
                        <Route exact path ='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='projects' element={<Projects projects={this.state.projects} users={this.state.users} deleteProject={(id)=>this.deleteProject(id)}/>} />
                        <Route exact path='todo' element={<TodoItems todoitems={this.state.todoitems} deleteTodoItem={(id)=>this.deleteTodoItem(id)} />} />
                        <Route exact path="/authors" element={<Navigate to="/projects" replace />} />
                        <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route path="/project/:id" element={<ProjectList items={this.state.projects}  deleteProject={(id)=>this.deleteProject(id)} />} />
                        <Route exact path='/project/create' element={<ProjectWrapper/>}  />
                         {/*<Route exact path='/newitem/create/:projectId' element={<Wrapper />}/>*/}
                         <Route exact path='/newitem/create/:projectId' element={<Wrapper />}/>
                         <Route path="/projectTodo/:projectId" element={<TodoList items={this.state.todoitems} deleteTodoItem={(id)=>this.deleteTodoItem(id)} projects={this.state.projects}/>} />
                        <Route path='*' element={<PageNotFound />} />
                     </Routes>
            </BrowserRouter>
            <Footer />
        </div>
        )
      }
   }
export default App;
