export const JsonToQueryParams = (payload: { [x: string]: string | number | boolean; }) => {
  return (
    "?" +
    Object.keys(payload)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(payload[key]);
      })
      .join("&")
  );
};
