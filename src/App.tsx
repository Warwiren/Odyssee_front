import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  // const http = axios.create({
  //   baseURL: "http://127.0.0.1:8000/api/classes",
  //   headers: {
  //     "X-Requested-With": "XMLHttpRequest",
  //   },
  //   withCredentials: true,
  // });

  async function fetchUsers() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des classes:", error);
      throw error;
    }
  }
  fetchUsers();

  // useEffect(() => {
  //   getClasses();
  // }, []);

  // async function getClasses() {
  //   const csrf = await http.get("/sanctum/csrf-cookie");
  //   console.log("scrf = ", csrf);
  // }

  return (
    <>
      <p>pppp</p>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
