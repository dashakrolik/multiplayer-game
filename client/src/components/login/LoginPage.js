import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {login} from '../../actions/users'
import LoginForm from './LoginForm'
import {Redirect} from 'react-router-dom'

class LoginPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.login(data.email, data.password)
	}

	render() {
		if (this.props.currentUser) return (
			<Redirect to="/" />
		)
		const divStyle = {
			// border: '5px solid green', 
			// width: '300px',
			// margin: 'auto',
			// position: 'center',
			// margin-top: '20px',
			margin: 'auto',
			padding: '20px',
			width: '50%',
			background: 'rgb(255, 255, 255, .3)'
		}

		return (
			<div>
				<h1>Login</h1>

				<LoginForm onSubmit={this.handleSubmit} />

				<div style={divStyle}>
					<h4 style={{padding:"5px"}}>BATTLE PLAGUE!</h4>
					<p style={{margin:"10px"}}>
						There's an outbreak of plague!!! 
						Be the first to get rid of the nasty bugs 
						and win victory!!!
					</p>
					
					<h4 style={{margin:"10px"}}>How to play:</h4>
					<p style={{margin:"10px"}}>
						Click on your gameboard and find where
						5 bacterial bugs are hidden. The first to 
						find them all wins!!! Check out your opponent's
						board to see their progress.
					</p>
				</div>

        { this.props.error && 
          <span style={{color:'red'}}>{this.props.error}</span> }
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser,
    error: state.login.error
	}
}

export default connect(mapStateToProps, {login})(LoginPage)
