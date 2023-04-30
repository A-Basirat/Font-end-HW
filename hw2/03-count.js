const input = document.querySelector("input");
const textDiv = document.querySelector(".text-container");
const originalText = textDiv.textContent;

const highlightWord = (word) => {
  const originalText = textDiv.textContent;
  const words = originalText.split(/\s+/);
  const fragment = new DocumentFragment();
  const lowerCaseWord = word.toLowerCase();

  words.forEach((currentWord, index) => {
    let textToAdd;

    if (currentWord.toLowerCase() === lowerCaseWord) {
      const mark = document.createElement("mark");
      mark.textContent = currentWord;
      textToAdd = mark;
    } else {
      textToAdd = document.createTextNode(currentWord);
    }

    fragment.appendChild(textToAdd);

    if (index < words.length - 1) {
      fragment.appendChild(document.createTextNode(" "));
    }
  });

  textDiv.textContent = "";
  textDiv.appendChild(fragment);
};

const handleKeyDown = ({ target: { value } }) => {
  const word = value.trim();
  if (word) {
    highlightWord(word);
  } else {
    textDiv.textContent = originalText;
  }
};

input.addEventListener("keydown", handleKeyDown);
