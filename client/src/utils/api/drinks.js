import { getRequest } from "@/utils/api";

/**
 * Get user drinks
 */
export const getUserDrinks = async () => {
  try {
    const { data } = await getRequest(`/api/user/drinks/count`);
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
