export function saveLocationCookie(locationData) {
  const locationJson = JSON.stringify(locationData);
  const expiryDate = locationData.exp
    ? new Date(locationData.exp)
    : getDefaultExpiryDate();
  document.cookie = `location=${locationJson};expires=${expiryDate.toUTCString()};path=/`;
}

function getDefaultExpiryDate() {
  const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + oneYearInMillis);
}
