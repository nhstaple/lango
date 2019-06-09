// lango_part1.jsx
"use strict";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userID: null };
    }
    render() {
        return (
            <div id="login">
                <a id="googleLogin" href="auth/google">
                    <div className="loginWrapper">
                        <div id="googleIconWrapper">
                            <img id="googleIcon" src="https://image.flaticon.com/teams/slug/google.jpg"></img>
                        </div>
                        <div id="loginTextWrapper">
                            Login with Google.
                        </div>     
                    </div>
                </a>
            </div>
        );
    }
}

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }
    render() {
        return (
            <div id="welcome">
                <div id="welcomeText">
                    Welcome to Lango!
                </div>
                <div id="welcomeSub">
                    Customize your vocabulary.
                </div>
            </div>
        );
    }
}

class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }
    render() {
        return (
            <div id="welcomePage">
                <Welcome />
                <Login />
            </div>
        );
    }
}

ReactDOM.render(
    <WelcomePage />,
    document.getElementById('root'));
