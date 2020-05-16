import axios from "axios"

const addToTracked = async (id) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);

  try {
    let response = await axios.post("/api/v1/trackers", { headers: headers }, { movie_person_id: id });
    return { successful: true };
  } catch (error) {
    return { successful: false, error: error.response.data.errors[0] }
  }
}

const removeFromTracked = async (id) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);

  try {
    let response = await axios.delete("/api/v1/trackers", { headers: headers }, { movie_person_id: id });
    return { successful: true };
  } catch (error) {
    return { successful: false, error: error.response.data.errors[0] }
  }
}

export { addToTracked, removeFromTracked }