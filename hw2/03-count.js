document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const textDiv = document.querySelector(".text-container");

  const highlightWord = (word) => {
    const originalText = textDiv.textContent;
    const words = originalText.split(/\s+/);
    const fragment = new DocumentFragment();

    words.forEach((currentWord, index) => {
      if (currentWord.toLowerCase() === word.toLowerCase()) {
        const mark = document.createElement("mark");
        mark.textContent = currentWord;
        fragment.appendChild(mark);
      } else {
        fragment.appendChild(document.createTextNode(currentWord));
      }

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
      textDiv.textContent = textDiv.textContent;
    }
  };

  input.addEventListener("keydown", handleKeyDown);
});
