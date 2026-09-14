const API_URL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

const getJokeBtn = document.getElementById('getJoke');
const copyJokeBtn = document.getElementById('copyJoke');
const jokeCard = document.getElementById('jokeCard');
const jokeText = document.getElementById('jokeText');
const jokeExtra = document.getElementById('jokeExtra');
const status = document.getElementById('status');

async function fetchJoke() {
  setStatus('Carregando...');
  copyJokeBtn.disabled = true;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // A API pode retornar 'single' ou 'twopart'
    let full = '';
    if (data.type === 'single') {
      full = data.joke;
      jokeText.textContent = full;
      jokeExtra.textContent = '';
    } else if (data.type === 'twopart') {
      jokeText.textContent = data.setup;
      jokeExtra.textContent = data.delivery;
      full = `${data.setup} — ${data.delivery}`;
    } else {
      jokeText.textContent = 'Piada não disponível.';
      jokeExtra.textContent = '';
    }

    jokeCard.classList.remove('hidden');
    copyJokeBtn.disabled = false;
    setStatus('Pronto! Clique em "Copiar" para copiar a piada.');

    // Save last joke for copy
    jokeCard.dataset.lastJoke = full;
  } catch (err) {
    console.error(err);
    setStatus('Erro ao buscar piada. Verifique sua conexão ou tente novamente.');
  }
}

function setStatus(text) {
  status.textContent = text;
}

getJokeBtn.addEventListener('click', fetchJoke);

copyJokeBtn.addEventListener('click', async () => {
  const text = jokeCard.dataset.lastJoke;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    setStatus('Piada copiada para a área de transferência!');
  } catch (err) {
    setStatus('Não foi possível copiar — permita acesso à área de transferência.');
  }
});
