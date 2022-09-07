import React from 'react'


export default class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {projectName: '', projectOwner: 0, projectGroup: [], repoLink: '', users:[]}
        }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
            });
        }

    handleProjectChange(event) {
        if (!event.target.selectedOptions){
            this.setState({projectGroup:[]})
            return;
        }
        let projectGroup = []
        for (let i=0; i< event.target.selectedOptions.length; i++){
            projectGroup.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({projectGroup:projectGroup})
        return;

    }
    handleSubmit(event) {
        this.props.createProject(this.state.projectName, this.state.repoLink, this.state.projectGroup,)
        // console.log(this.state.projectName)
        // console.log(this.state.repoLink)
        // console.log(this.state.projectGroup)
        event.preventDefault()

        }
render() {
return (<div>
    <form onSubmit={(event)=> this.handleSubmit(event)}>
    <div className="form-group">
    <label for="projectName">name</label>
    <input type="text" className="form-control" name="projectName"  placeholder="project name here"
    value={this.state.projectName} onChange={(event)=>this.handleChange(event)} />
    </div>
    <div className="form-group">
        <label for="repoLink">repo url</label>
    <input type="url" className="form-control" name="repoLink" placeholder="link to project repository"
    value={this.state.repoLink} onChange={(event)=>this.handleChange(event)} />
    </div>

    <div className="form-group">
        <label for="projectGroup">project group</label>
        <select name="projectGroup" multiple onChange={(event) => this.handleProjectChange(event)}>
            {this.props.users.map((item)=> <option value={item.id}>{item.username}</option> )}
        </select>
    </div>

    {/*<div className="form-group">*/}
    {/*    <label htmlFor="repoLink">repo url</label>*/}
    {/*    <input type="url" className="form-control" name="repoLink"*/}
    {/*           value={this.state.repoLink} onChange={(event) => this.handleChange(event)}/>*/}
    {/*</div>*/}
    <input type="submit" className="btn btn-primary" value="Save" />
    </form>
    </div>
    );
    }
    }
