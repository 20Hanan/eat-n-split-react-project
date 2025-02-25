import Friend from "./Friend";

export default function FriendsList({
  friends,
  handleSelectedFriend,
  selectedFriend,
}) {
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
