const userId = localStorage.getItem("uid");

export const LANDING = "/";
export const SIGN_UP = "/signup";
export const SIGN_IN = "/signin";
export const HOME = "/products";
export const ACCOUNT = "/account";
export const PASSWORD_FORGET = "/pw-forget";
export const LANDDETAILS = "/land-details/:id";
// export const DASHBOARD = "/dashboard/:id";
export const DASHBOARD = `/dashboard/${userId}`;
export const BLOG = "/agricultural-blog";
