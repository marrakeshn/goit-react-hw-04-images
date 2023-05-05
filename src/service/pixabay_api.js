import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=34210482-0ff822678977a0c2e2014453a&image_type=photo&orientation=horizontal';

export const getImages = async (query, page) => {
  try {
    const response = await axios.get(`&per_page=12&page=${page}&q=${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};