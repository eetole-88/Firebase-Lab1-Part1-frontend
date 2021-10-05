import { useEffect, useState } from "react";
import Shoutout from "../models/shoutout-api-model";
import ShoutoutForm from "./ShoutoutForm";
import {
  addShoutout,
  fetchAllShoutouts,
  deleteShoutout,
} from "../services/ShoutoutApiService";
import "./ShoutoutList.css";
import { Link } from "react-router-dom";

const ShoutoutList = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  useEffect(() => {
    loadShoutouts();
  }, []);

  function loadShoutouts() {
    fetchAllShoutouts().then((shoutoutsFromApi) => {
      setShoutouts(shoutoutsFromApi);
    });
  }

  function handleSubmit(shoutout: Shoutout) {
    addShoutout(shoutout).then(() => {
      loadShoutouts();
    });
  }

  function handleDeleteShoutout(shoutoutId: string): void {
    deleteShoutout(shoutoutId).then(loadShoutouts);
  }

  return (
    <div className="ShoutoutList">
      <ul>
        {shoutouts.map((shoutout) => (
          <li key={shoutout._id}>
            <div className="shoutOutDiv">
              <h3 className="shoutOutTo">
                Shout out to{" "}
                <Link to={`/user/${shoutout.to}`}>{shoutout.to}</Link>
              </h3>
              <p>{`- from ${shoutout.from}`}</p>
              <p className="shoutOutMessage">{shoutout.message}</p>
              <p>
                {shoutout.imageUrl && (
                  <img
                    className="shoutoutImage"
                    src={shoutout.imageUrl}
                    alt=""
                  />
                )}
              </p>
            </div>
            <button
              key={shoutout._id}
              onClick={() => handleDeleteShoutout(shoutout._id!)}
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

export default ShoutoutList;
