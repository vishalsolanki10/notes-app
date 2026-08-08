import { useEffect } from "react";

import { getNotes } from "../api/notes-api";

const HomePage = () => {
  useEffect(() => {
    getNotes()
      .then(console.log)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Notes App
      </h1>
    </div>
  );
};

export default HomePage;