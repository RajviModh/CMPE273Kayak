import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/style.css';
import '../css/bootstrap.css';


//var abc = {backgroundImage:'../images/cover_bg_1.jpg'};

var textbox = {width:'30px'};

class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    state = {
        username: '',
        password: ''
    };

    componentWillMount(){
        this.setState({
            username: '',
            password: ''
        });
    }




    render() {
        return (

            <div className="row justify-content-md-center">
                <div className="col-sm-9 col-md-9">
                    <form>
                        <div className="form-group">
                            <hr/>
                            <p>---------------or continue with KAYAK--------------</p>
                        </div>
                        <div className="input-field">
                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <br/>
                        <div className="input-field">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <br/>
                        <div className="input-field">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSubmit(this.state)}>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>



        );
    }
}

export default Login;