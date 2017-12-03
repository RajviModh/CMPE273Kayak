import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChangePassword extends Component {

    static propTypes = {
        handlePassword: PropTypes.func.isRequired
    };

    state = {
        cpass: '',
        newpass1: '',
        newpass2 : ''
    };

    componentWillMount(){
        this.setState({
            cpass: '',
            newpass1: '',
            newpass2 : ''
        });
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-sm-9 col-md-9">
                    <form>
                        <div className="form-group">
                            <hr/>
                            <p>---------------Change Password--------------</p>
                        </div>
                        <div className="input-field">
                            <input
                                className="form-control"
                                type="password"
                                label="cpassword"
                                placeholder="Current Password"
                                required
                                onChange={(event) => {
                                    this.setState({
                                        cpass: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <br/>
                        <div className="input-field">
                            <input
                                className="form-control"
                                type="password"
                                label="npassword1"
                                placeholder="New Password"
                                required
                                onChange={(event) => {
                                    this.setState({
                                        newpass1: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <br/>
                        <div className="input-field">
                            <input
                                className="form-control"
                                type="password"
                                label="npassword2"
                                placeholder="New Password"
                                required
                                onChange={(event) => {
                                    this.setState({
                                        newpass2: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <br/>

                        <div>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handlePassword(this.state)}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ChangePassword;