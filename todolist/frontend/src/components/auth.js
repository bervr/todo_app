import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

handleChange(event) {
    this.setState(
    {
    [event.target.name]: event.target.value
    });
    }

handleSubmit(event) {
    this.props.get_token(this.state.login, this.state.password)
    event.preventDefault()
}

render() {
    return (
        <section className="w-100 p-4 d-flex justify-content-center pb-4">
        <div className="tab-pane fade show active">
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-outline mb-4">
                <input type="text" name="login" placeholder="login" value={this.state.login} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div classNameName="form-outline mb-4">
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="row mb-4">
                <input className="btn btn-primary btn-block mb-4" type="submit" value="Login" />
            </div>
        </form>
        </div>
        </section>);
    }
}
export default LoginForm