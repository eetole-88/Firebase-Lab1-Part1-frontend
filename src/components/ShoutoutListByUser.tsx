import "./ShoutoutListByUser.css";
import ShoutoutList from "./ShoutoutList";
import ShoutoutForm from "./ShoutoutForm";
import Shoutout from "../models/shoutout-api-model";
import { useEffect, useState } from "react";
import {
  addShoutout,
  fetchAllShoutouts,
  fetchShoutoutsByTo,
} from "../services/ShoutoutApiService";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

interface RouteParams {
  name: string;
}

const ShoutoutListByUser = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const { name } = useParams<RouteParams>();

  function handleSubmit(shoutout: Shoutout) {
    addShoutout(shoutout).then(() => {
      loadShoutouts();
    });
  }

  function loadShoutouts() {
    fetchShoutoutsByTo(name).then((response) => setShoutouts(response));
  }

  function deleteShoutout(index: number): void {
    setShoutouts((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  useEffect(() => {
    loadShoutouts();
  }, [name]);
  return (
    <div className="ShoutoutListByUser">
      <ul>
        {shoutouts.map((shoutout, i) => (
          <li key={shoutout._id}>
            <div className="shoutOutDiv">
              <p className="shoutOutTo">
                <h3>Shout out to {shoutout.to}</h3>
                {`- from ${shoutout.from}`}
              </p>
              <p className="shoutOutMessage">{shoutout.message}</p>
            </div>
            <button
              key={i}
              onClick={() => {
                deleteShoutout(i);
              }}
            >
              Remove Shout Out
            </button>
          </li>
        ))}
      </ul>
      <ShoutoutForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ShoutoutListByUser;
