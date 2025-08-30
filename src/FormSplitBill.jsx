import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, handleFormSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill? bill - paidByUser :"";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    handleFormSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form
      className="form-split-bill"
      onSubmit={handleSubmit}
    >
      <h2>Split the bill with {selectedFriend?.name}</h2>
      <label>💰Bill Value</label>
      <input
        type="string"
        onChange={e => setBill(Number(e.target.value))}
        value={bill}
      />

      <label>🧍‍♂️Your Expense</label>
      <input
        type="string"
        onChange={e =>
          e.target.value > bill ? paidByUser : setPaidByUser(Number(e.target.value))
        }
        value={paidByUser}
      />

      <label>👨🏽‍🤝‍👨🏻X's Expense</label>
      <input
        type="string"
        disabled
        value={paidByFriend}
      />

      <label>🤑Who is paying the Bill?</label>
      <select
        onChange={e => setWhoIsPaying(e.target.value)}
        value={whoIsPaying}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>split bill</Button>
    </form>
  );
}
