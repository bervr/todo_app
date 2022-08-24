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


const api = "http://127.0.0.1:8000/api/"

function PageNotFound(){
  let location = useLocation();

  return (
    <div>
      <h1>Странно, но по адресу '{location.pathname}' ничего нет</h1>
    </div>
  );
}


async function makeRequest(url) {
    let endPoint = new URL(url, api).href
    const config = {
        method: 'get',
        url: endPoint
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
        'todoitems':[]
        }
    }



loadData(){
    makeRequest('todousers').then(res => {this.setState({'users':res.data.results})}).catch(error =>console.log(error))
    makeRequest('projects').then(res => {this.setState({'projects':res.data.results})}).catch(error =>console.log(error))
    makeRequest('todoitems').then(res => {this.setState({'todoitems':res.data.results})}).catch(error =>console.log(error))
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
