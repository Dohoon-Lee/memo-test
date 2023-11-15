import React, { useState } from "react";
import styles from "./App.module.css";

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .split("")
    .map((c) => {
      switch (c) {
        case "x":
          return ((Math.random() * 16) | 0).toString(16);
        case "y":
          return (((Math.random() * 4) | 0) + 8).toString(16);
        default:
          return c;
      }
    })
    .join("");
}

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [isLoginButtonEnabled, setLoginButtonEnabled] = useState(false);
  const [isLoginButtonClicked, setLoginButtonClicked] = useState(false);

  const handleAccessTokenChange = (e) => {
    // const value = e.target.value;
    const value = uuid();
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/g;

    setAccessToken(value);
    setLoginButtonEnabled(value.trim() !== "" && regex.test(value));
  };

  const handleLoginClick = () => {
    setLoginButtonClicked(true);
  };

  const [showToDo, setShowToDo] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showBooks, setShowBooks] = useState(false);

  return (
    <>
      <div className={styles.loginForm}>
        <div>
          Access Token:
          <input
            type="text"
            id="access_token"
            className={styles.access_token}
            value={accessToken}
            onChange={handleAccessTokenChange}
            disabled={isLoginButtonClicked}
          />
        </div>
        <button
          id="login"
          onClick={handleLoginClick}
          disabled={!isLoginButtonEnabled || isLoginButtonClicked}
        >
          LOGIN
        </button>
      </div>
      {isLoginButtonClicked && (
        <div className={styles.pulldown}>
          <div
            id="category-1"
            onClick={() => {
              setShowToDo(!showToDo);
              setShowRestaurants(false);
              setShowBooks(false);
            }}
          >
            ToDo
          </div>
          {showToDo && <div>Pay My Taxes</div>}
          <div
            id="category-2"
            onClick={() => {
              setShowRestaurants(!showRestaurants);
              setShowToDo(false);
              setShowBooks(false);
            }}
          >
            Restaurants
          </div>
          {showRestaurants && (
            <>
              <div>Blue Plate</div>
              <div>Daily Grill</div>
            </>
          )}
          <div
            id="category-3"
            onClick={() => {
              setShowBooks(!showBooks);
              setShowToDo(false);
              setShowRestaurants(false);
            }}
          >
            Books
          </div>
          {showBooks && <div>My Books</div>}
        </div>
      )}
    </>
  );
};

export default App;
