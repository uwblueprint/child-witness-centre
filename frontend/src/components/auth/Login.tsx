import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useMutation, useQuery } from "@apollo/client";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE, SIGNUP_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import { LOGIN, LOGIN_WITH_GOOGLE } from "../../graphql/Mutations";
import { IS_VERIFIED } from "../../graphql/Queries";

type GoogleResponse = GoogleLoginResponse | GoogleLoginResponseOffline;

type GoogleErrorResponse = {
  error: string;
  details: string;
};

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const [login] = useMutation<{ login: AuthenticatedUser }>(LOGIN);
  const [loginWithGoogle] = useMutation<{ loginWithGoogle: AuthenticatedUser }>(
    LOGIN_WITH_GOOGLE,
  );

  const { data } = useQuery(IS_VERIFIED, {
    skip: authenticatedUser === null,
    variables: {
      accessToken: authenticatedUser?.accessToken,
      email: authenticatedUser?.email,
    },
  });
  const isVerified = data?.isVerified;

  const onLogInClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.login(
      email,
      password,
      login,
    );
    setAuthenticatedUser(user);
    if (isVerified === false) {
      window.alert(
        "Failed to log in. Please check your email for a link to verify your account.",
      );
    }
  };

  const onSignUpClick = () => {
    history.push(SIGNUP_PAGE);
  };

  const onGoogleLoginSuccess = async (idToken: string) => {
    const user: AuthenticatedUser = await authAPIClient.loginWithGoogle(
      idToken,
      loginWithGoogle,
    );
    setAuthenticatedUser(user);
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
        <GoogleLogin
          clientId={process.env.REACT_APP_OAUTH_CLIENT_ID || ""}
          buttonText="Login with Google"
          onSuccess={(response: GoogleResponse): void => {
            if ("tokenId" in response) {
              onGoogleLoginSuccess(response.tokenId);
            } else {
              // eslint-disable-next-line no-alert
              window.alert(response);
            }
          }}
          onFailure={(error: GoogleErrorResponse) =>
            // eslint-disable-next-line no-alert
            window.alert(JSON.stringify(error))
          }
        />
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
