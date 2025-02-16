
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button
      className="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const[selectedFriend,setSelectedFriend]=useState({});
  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }
  function handleAddFriend(newFriend) {
    setFriends([...friends, newFriend]);
    setShowAddFriend(false);
  }
  function handleSelectedFriend(friend){
    setSelectedFriend(friend);
  }
  console.log(selectedFriend)

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            handleSelectedFriend={handleSelectedFriend}
            selectedFriend={selectedFriend}
          />

          {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}

          <Button onClick={handleShowAddFriend}>
            {showAddFriend ? "close" : "add friend"}
          </Button>
        </div>
        <FormSplitBill selectedFriend={selectedFriend} />
      </div>
    </>
  );
}
function FriendsList({ friends, handleSelectedFriend , selectedFriend}) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          key={friend.id}
          friend={friend}
          id={friend.id}
          name={friend.name}
          image={friend.image}
          balance={friend.balance}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({  name, image, balance, handleSelectedFriend,friend,selectedFriend }) {
  const isSelected=selectedFriend.id===friend.id;
  return (
    <>
      <li className={isSelected? "selected":""}>
        <img
          src={image}
          alt={name}
        />
        <h3>{name}</h3>
        {balance < 0 && (
          <p className="red">
            you owe {name} {balance}$
          </p>
        )}
        {balance > 0 && (
          <p className="green">
            {name} owes you {balance}$
          </p>
        )}
        {balance === 0 && <p>you and {name} are even</p>}
        <Button onClick={()=>handleSelectedFriend(friend)}>{isSelected?"close":"select"}</Button>
      </li>
    </>
  );
}

function FormAddFriend({ handleAddFriend }) {
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
function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with {selectedFriend.name}</h2>
      <label>💰Bill Value</label>
      <input type="number" />
      <label>🧍‍♂️Your Expense</label>
      <input type="number" />
      <label>👨🏽‍🤝‍👨🏻X's Expense</label>
      <input
        type="number"
        disabled
      />
      <label>🤑Who is paying the Bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>
      <Button>split bill</Button>
    </form>
  );
}
export default App;
