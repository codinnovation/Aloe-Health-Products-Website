import React from "react";
import Header from "../header";

function Index({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Index;
