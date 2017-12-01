import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Signup extends Component {

    static propTypes = {
        handleSignUp: PropTypes.func.isRequired
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
                            <p>---------------create a KAYAK account--------------</p>
                        </div>
                        <div className="input-field">
                            <input
                                className="form-control"
                                type="email"
                                label="Username"
                                placeholder="Username"
                                required
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
                                required
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <br/>
                        <div>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSignUp(this.state)}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;