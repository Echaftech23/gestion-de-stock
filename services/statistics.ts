import axios from "@/api/axios.config";
import { Statistics } from "@/types/stats";

const API_URL = "/statistics";


export const fetchStatistics = async (): Promise<Statistics> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching statistics: " + error.message);
  }
};
