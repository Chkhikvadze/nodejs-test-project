import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <header>
        <Link to={this.props.authenticated ? '/report' : '/'} className="logo">Nodejs Test Project</Link>
          <nav>
            {
              this.props.authenticated ?
                <ul>
                  <li>
                    <Link to="/report">Report</Link>
                  </li>
                  <li>
                    <Link to="/times">Times</Link>
                  </li>
                  <li>
                    <Link to="/signout">Signout</Link>
                  </li>
                </ul>
                :
                <ul>
                  <li>
                    <Link to="/signin">Sign in</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                </ul>
            }
          </nav>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);