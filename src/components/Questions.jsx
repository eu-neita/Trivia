/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Loading from './Loading';
import '../Game.css';
import fetchQuest from '../services/fetchFunc';
import { sumScore, toDisableAnswers, toEnableAnswers } from '../redux/actions';

class Questions extends Component {
  state = {
    questions: [],
    isLoading: true,
    questionNumber: 0,
    actualQuestion: {},
    answersOptions: [],
    // questionChosed: '',
    isResponse: false,
  };

  componentDidMount() {
    this.questionRequest();
  }

  questionRequest = async () => {
    const fetch = await fetchQuest();
    const data = await fetch.json();
    this.setState({
      questions: data.results,
      isLoading: false,
    }, this.handleQuestion);
  };

  handleQuestion = () => {
    const { questions, questionNumber } = this.state;
    const { dispatch } = this.props;
    const actualQuestion = questions[questionNumber];
    let answersIndex = 0;
    const answers = [{
      text: actualQuestion.correct_answer,
      isCorrect: true,
    }, ...actualQuestion.incorrect_answers.map((answer) => {
      answersIndex += 1;
      return ({
        text: answer,
        isCorrect: false,
        id: answersIndex,
      });
    }),
    ];
    const shuffledAnswers = _.shuffle(answers);
    this.setState({
      answersOptions: shuffledAnswers,
      actualQuestion,
    });
    dispatch(toEnableAnswers());
  };

  handleAnswer = (isCorrect) => {
    this.handleScore(isCorrect);
    this.setState({
      isResponse: true,
    });
  };

  handleScore = (isCorrect) => {
    const { timeRemaining, dispatch } = this.props;
    if (!isCorrect) {
      dispatch(toDisableAnswers());
      return;
    }
    const difficultyPoints = { hard: 3, medium: 2, easy: 1 };
    const { actualQuestion: { difficulty } } = this.state;
    const defaultScore = 10;
    const score = (Number(timeRemaining) * difficultyPoints[difficulty]) + defaultScore;
    dispatch(sumScore(score));
    dispatch(toDisableAnswers());
  };

  nextQuestion = () => {
    const { questionNumber } = this.state;
    const { history } = this.props;
    const maxIndex = 4;
    console.log(questionNumber);
    if (questionNumber < maxIndex) {
      const newQuestionNumber = questionNumber + 1;
      // this.setState((prevState) => ({
      //   questionNumber: prevState.questionNumber + 1,
      //   isResponse: false,
      // }, this.handleQuestion));
      this.setState({
        questionNumber: newQuestionNumber,
        isResponse: false,
      }, this.handleQuestion);
    } else {
      history.push('/feedback');
    }
  };

  changeClassColor = (isCorrect) => {
    const { isResponse } = this.state;
    let classColor = 'option';
    if (isResponse) {
      classColor = isCorrect ? 'correct' : 'incorrect';
    }
    return classColor;
  };

  render() {
    const { isAnswersDisabled, timeRemaining } = this.props;
    const { isLoading, actualQuestion, answersOptions, isResponse } = this.state;

    return (
      <div>
        {
          isLoading
            ? <Loading />
            : (
              <div data-testid="answer-options">
                <h2
                  data-testid="question-category"
                  dangerouslySetInnerHTML={ {
                    __html: actualQuestion.category,
                  } }
                />
                <h4
                  dangerouslySetInnerHTML={ {
                    __html: actualQuestion.difficulty,
                  } }
                />
                <p
                  data-testid="question-text"
                  dangerouslySetInnerHTML={ {
                    __html: actualQuestion.question,
                  } }
                />
                {
                  answersOptions.map(({ text, isCorrect, id }) => (
                    <button
                      id="button_style_sheet"
                      className={
                        this.changeClassColor(isCorrect)
                      }
                      disabled={ isAnswersDisabled }
                      onClick={ () => this.handleAnswer(isCorrect) }
                      key={ text }
                      data-testid={
                        isCorrect ? 'correct-answer'
                          : `wrong-answer-${id}`
                      }
                    >
                      {text}
                    </button>
                  ))
                }
              </div>
            )
        }
        {
          (isResponse || timeRemaining === 'Acabou o tempo!')
           && <button data-testid="btn-next" onClick={ this.nextQuestion }>Next</button>
        }
      </div>
    );
  }
}

Questions.propTypes = {
  isAnswersDisabled: PropTypes.bool.isRequired,
  timeRemaining: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ game }) => ({
  ...game,
});

export default connect(mapStateToProps)(Questions);
