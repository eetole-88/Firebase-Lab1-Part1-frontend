import { FormEvent, useState } from "react";
import Shoutout from "..//models/shoutout-api-model";

interface Props {
  onSubmit: (item: Shoutout) => void;
}

const ShoutoutForm = ({ onSubmit }: Props) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const item: Shoutout = {
      to: to,
      from: from,
      message: message,
    };
    onSubmit(item);
    setTo("");
    setFrom("");
    setMessage("");
  }

  return (
    <form className="ShoutoutForm" onSubmit={handleSubmit}>
      <h2>Leave a Shout Out</h2>
      <p>
        <label htmlFor="ShoutoutForm__to">To</label>
        <input
          type="text"
          id="ShoutoutForm__to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="ShoutoutForm__from">From</label>
        <input
          type="text"
          id="ShoutoutForm__from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="ShoutoutForm__message">Shout Out</label>
        <input
          type="text"
          id="ShoutoutForm__message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </p>
      <p>
        <button type="submit">Submit Shout Out!</button>
      </p>
    </form>
  );
};

export default ShoutoutForm;
