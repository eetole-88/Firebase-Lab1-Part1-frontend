import axios from "axios";
import Shoutout from "..//models/shoutout-api-model";

const baseUrl: string = process.env.REACT_APP_SHOUTOUT_API_URL || "";
if (!baseUrl) {
  console.error("Missing config: REACT_APP_SHOUTOUT_API_URL");
}

export function fetchAllShoutouts(): Promise<Shoutout[]> {
  return axios.get(`${baseUrl}/shoutouts`).then((res) => res.data);
}

export function addShoutout(shoutout: Shoutout): Promise<Shoutout> {
  return axios.post(`${baseUrl}/shoutouts`, shoutout).then((res) => res.data);
}

export function fetchShoutoutsByTo(name: string): Promise<Shoutout[]> {
  return axios
    .get(`${baseUrl}/shoutouts`, {
      params: {
        shoutoutTo: name,
      },
    })
    .then((res) => res.data);
}

export function deleteShoutout(shoutoutId: string): Promise<void> {
  return axios.delete(`${baseUrl}/shoutouts/${encodeURIComponent(shoutoutId)}`);
}
