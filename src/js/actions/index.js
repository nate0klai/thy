import axios from "axios";

const gitApiUserDataRequest = async (val, errorClbk) => {
  try {
    const {data: {name, avatar_url: avatar, public_repos: reposCount}} = await axios.get('https://api.github.com/users/' + val);
    return {type: 'user', name, avatar, reposCount};
  } catch ({message, response}) {
    if (message === 'Network Error') return {type: 'error', status: 100};
    else if (response.status === 404) return {type: 'error', status: 404};
    else return {type: 'error', status: 0};
  }
};

const gitApiReposDataRequest = async (name, page, count) => {
  try {
    console.log('dsfsf', name, page, count);
      const {data} = await axios.get('https://api.github.com/users/' + name + '/repos?page=' + page + '&per_page=' + count);
      return {type: 'list', list: data.map(({name, stargazers_count: stars, html_url: url}) => ({name, stars, url}))};
  } catch ({message, response}) {
    if (message === 'Network Error') return {type: 'error', status: 100};
    else return {type: 'error', status: 0};
  }
};

export {
  gitApiUserDataRequest,
  gitApiReposDataRequest
};