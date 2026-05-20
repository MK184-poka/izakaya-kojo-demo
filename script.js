const DEMO_PASSWORD = "kojo3930";
const PASSWORD_STORAGE_KEY = "kojo-demo-authenticated";

const unlockSite = () => {
  document.body.classList.remove("locked");
  const gate = document.querySelector(".password-gate");
  if (gate) {
    gate.remove();
  }
};

const showPasswordGate = () => {
  const gate = document.createElement("section");
  gate.className = "password-gate";
  gate.setAttribute("aria-label", "閲覧パスワード入力");
  gate.innerHTML = `
    <div class="password-panel">
      <p class="section-label">Demo Preview</p>
      <h1>居酒屋 こじょう<br />デモサイト</h1>
      <p class="password-copy">
        このページは営業提案用の仮ホームページです。閲覧にはパスワードを入力してください。
      </p>
      <form class="password-form">
        <label for="preview-password">閲覧パスワード</label>
        <input id="preview-password" type="password" autocomplete="current-password" inputmode="text" />
        <button class="button primary" type="submit">サイトを見る</button>
        <p class="password-error" role="alert" aria-live="polite"></p>
      </form>
    </div>
  `;

  document.body.prepend(gate);

  const form = gate.querySelector(".password-form");
  const input = gate.querySelector("#preview-password");
  const error = gate.querySelector(".password-error");

  input.focus();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (input.value === DEMO_PASSWORD) {
      sessionStorage.setItem(PASSWORD_STORAGE_KEY, "true");
      unlockSite();
      return;
    }

    error.textContent = "パスワードが違います。もう一度お試しください。";
    input.value = "";
    input.focus();
  });
};

if (sessionStorage.getItem(PASSWORD_STORAGE_KEY) === "true") {
  unlockSite();
} else {
  showPasswordGate();
}

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
