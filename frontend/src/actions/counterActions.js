import axios from 'axios';
import { END_POINT } from '../config';
export const fetchDocuments = () => async (dispatch) => {
  const response = await axios.get(`${END_POINT}/api/blog/`);
  dispatch({ type: 'FETCH_DOCUMENTS', payload: response.data });
};

export const createDocument = (params, credentials, blog) => async (dispatch) => {
  try {
    let response = await fetch(`${END_POINT}/api/blog/new/` + params.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
      },
      body: blog
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
};

export const updateDocument = (id, document) => async (dispatch) => {
  const response = await axios.put(`http://localhost:5000/api/mymodel/${id}`, document);
  dispatch({ type: 'UPDATE_DOCUMENT', payload: response.data });
};

export const deleteDocument = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:5000/api/mymodel/${id}`);
  dispatch({ type: 'DELETE_DOCUMENT', payload: id });
};