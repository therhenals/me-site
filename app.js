const $thr = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
  $thr("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("asdasdasd");
  });

  const upButton = $thr("#up-button");

  function toggleUpButton() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      upButton.style.display = "block";
    } else {
      upButton.style.display = "none";
    }
  }

  window.addEventListener("scroll", toggleUpButton);
});

function body(name, email, comments) {
  return `Nombre: ${name}</br>
            Email: ${email}</br>
            Comentarios: ${comments}
            `;
}

async function sendEmail() {
  const send = $thr("#send");
  const sendText = $thr("#send .text");
  const sendSpinner = $thr("#send .spinner-border");
  send.disabled = true;

  sendText.innerHTML = "Enviando...";
  sendSpinner.style.display = "block";

  const fromEmail = $thr("#email").value;
  const name = $thr("#name").value;
  const comments = $thr("#comments").value;

  await Email.send({
    SecureToken: "c7eb6942-a5ec-4154-86d8-7203eaebd240",
    To: fromEmail,
    From: "therhenalsl@gmail.com",
    Subject: "Contacto desde TheRhenals.com",
    Body: body(name, fromEmail, comments),
  });

  const toastEl = $thr("#toast");
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  $thr("#email").value = "";
  $thr("#name").value = "";
  $thr("#comments").value = "";

  sendSpinner.style.display = "none";
  sendText.innerHTML = "Enviar";
  send.disabled = false;
}
