import "./PersonalShoutouts.css";
import ShoutoutList from "./ShoutoutList";
import ShoutoutForm from "./ShoutoutForm";
import Shoutout from "../models/shoutout-api-model";
import PersonalShoutoutContext from "../context/PersonalShoutoutContext";
import { useContext } from "react";

interface Props {
  shoutout: Shoutout;
}

const PersonalShoutouts = ({ shoutout }: Props) => {
  const { personalShoutout, removeShoutout };

  return <div className="PersonalShoutouts">PersonalShoutouts works</div>;
};

export default PersonalShoutouts;
