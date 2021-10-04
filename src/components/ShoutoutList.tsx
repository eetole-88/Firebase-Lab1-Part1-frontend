import { useEffect, useState } from "react";
import Shoutout from "../models/shoutout-api-model";
import ShoutoutForm from "./ShoutoutForm";
import { addShoutout, fetchAllShoutouts } from "../services/ShoutoutApiService";
import "./ShoutoutList.css";
import { storage } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { ref } from "firebase/storage";

const ShoutoutList = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const storageRef = ref(storage);

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

  function deleteShoutout(index: number): void {
    setShoutouts((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  return (
    <div className="ShoutoutList">
      <ul>
        {shoutouts.map((shoutout, i) => (
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

export default ShoutoutList;
