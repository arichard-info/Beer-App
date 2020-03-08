import { authGetRequest } from "./index";

/**
 * Get user drinks
 */
export const getUserDrinks = async () => {
  try {
    const { data } = await authGetRequest(`/api/user/drinks/count`);
    if (!data || data === undefined)
      throw new Error("Error while getting user drinks");
    return data;
  } catch (err) {
    return {
      error: true,
      message: err
    };
  }
};
