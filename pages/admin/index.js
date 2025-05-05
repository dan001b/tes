'use client';
import React, { useEffect } from 'react';

export default function Admin() {
  useEffect(async () => {
    console.log('test');
    const gql = `
    query getById($id: ID!) {
      location_by_pk(id: $id) {
        name
        exp
        token
      }
    }
  `;
    const response = await fetch('/data-api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: gql, variables: { id: 'test' } }),
    });
    const { data } = await response.json();
    console.log(data.location_by_pk);
  }, []);
  return (
    <main>
      <h1>admin</h1>
    </main>
  );
}
