const fetchQuest = async () => {
  const storedToken = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&token=${storedToken}`;
  const response = await fetch(URL);
  return response;
};

export default fetchQuest;
