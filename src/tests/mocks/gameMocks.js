export const invalidApiReturnMock = {
  response_code: 3,
  results: [],
};

export const invalidRequestMock = {
  response_code: 1,
  results: [],
};

export const successfulApiReturnMock = {
  "response_code": 0,
  "results": [
    {
      "category": "Entertainment: Video Games",
      "type": "multiple",
      "difficulty": "easy",
      "question": "Which of these video game engines was made by the company Epic Games?",
      "correct_answer": "Unreal",
      "incorrect_answers": [
        "Unity",
        "Game Maker: Studio",
        "Cry Engine"
      ]
    },
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "medium",
      "question": "After how many years would you celebrate your crystal anniversary?",
      "correct_answer": "15",
      "incorrect_answers": [
        "20",
        "10",
        "25"
      ]
    },
    {
      "category": "Entertainment: Music",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Which of these is NOT a song by Pegboard Nerds?",
      "correct_answer": "WiFi Tears",
      "incorrect_answers": [
        "Swamp Thing",
        "Emoji",
        "BAMF"
      ]
    },
    {
      "category": "Entertainment: Film",
      "type": "multiple",
      "difficulty": "easy",
      "question": "In the movie &quot;V for Vendetta,&quot; what is the date that masked vigilante &quot;V&quot; urges people to remember?",
      "correct_answer": "November 5th",
      "incorrect_answers": [
        "November 6th",
        "November 4th",
        "September 5th"
      ]
    },
    {
      "category": "Entertainment: Video Games",
      "type": "multiple",
      "difficulty": "medium",
      "question": "In Pokemon Diamond, Pearl and Platinum, where can a Munchlax be found?",
      "correct_answer": "Honey Trees",
      "incorrect_answers": [
        "Trading with an NPC",
        "Grass on Route 209",
        "Wayward Cave"
      ]
    }
  ]
}

export const initialStateMock = {
  player: {
    gravatarEmail: 'teste@teste.com',
    gravatarImage: 'https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473',
    name: 'Eduardo',
    score: 0,
    assertions: 0
  },
  game: {
    isAnswersDisabled: true,
    timeRemaining: '30'
  }
}

export const timerGame = (callback) => {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 30000);
}