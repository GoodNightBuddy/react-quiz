import { Component } from "react";
import classes from './QuizList.module.css';
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quizes/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {

    try {
      const response = await axios.get('/quizes.json')

      const quizes = []

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test №${index + 1}`
        })

        this.setState({
          quizes,
          loading: false
        })
      })
    } catch (error) {
      console.log(error)
    }



  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Tests List</h1>
          {
            this.state.loading
              ? <Loader />
              : <ul>
                {this.renderQuizes()}
              </ul>
          }

        </div>
      </div>
    )

  }
}