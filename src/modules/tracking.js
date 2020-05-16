import axios from "axios";

const addToTracked = async (id) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);

  try {
    let response = await axios.post(
      "/api/v1/user_selection",
      { headers: headers },
      { movie_person_id: id }
    );
    return { successful: true, response };
  } catch (error) {
    return { successful: false, error: error.response.data.errors[0] };
  }
};

const removeFromTracked = async (id) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);

  try {
    let response = await axios.delete(
      "/api/v1/user_selection",
      { headers: headers },
      { movie_person_id: id }
    );
    return { successful: true };
  } catch (error) {
    return { successful: false, error: error.response.data.errors[0] };
  }
};

const getUserSelection = async () => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);

  try {
    let response = await axios.get("/api/v1/user_selection", {
      headers: headers,
    });
    return { response: response.data.user_selection };
  } catch (error) {
    return { response: [], error: "Unable to get your selection" };
  }
};

export { addToTracked, removeFromTracked, getUserSelection };
