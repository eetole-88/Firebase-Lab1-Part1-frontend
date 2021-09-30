import { useEffect, useState } from "react";
import Shoutout from "../models/shoutout-api-model";
import ShoutoutForm from "./ShoutoutForm";
import { addShoutout, fetchAllShoutouts } from "../services/ShoutoutApiService";
import { listenerCount } from "process";

const ShoutoutList = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  useEffect(() => {
    loadShoutouts();
  }, []);

  function loadShoutouts() {
    fetchAllShoutouts().then((shoutoutsFromApi) => {
      console.log(shoutoutsFromApi);
      setShoutouts(shoutoutsFromApi);
    });
  }

  function handleSubmit(shoutout: Shoutout) {
    addShoutout(shoutout).then(() => {
      loadShoutouts();
    });
  }
  return (
    <div className="ShoutoutList">
      <ul>
        {shoutouts.map((shoutout) => (
          <li key={shoutout._id}>
            <div className="shoutOutDiv">
              <p className="shoutOutTo">{`Shout out to ${shoutout.to}`}</p>
              <p className="shoutOutFrom">{`- from ${shoutout.from}`} </p>
              <p className="shoutOutMessage">{shoutout.message}</p>
            </div>
          </li>
        ))}
      </ul>
      <ShoutoutForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ShoutoutList;
