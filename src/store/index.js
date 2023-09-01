import { ref, reactive } from "vue";
// import words from "../store/questions.js";

const gameData = ref({});
const isGameStarted = false;
const isGamePaused = false;
const showHowToPlayModal = ref(false);
const showNextLevel = ref(false);
const isAllWordsFound = ref(false);
const score = ref(0);
const bonusScore = ref(2000);
const level = ref(0);
const dropArea = ref([]);
const error = ref({ exist: "Already Found", invalid: "Not a word" });
const fetchedData = ref([]);

const resetGame = () => {
  isGameStarted = false;
  dropArea = [];
  level = 0;
  showNextLevel = false;
  isAllWordsFound = false;
  isGamePaused = false;
};

const nextLevel = (currentQuestion) => {
  isGameStarted = true;
  // showHowToPlayModal= true;
  gameData = currentQuestion;
  dropArea = [];
  level = level + 1;
  showNextLevel = false;
  isAllWordsFound = false;
};

const updateScore = () => {
  score + 20;
};

const Store = reactive({
  gameData,
  isGameStarted,
  isGamePaused,
  showNextLevel,
  isAllWordsFound,
  score,
  level,
  bonusScore,
  dropArea,
  fetchedData,
  showHowToPlayModal,
  error,
  resetGame,
  nextLevel,
  updateScore,
});

export default Store;
