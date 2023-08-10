const NUM_QUESTIONS = 50;

const questions = {
  Pop: [],
  Science: [],
  Sports: [],
  Rock: []
};

for (let i = 0; i < NUM_QUESTIONS; i++) {
  questions.Pop.push(`Pop Question ${i}`);
  questions.Science.push(`Science Question ${i}`);
  questions.Sports.push(`Sports Question ${i}`);
  questions.Rock.push(`Rock Question ${i}`);
}