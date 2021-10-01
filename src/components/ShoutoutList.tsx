import { useContext, useEffect, useState } from "react";
import Shoutout from "../models/shoutout-api-model";
import ShoutoutForm from "./ShoutoutForm";
import { addShoutout, fetchAllShoutouts } from "../services/ShoutoutApiService";
import "./ShoutoutList.css";
import { AuthContext } from "../context/auth-context";

const ShoutoutList = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const { user } = useContext(AuthContext);
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
  return (
    <div className="ShoutoutList">
      <ul>
        {shoutouts.map((shoutout) => (
          <li key={shoutout._id}>
            <div className="shoutOutDiv">
              <p className="shoutOutTo">Shout out to {shoutout.to}</p>
              <p className="shoutOutFrom">-from {shoutout.from}</p>
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
