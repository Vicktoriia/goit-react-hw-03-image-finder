import axios from 'axios';
import PropTypes from 'prop-types';

const FetchImages = (name, page = 1) => {
  const url = 'https://pixabay.com/api/';
  const key = '31316931-6ed528a434bb816a44241a448';

  return axios.get(
    `${url}/?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  );
};
FetchImages.propTypes = {
  name: PropTypes.string,
  page: PropTypes.number,
};

export default FetchImages;
