import { ReactNode, useState } from "react";
import Shoutout from "..//models/shoutout-api-model";
import PersonalShoutoutContext from "./PersonalShoutoutContext";

interface Props {
  children: ReactNode;
}

const PersonalShoutoutContextProvider = ({ children }: Props) => {
  const [personal, setPersonal] = useState<Shoutout[]>([]);
  const removeShoutout = (to: string): void => {
    const index: number = personal.findIndex((item) => item.to === to);
    setPersonal((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };
  return (
    <PersonalShoutoutContext.Provider
      value={{ personalShoutout, removeShoutout }}
    >
      {children}
    </PersonalShoutoutContext.Provider>
  );
};

export default PersonalShoutoutContextProvider;
