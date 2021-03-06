import { FormEvent, useContext, useRef, useState } from "react";
import Shoutout from "..//models/shoutout-api-model";
import "./ShoutoutForm.css";
import { AuthContext } from "../context/auth-context";
import { storage } from "../firebaseConfig";
import { getDownloadURL, uploadBytes, ref } from "@firebase/storage";

interface Props {
  onSubmit: (item: Shoutout) => void;
  name: string;
}

const ShoutoutForm = ({ onSubmit, name }: Props) => {
  const [to, setTo] = useState(name);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const userName: string = user?.displayName ?? "Anonymous";
  const imageInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const item: Shoutout = {
      to: to,
      from: userName,
      message: message,
    };

    console.log(to);
    console.log(name);
    const files = imageInputRef.current?.files;
    if (files && files[0]) {
      const imageFile = files[0];
      console.log(imageFile.name, imageFile.size);
      const storageRef = ref(storage, "user-images" + imageFile.name);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadUrl: string = await getDownloadURL(snapshot.ref);
      console.log(downloadUrl);
      item.imageUrl = downloadUrl;
    }

    onSubmit(item);
    clearForm();
  }

  function clearForm() {
    formRef.current?.reset();
    setTo("");
    setMessage("");
  }

  return (
    <section>
      <form className="ShoutoutForm" onSubmit={handleSubmit} ref={formRef}>
        <h2>Leave a Shout Out</h2>
        <p>
          <label htmlFor="ShoutoutForm__to">To</label>
        </p>
        <p>
          {!name ? (
            <input
              type="text"
              id="ShoutoutForm__to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          ) : (
            <p>{name}</p>
          )}
        </p>
        <p>
          <label htmlFor="ShoutoutForm__from">From</label>
        </p>
        <p>-{userName}</p>
        <p>
          <label htmlFor="ShoutoutForm__message">Shout Out</label>
        </p>
        <p>
          <textarea
            id="ShoutoutForm__message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="ShoutoutForm__image">Image (optional)</label>
          <input id="ShoutoutForm_image" ref={imageInputRef} type="file" />
        </p>
        <p>
          <button type="submit">Submit Shout Out!</button>
        </p>
      </form>
    </section>
  );
};

export default ShoutoutForm;
