import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '33190889-c566a33fbd0a8c43c551e11d7',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const searchImageAPI = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
