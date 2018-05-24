import { createStore } from 'redux';
import reducers from 'Redux/reducers';

const store = createStore(
  reducers
);

export default store;
