import axios from 'axios';

//?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38324271-7e43a2be81ff0199763370e16';
const perPage = '12';

export async function getImageList(query, page) {
  return axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
}
