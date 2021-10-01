import { createContext } from "react";
import Shoutout from "..//models/shoutout-api-model";

interface PersonalShoutoutContextModel {
  personalShoutout: Shoutout[];
  removeShoutout: (to: string) => void;
}

const defaultValues: PersonalShoutoutContextModel = {
  personalShoutout: [],
  removeShoutout: () => {},
};

const PersonalShoutoutContext = createContext(defaultValues);

export default PersonalShoutoutContext;
