import React from 'react'
import {Navigate} from "react-router-dom";


export default class TodoItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { projectId:this.props.match.params.projectId, note: ""}
        }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
            });
        }


    handleSubmit(event) {
        event.preventDefault()
        this.props.createTodoItem(this.state.projectId, this.state.note)
        this.props.backurl(`/projectTodo/${this.state.projectId}`)



        }
render() {
return (<div>
    <form onSubmit={(event)=> this.handleSubmit(event)}>
    <div className="form-group">
    <label htmlFor="note">note</label>
    <input type="text" className="form-control" name="note"  placeholder="print here that needed to do"
    value={this.state.note} onChange={(event)=>this.handleChange(event)} />
    </div>
    <input type="submit" className="btn btn-primary" value="Save" />
    </form>
    </div>
    );
    }
    }
