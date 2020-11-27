import axios from 'axios'

const setAxiosHeaders = () => {
  const csrfToken = document.querySelector('[name=csrf-token]')?.getAttribute('content')
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}

export default setAxiosHeaders;