import { fetchAjax } from "./index";

export const update = (updates = {}) => {
  const genericError = "Erreur lors de la mise à jour de l'utilisateur";
  return fetchAjax("/api/user/update", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  }).then(
    (res) => {
      if (!res.user || res.error) {
        throw new Error((res.error && res.error.message) || genericError);
      }
      return res.user;
    },
    (err) => {
      console.error(err);
      throw new Error(genericError);
    }
  );
};

export const updatePassword = (password, confirmation) => {
  const genericError = "Erreur lors de la mise à jour du mot de passe";
  return fetchAjax("/api/user/update-password", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, "password-confirm": confirmation }),
  }).then(
    (res) => {
      if (!res.user || res.error) {
        throw new Error((res.erorr && res.error.message) || genericError);
      }
      return res.user;
    },
    (err) => {
      console.error(err);
      throw new Error(genericError);
    }
  );
};
