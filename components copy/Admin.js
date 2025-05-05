"use client";

import React, { useState } from "react";
import { saveLocationCookie } from "./utils/cookieUtils";

function Admin() {
  const [locationCode, setLocationCode] = useState("");

  const submit = async () => {
    try {
      const locationData = await fetchLocationData(locationCode);
      saveLocationCookie(locationData);
      window.location.href = "/";
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  return (
    <div className="admin-container">
      <input
        type="text"
        value={locationCode}
        onChange={(e) => setLocationCode(e.target.value)}
        placeholder="Enter code"
      />
      <button onClick={submit}>Send</button>
    </div>
  );
}

async function fetchLocationData(code) {
  const gql = `
    query getById($id: ID!) {
      location_by_pk(id: $id) {
        name
        exp
        token
      }
    }
  `;
  const response = await fetch("/data-api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: gql, variables: { id: code } }),
  });
  const { data } = await response.json();
  return data.location_by_pk;
}

export default Admin;
