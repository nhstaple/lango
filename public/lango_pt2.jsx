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
                <button id="googleLogin">
                    <div id="loginWrapper">
                        <div id="googleIconWrapper">

                        </div>
                        Login with Google.
                    </div>
                </button>
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
            <div id="welcome_page">
                <Welcome />
                <Login />
            </div>
        );
    }
}

ReactDOM.render(
    <WelcomePage />,
    document.getElementById('root'));
