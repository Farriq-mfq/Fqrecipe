export const AUTH_TOKEN_NAME = "_auth_fqrecipe";
export const getCookie = (name: string): string => {
  const cookies = `; ${document.cookie}`;
  const splits = cookies.split(`; ${name}=`);
  if (splits.length === 2) return splits.pop()?.split(";").shift()!
  return ''
};


export const delete_cookie = (name: string): void => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}