const inputNumber = document.querySelector("#input-number");
const reslut = document.querySelector("#result");

inputNumber.addEventListener("input", (event) => {
  const { value } = event.target;

  if (value < 0) {
    updateResultMessage("Error: Please enter a positive number.", "red");
  } else if (!value.trim() || isNaN(value)) {
    updateResultMessage("Error: Please enter a valid number.", "red");
  } else {
    const isPalindrome = checkPalindrome(value);

    if (isPalindrome) {
      updateResultMessage("Yes, This is a palindrome.", "green");
    } else {
      updateResultMessage("No, Try again.", "red");
    }
  }
});

const checkPalindrome = (number) => {
  const numberString = number.toString();
  const reversedNumberString = numberString.split("").reverse().join("");

  return numberString === reversedNumberString;
};

const updateResultMessage = (message, color) => {
  result.textContent = message;
  result.style.color = color;
};
