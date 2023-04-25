export const fetchQuest = async () => {
  const storedToken = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&token=${storedToken}`;
  const response = await fetch(URL);
  return response;
};

export const fetchPersonalQuest = async (personalURL) => {
  const storedToken = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&token=${storedToken}${personalURL}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
