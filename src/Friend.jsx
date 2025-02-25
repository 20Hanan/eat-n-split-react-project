import Button from "./Button";

export default function Friend({
  name,
  image,
  balance,
  handleSelectedFriend,
  friend,
  selectedFriend,
}) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <>
      <li className={isSelected ? "selected" : ""}>
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
        <Button onClick={() => handleSelectedFriend(friend)}>
          {isSelected ? "close" : "select"}
        </Button>
      </li>
    </>
  );
}
