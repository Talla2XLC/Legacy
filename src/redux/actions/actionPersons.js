import axios from "axios";

const getPersonsStarted = (persons) => ({
  type: "GET_PERSONS_DATA_STARTED",
  payload: persons,
});
const getPersonsSucces = (persons) => ({
  type: "GET_PERSONS_DATA_SUCCESS",
  payload: persons,
});
const getPersonsFailed = (error) => ({
  type: "GET_PERSONS_DATA_FAILED",
  payload: error,
});

export const getPersons = () => (dispatch) => {
  dispatch(getPersonsStarted());
  const token = localStorage.getItem("token");
  axios
    .post(
      "http://api.memory-lane.ml/db/getPerson",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(getPersonsSucces(res.data));
      localStorage.setItem('allPersons', JSON.stringify(res.data))
    })
    .catch((error) => dispatch(getPersonsFailed(error)));
};
