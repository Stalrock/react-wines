import React from "react";

function Home(props) {
  document.title = props.title;
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default Home;
