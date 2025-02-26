import { UserProfile } from "@spotify/web-api-ts-sdk";

const UserInfo = ({ user }: { user: UserProfile }) => {
  return (
    <div>
      <p>Display Name: {user.display_name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserInfo;
