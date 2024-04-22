export default function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.href = "/";
}
