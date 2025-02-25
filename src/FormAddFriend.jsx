import { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ handleAddFriend }) {
  const [name, setname] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/48?u=118836");
  function handlename(e) {
    setname(e.target.value);
  }
  function handleAddImg(e) {
    setImg(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !img) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      img,
      balance: 0,
      id,
    };
    handleAddFriend(newFriend);
    setname("");
    setImg("https://i.pravatar.cc/48?u=118836");
  }
  return (
    <>
      <form
        className="form-add-friend"
        onSubmit={e => handleSubmit(e)}
      >
        <label>👬 Friend name</label>
        <input
          type="text"
          value={name}
          onChange={e => handlename(e)}
        />

        <label>🌆 image url</label>
        <input
          type="text"
          value={img}
          onChange={e => handleAddImg(e)}
        />
        <Button> add</Button>
      </form>
    </>
  );
}
