/* eslint-disable react/prop-types */
import * as React from "react";

const UserContext = React.createContext();
UserContext.displayName = "UserContext";

function UserProvider({ children }) {
  const userReducer = (state, action) => {
    switch (action.type) {
      case "ready": {
        return { ...state, status: "ready" };
      }
      case "connect": {
        return { ...state, wallet: action.payload.wallet };
      }
      case "loading":
        return { ...state, status: "loading" };
      case "submitting":
        return { ...state, status: "submitting" };
      case "success":
        return {
          wallet: action.payload.wallet,
          mailingStatus: action.payload.mailingStatus,
          status: "success",
        };
      case "failed":
        return {
          ...state,
          status: "failed",
        };
      case "logout":
        return {
          wallet: null,
          mailingStatus: "unknown",
          status: "logout",
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

  const [user, dispatch] = React.useReducer(userReducer, {
    wallet: null,
    mailingStatus: "unknown",
    status: "idle",
  });

  const value = [user, dispatch];

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
