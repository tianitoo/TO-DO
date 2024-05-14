import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button onClick={() => signOut({ redirect: false, callbackUrl: "/" })}>
      Sign out
    </button>
  );
};

export default SignOut;
