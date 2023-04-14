const inputNumber = document.querySelector("#input-number");
const reslut = document.querySelector("#result");

inputNumber.addEventListener("input", (event) => {
  const { value } = event.target;

  if (!value.trim() || isNaN(value)) {
    updateResultMessage("Error: Please enter a valid number.", "red");
    return;
  }

  const numberValue = parseInt(value);

  if (numberValue < 0) {
    updateResultMessage("Error: Please enter a positive number.", "red");
    return;
  }

  const isPalindrome = checkPalindrome(value);

  if (isPalindrome) {
    updateResultMessage("Yes, This is a palindrome.", "green");
  } else {
    updateResultMessage("No, Try again.", "red");
  }
});

const checkPalindrome = (number) => {
  const reversedNumber = number.split("").reverse().join("");

  return number === reversedNumber;
};

const updateResultMessage = (message, color) => {
  result.textContent = message;
  result.style.color = color;
};
