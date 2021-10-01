import { useEffect, useState } from "react";
import Shoutout from "../models/shoutout-api-model";
import ShoutoutForm from "./ShoutoutForm";
import { addShoutout, fetchAllShoutouts } from "../services/ShoutoutApiService";
import "./ShoutoutList.css";
import { Link } from "react-router-dom";

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
            <div className="shoutOutTo">
              {" "}
              <h3>
                Shout out to
                <Link to="/user/:name"> {shoutout.to} </Link>
              </h3>
              {`- from ${shoutout.from}`}{" "}
            </div>
            <p className="shoutOutMessage">{shoutout.message}</p>
          </li>
        ))}
      </ul>
      <ShoutoutForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ShoutoutList;
