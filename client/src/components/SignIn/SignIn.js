import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import GitHubButton from '../GitHubButton'
import { Link } from 'react-router-dom'
import styles from './SignIn-styles'
import CloseIcon from '@material-ui/icons/Close'

const { assign } = Object

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enteringEmail: false,
      email: '',
      password: ''
    }
  }

  render () {
    const { bufferRepos, className, classes } = this.props
    const { email, password, enteringEmail } = this.state
    return (
      <div className={`${className} ${classes.container}`}>
        <GitHubButton bufferRepos={bufferRepos}/>
        {enteringEmail ? (
        <form onSubmit={e => this.signIn(e)} className={classes.form}>
          <a className="soft" style={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }} onClick={() => this.setState({ enteringEmail: false })}><CloseIcon /></a>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" value={email} type="email" required onChange={ev => this.handleEmailChange(ev)} />
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" required value={password} onChange={ev => this.handlePasswordChange(ev)} />
          </FormControl>
          <Button type="submit" variant="contained" className={classes.signIn}>
            Sign In / Sign Up
          </Button>
        </form>
        ): (
        <div>
          or <a onClick={() => this.setState({ enteringEmail: true })}>enter email</a>
        </div>
        )}
        <div className={classes.conditions}>By signing in, you agree to our <Link to="/privacy" className="soft">Privacy Policy</Link></div>
      </div>
    )
  }

  signIn (e) {
    e.preventDefault()
    if (!this.valid()) { return }
    const { email, password } = this.state
    const { signIn, bufferRepos } = this.props
    signIn({ email, password, repos: bufferRepos })
  }

  valid () {
    const { email, password } = this.state
    return password && email && /^[^@]+@[^@]+$/.test(email)
  }

  handleEmailChange (ev) {
    const email = ev.target.value
    this.setState(state => assign({}, state, { email }))
  }

  handlePasswordChange (ev) {
    const password = ev.target.value
    this.setState(state => assign({}, state, { password }))
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  bufferRepos: PropTypes.arrayOf(PropTypes.object).isRequired,
  signIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignIn)
