import React, { FunctionComponent, useState } from "react";
import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar";
import { Routes } from "./Components/Routes";


export const App: FunctionComponent = () => {
  const [darkTheme, setDartTheme] = useState<boolean>(false);
  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        <Navbar darkTheme={darkTheme} setDartTheme={setDartTheme} />
        <Routes />
        <Footer />
      </div>
    </div>
  );
};
