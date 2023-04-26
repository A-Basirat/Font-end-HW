document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = form.querySelector("#full-name").value;
    const email = form.querySelector("#email").value;
    const registrationStatus = form.querySelector("#registration-status").value;
    const programmingLanguages = form.querySelector(
      "#programming-languages"
    ).checked;
    const operatingSystems = form.querySelector("#operating-systems").checked;
    const fullStackWebDevelopment = form.querySelector(
      "#full-stack-web-development"
    ).checked;
    const comments = form.querySelector("#comments").value;

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
