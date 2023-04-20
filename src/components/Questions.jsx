/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Loading from './Loading';
import '../Game.css';
import fetchQuest from '../services/fetchFunc';

class Questions extends Component {
  state = {
    questions: [],
    isLoading: true,
    questionNumber: 0,
    questionChosed: '',
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
    });
  };

  setQuestionChosed = (text) => {
    this.setState({
      questionChosed: text,
    });
  };

  colorChangeClass = (answers, text) => {
    const { questionChosed } = this.state;
    if (!questionChosed) {
      return 'Questions';
    }
    if (text === answers) {
      return 'correct';
    }
    return 'incorrect';
  };

  render() {
    const { questions, isLoading, questionNumber } = this.state;
    const NUM_QUESTIONS = 5;

    if (questionNumber >= NUM_QUESTIONS) {
      this.setState({ isLoading: true });
    }

    const atualQuestion = questions[questionNumber];

    let AnswerquestionNumber = 0;

    if (isLoading) {
      return;
    }

    const answers = [{
      text: atualQuestion.correct_answer,
      isCorrect: true,
    }, ...atualQuestion.incorrect_answers.map((answer) => ({
      text: answer,
      isCorrect: false,
    })),
    ];
    const shuffledQuest = _.shuffle(answers);

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
                    __html: atualQuestion.category,
                  } }
                />
                <p
                  data-testid="question-text"
                  dangerouslySetInnerHTML={ {
                    __html: atualQuestion.question,
                  } }
                />
                {
                  shuffledQuest.map(({ text, isCorrect }) => {
                    if (!isCorrect) {
                      AnswerquestionNumber += 1;
                    }
                    return (
                      <button
                        id="button_style_sheet"
                        className={
                          this.colorChangeClass(answers[0].text, text)
                        }
                        onClick={ () => this.setQuestionChosed(text) }
                        key={ text }
                        data-testid={
                          isCorrect ? 'correct-answer'
                            : `wrong-answer-${AnswerquestionNumber}`
                        }
                        // dangerouslySetInnerHTML={ { __html: text } }
                      >
                        {text}
                      </button>
                    );
                  })
                }
              </div>
            )
        }
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Questions;