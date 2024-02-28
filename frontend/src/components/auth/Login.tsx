import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE, SIGNUP_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import { LOGIN } from "../../graphql/Mutations";
import { IS_VERIFIED } from "../../graphql/Queries";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const [login] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  const { data } = useQuery(IS_VERIFIED, {
    skip: authenticatedUser === null,
    variables: {
      accessToken: authenticatedUser?.accessToken,
      email: authenticatedUser?.email,
    },
  });
  const isVerified = data?.isVerified;

  const onLogInClick = async () => {
    if (!isVerified) {
      window.alert(
        "Failed to log in. Please check your email for a link to verify your account.",
      );
    }
    const user: AuthenticatedUser = await authAPIClient.login(
      email,
      password,
      login,
    );
    setAuthenticatedUser(user);
  };

  const onSignUpClick = () => {
    history.push(SIGNUP_PAGE);
  };

  if (authenticatedUser && isVerified) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Login</h1>
      <form>
        <div>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="username@domain.com"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={onLogInClick}
          >
            Log In
          </button>
        </div>
      </form>
      <div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={onSignUpClick}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
