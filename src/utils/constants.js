// for Dev mode

// export const BASE_URL = "http://localhost:3000"



// for production level 

// export const BASE_URL = "/api"


export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "/api";

