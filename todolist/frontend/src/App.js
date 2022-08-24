import './App.css';
import React from 'react';
import UserList from './components/users'
import Menu from './components/menu'
import Footer from './components/footer'
import Projects from './components/projects'
import axios from 'axios'
import TodoItems from "./components/todoitems";
import { Route, Navigate, useLocation, Routes, BrowserRouter,} from 'react-router-dom'
import ProjectList from "./components/projectDetail";
import TodoList from "./components/todoByProject";
import LoginForm from "./components/auth";
import Cookies from "universal-cookie";


const apiRoot = "http://127.0.0.1:8000"
const apiPoint = "http://127.0.0.1:8000/api/"
// const apiPoint = getUrl("api", apiRoot)


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

async function makeRequest(url, api) {

    const config = {
        method: 'get',
        url: getUrl(url, api)
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
        }
    }

set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token})
    }
is_authenticated() {
    return this.state.token != ''
}
logout() {
    this.set_token('')
    }
get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token})
}



get_token(username, password) {
    axios.post(getUrl('api-token-auth/', apiRoot), {username: username, password: password})
        .then(response => {this.set_token(response.data['token'])})
        .catch(error => alert('Неверный логин или пароль'))


}


loadData(){

    makeRequest('todousers/', apiPoint).then(res => {this.setState({'users':res.data.results})}).catch(error =>console.log(error))
    makeRequest('projects/', apiPoint).then(res => {this.setState({'projects':res.data.results})}).catch(error =>console.log(error))
    makeRequest('todoitems/', apiPoint).then(res => {this.setState({'todoitems':res.data.results})}).catch(error =>console.log(error))
}


componentDidMount() {

this.loadData()

}
    render(){
      return (
        <div>
             <BrowserRouter>
                 <Menu />
                     <Routes>
                        <Route exact path ='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='projects' element={<Projects projects={this.state.projects} />} />
                        <Route exact path='todo' element={<TodoItems todoitems={this.state.todoitems} />} />
                        <Route exact path="/authors" element={<Navigate to="/projects" replace />} />
                        <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route path="/project/:id" element={<ProjectList items={this.state.projects} />} />
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
