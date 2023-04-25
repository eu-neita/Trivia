/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Loading from './Loading';
import '../Game.css';
import iconTimer from '../images/iconTimer.svg';
import { fetchPersonalQuest, fetchQuest } from '../services/fetchFunc';
import { sumScore } from '../redux/actions';

const TIMEOUT_NUMBER = 1000;
const TIMER_MESSAGE = 'Acabou o tempo!';

class Questions extends Component {
  state = {
    questions: [],
    isLoading: true,
    questionNumber: 0,
    actualQuestion: {},
    answersOptions: [],
    isAnswersDisabled: false,
    isResponse: false,
    time: 30,
    timer: null,
  };

  componentDidMount() {
    this.questionRequest();
  }

  handleTimer = () => {
    const timer = setInterval(() => {
      const { time } = this.state;
      this.setState((prevState) => ({ time: prevState.time - 1 }), () => {
        if (time === 0) {
          clearInterval(timer);
          this.setState({
            time: TIMER_MESSAGE,
            isAnswersDisabled: true,
          });
        }
      });
    }, TIMEOUT_NUMBER);
    this.setState({ timer });
  };

  handleClearTimer = () => {
    const { timer } = this.state;
    clearInterval(timer);
    this.setState({
      time: 30,
    });
  };

  questionRequest = async () => {
    const { personalUrl } = this.props;
    let data;
    if (personalUrl) {
      data = await fetchPersonalQuest(personalUrl);
    } else {
      const fetch = await fetchQuest();
      data = await fetch.json();
    }
    this.setState({
      questions: data.results,
      isLoading: false,
    }, this.handleQuestion);
  };

  handleQuestion = () => {
    this.handleClearTimer();
    const { questions, questionNumber } = this.state;
    const actualQuestion = questions[questionNumber];
    let answersIndex = 0;
    const answers = [{
      text: actualQuestion.correct_answer,
      isCorrect: true,
    }, ...actualQuestion.incorrect_answers.map((answer) => {
      const answerObj = {
        text: answer,
        isCorrect: false,
        id: answersIndex,
      };
      answersIndex += 1;
      return answerObj;
    }),
    ];
    const shuffledAnswers = _.shuffle(answers);
    this.setState({
      answersOptions: shuffledAnswers,
      actualQuestion,
      isAnswersDisabled: false,
    });
    this.handleTimer();
  };

  handleAnswer = (isCorrect) => {
    const { timer } = this.state;
    this.handleScore(isCorrect);
    clearInterval(timer);
    this.setState({
      isResponse: true,
      time: TIMER_MESSAGE,
    });
  };

  handleScore = (isCorrect) => {
    const { dispatch } = this.props;
    const { time } = this.state;
    if (!isCorrect) {
      this.setState({
        isAnswersDisabled: true,
      });
      return;
    }
    const difficultyPoints = { hard: 3, medium: 2, easy: 1 };
    const { actualQuestion: { difficulty } } = this.state;
    const defaultScore = 10;
    const score = (Number(time) * difficultyPoints[difficulty]) + defaultScore;
    dispatch(sumScore(score));
    this.setState({
      isAnswersDisabled: true,
    });
  };

  nextQuestion = () => {
    const { questionNumber } = this.state;
    const { history } = this.props;
    const maxIndex = 4;
    if (questionNumber < maxIndex) {
      const newQuestionNumber = questionNumber + 1;
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
    const { isLoading, actualQuestion,
      answersOptions, isResponse, isAnswersDisabled, time } = this.state;

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
        <section>
          <img src={ iconTimer } alt="Timer" />
          { time === TIMER_MESSAGE ? TIMER_MESSAGE : `Tempo: ${time} s` }
        </section>
        {
          (isResponse || time === TIMER_MESSAGE)
           && <button data-testid="btn-next" onClick={ this.nextQuestion }>Next</button>
        }
      </div>
    );
  }
}

Questions.propTypes = {
  personalUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ game }) => ({
  ...game,
});

export default connect(mapStateToProps)(Questions);
