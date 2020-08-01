import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND}/categorias`;

function getAll() {
  return fetch(`${URL_CATEGORIES}`).then(async (response) => {
    if (response.ok) {
      const res = await response.json();
      return res;
    }

    throw new Error('Não foi possível coletar os dados :(');
  });
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`).then(async (response) => {
    if (response.ok) {
      const res = await response.json();
      return res;
    }

    throw new Error('Não foi possível coletar os dados :(');
  });
}
export default { getAllWithVideos, getAll };
