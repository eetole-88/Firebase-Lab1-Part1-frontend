import "./ShoutoutListByUser.css";
import ShoutoutForm from "./ShoutoutForm";
import Shoutout from "../models/shoutout-api-model";
import { useCallback, useEffect, useState } from "react";
import {
  addShoutout,
  deleteShoutout,
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

  const loadShoutouts = useCallback(
    function () {
      fetchShoutoutsByTo(name).then((response) => setShoutouts(response));
    },
    [name]
  );

  function handleDeleteShoutout(shoutoutId: string): void {
    deleteShoutout(shoutoutId).then(loadShoutouts);
  }

  useEffect(() => {
    loadShoutouts();
  }, [loadShoutouts]);

  return (
    <div className="ShoutoutListByUser">
      <Link to="/" className="backLink">
        Back To All Shout Outs
      </Link>
      <ul>
        {shoutouts.map((shoutout) => (
          <li key={shoutout._id}>
            <div className="shoutOutDiv">
              <h3 className="shoutOutTo">Shout out to {shoutout.to}</h3>
              {`- from ${shoutout.from}`}
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
              onClick={() => {
                handleDeleteShoutout(shoutout._id!);
              }}
            >
              Remove Shout Out
            </button>
          </li>
        ))}
      </ul>
      <ShoutoutForm onSubmit={handleSubmit} name={name} />
    </div>
  );
};

export default ShoutoutListByUser;
