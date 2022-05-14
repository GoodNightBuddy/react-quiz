import { Component } from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz"
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router-dom";

class Quiz extends Component {

  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true,
    // quiz: [
    //   {
    //     question: 'What color is the sky?',
    //     rightAnswerId: 2,
    //     id: 1,
    //     answers: [
    //       {text: 'Black', id: 1},
    //       {text: 'Blue', id: 2},
    //       {text: 'Red', id: 3},
    //       {text: 'Green', id: 4},
    //     ]
    //   },
    //   {
    //     question: 'Who killed Kennedy?',
    //     rightAnswerId: 3,
    //     id: 2,
    //     answers: [
    //       {text: 'Bullet', id: 1},
    //       {text: 'Shot', id: 2},
    //       {text: 'Killer', id: 3},
    //       {text: 'Gun', id: 4},
    //     ]
    //   }
    // ]
  }

  onAnswerClickHandler = answerId => {

    if (this.state.answerState) {
      // const key = Object.keys(this.state.answerState)[0]
      // if(this.state.answerState[key] === 'success') return
      if (this.state.answerState[answerId] === 'success') return

    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'

      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        results,
        answerState: { [answerId]: 'error' }
      })
    }
  }

  isQuizFinished() {
    if (this.state.activeQuestion === this.state.quiz.length - 1) {
      return true
    }
    return false
  }

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    })
  }

  async componentDidMount() {
    try {
      let path = window.location.pathname
      const response = await axios.get(`${path}.json`)

      const quiz = response.data

      this.setState({
        quiz,
        loading: false
      })
    } catch (error) {
      console.log(error)
    }

    // console.log(this.props.params.match.id) Not working, I don`t know why...

  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions</h1>

          {
            this.state.loading
              ? <Loader />
              : this.state.isFinished
                ? <FinishedQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
                />
                : <ActiveQuiz
                  answers={this.state.quiz[this.state.activeQuestion].answers}
                  question={this.state.quiz[this.state.activeQuestion].question}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={this.state.quiz.length}
                  answerNumber={this.state.activeQuestion + 1}
                  state={this.state.answerState}
                />
          }

        </div>
      </div>
    )
  }
}

export default Quiz