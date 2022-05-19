import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import { Route, Routes } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import { connect } from "react-redux";
import Logout from "../src/components/Logout/Logout"
import { Component } from "react";
import { autoLogin } from "./store/actions/auth";


class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="auth" element={<Auth />} />
          <Route path="quizes/:id" element={<Quiz />} />
          <Route index element={<QuizList />} />
          {/* <Route path="logout" element={<Logout />} /> */}
          <Route path="*" element={<QuizList />} />
  
          <Route path="react-quiz" element={<QuizList />} />
        </Route>
      </Routes>
    )
  
    if (this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="auth" element={<Auth/>} /> */}
            <Route path="quiz-creator" element={<QuizCreator />} />
            <Route path="quizes/:id" element={<Quiz />} />
            <Route index element={<QuizList />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<QuizList />} />
  
            <Route path="react-quiz" element={<QuizList />} />
          </Route>
        </Routes>
      )
    }
  
    return (
      routes
    )
  }
}



function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
