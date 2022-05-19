import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../store/actions/auth";

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return (
      <div>
      <Navigate to='/' replace={true}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)