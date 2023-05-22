export const fetcher = (resource: RequestInfo, init: RequestInit) =>
  fetch(resource, init).then((res) => res.json());
