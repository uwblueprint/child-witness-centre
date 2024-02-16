import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import { UserRole } from "../../types/UserTypes";
import { HOME_PAGE, LOGIN_PAGE } from "../../constants/Routes";

type PrivateRouteProps = {
  component: React.FC;
  path: string;
  exact: boolean;
  allowedRoles: Set<UserRole>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  exact,
  path,
  allowedRoles,
}: PrivateRouteProps) => {
  const { authenticatedUser } = useContext(AuthContext);
  const userHasAllowedRole = authenticatedUser
    ? allowedRoles.has(authenticatedUser.role)
    : false;

  if (!authenticatedUser) {
    return <Redirect to={LOGIN_PAGE} />;
  }
  if (!userHasAllowedRole) {
    alert(
      "You don't have permission to access this page. Redirecting to home page.",
    );
    return <Redirect to={HOME_PAGE} />;
  }
  return <Route path={path} exact={exact} component={component} />;
};

export default PrivateRoute;
