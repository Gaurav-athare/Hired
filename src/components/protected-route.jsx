/* eslint-disable react/prop-types */
// Disables the ESLint warning for not explicitly defining PropTypes for React props.

import { Navigate, useLocation } from "react-router-dom";
// Navigate is used to redirect the user to another route.
// useLocation gives access to the current URL path (used to check where the user is).

import { useUser } from "@clerk/clerk-react";
// useUser is a hook provided by Clerk to get authentication status and user details.

const ProtectedRoute = ({ children }) => {
  // This component wraps around protected routes to control access based on user status.

  const { isSignedIn, isLoaded, user } = useUser();
  // isSignedIn: boolean - true if the user is signed in.
  // isLoaded: boolean - true if Clerk has finished loading user data.
  // user: object - the actual user object returned by Clerk, includes custom metadata.

  const { pathname } = useLocation();
  // pathname is the current URL route the user is trying to access.

  // If the user data has loaded, and the user is NOT signed in
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
    // Redirect the user to the homepage with a sign-in query param.
    // This will trigger the sign-in modal to open.
  }

  // If user exists but doesn't have a "role" assigned in metadata,
  // and is not currently on the onboarding page
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
    // Redirect user to onboarding page to set their role or finish profile setup.
  }

  // If all checks pass, render the protected route (i.e., the actual page/component)
  return children;
};

export default ProtectedRoute;
