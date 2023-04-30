document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const getInputValue = (id, type = "value") => {
      const element = form.querySelector(id);
      return type === "checked" ? element.checked : element.value;
    };

    const fullName = getInputValue("#full-name");
    const email = getInputValue("#email");
    const registrationStatus = getInputValue("#registration-status");
    const programmingLanguages = getInputValue(
      "#programming-languages",
      "checked"
    );
    const operatingSystems = getInputValue("#operating-systems", "checked");
    const fullStackWebDevelopment = getInputValue(
      "#full-stack-web-development",
      "checked"
    );
    const comments = getInputValue("#comments");

    console.log({
      fullName,
      email,
      registrationStatus,
      programmingLanguages,
      operatingSystems,
      fullStackWebDevelopment,
      comments,
    });
  });
});
