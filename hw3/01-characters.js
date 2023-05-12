const url = "https://thronesapi.com/api/v2/Characters";

const createCharacterElement = (character) => {
  const characterDiv = document.createElement("div");
  characterDiv.classList.add("character");

  const characterImg = document.createElement("img");
  characterImg.src = character.imageUrl;
  characterImg.alt = `${character.firstName} ${character.lastName}`;
  characterImg.classList.add("character-img");

  const characterName = document.createElement("h2");
  characterName.textContent = `${character.firstName} ${character.lastName}`;
  characterName.classList.add("character-name");

  const characterTitle = document.createElement("h3");
  characterTitle.textContent = character.title;
  characterTitle.classList.add("character-title");

  characterDiv.appendChild(characterImg);
  characterDiv.appendChild(characterName);
  characterDiv.appendChild(characterTitle);

  return characterDiv;
};

fetch(url)
  .then((response) => response.json())
  .then((characters) => {
    const charactersSection = document.querySelector("section");
    characters.forEach((character) => {
      const characterElement = createCharacterElement(character);
      charactersSection.appendChild(characterElement);
    });
  });
