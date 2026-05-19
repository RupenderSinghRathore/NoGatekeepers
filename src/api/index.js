import axios from "axios";
import { BASE_URL, USE_MOCK_API } from "../config";
import { mockCalendar, mockTips } from "../data/mockData";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

let tipStore = [...mockTips];
let calendarStore = [...mockCalendar];

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 180));

export const getTips = async () => {
  // Backend CORS note: allow localhost:5173 in FastAPI CORSMiddleware, flask-cors, or Go cors middleware.
  if (USE_MOCK_API) {
    return wait([...tipStore]);
  }

  const response = await apiClient.get("/api/tips");
  return response.data;
};

export const getTipById = async (id) => {
  // Backend CORS note: allow localhost:5173 in FastAPI CORSMiddleware, flask-cors, or Go cors middleware.
  if (USE_MOCK_API) {
    return wait(tipStore.find((tip) => tip.id === id));
  }

  const response = await apiClient.get(`/api/tips/${id}`);
  return response.data;
};

export const submitTip = async (payload) => {
  // Backend CORS note: allow localhost:5173 in FastAPI CORSMiddleware, flask-cors, or Go cors middleware.
  if (USE_MOCK_API) {
    const newTip = {
      ...payload,
      id: `tip-${tipStore.length + 1}`,
      verificationCount: 0,
      verifiedBy: [],
      credibilityScore: 68,
      postedBy: "Verified Senior",
      status: "pending",
    };
    tipStore = [newTip, ...tipStore];
    return wait(newTip);
  }

  const response = await apiClient.post("/api/tips", payload);
  return response.data;
};

export const verifyTip = async (id) => {
  // Backend CORS note: allow localhost:5173 in FastAPI CORSMiddleware, flask-cors, or Go cors middleware.
  if (USE_MOCK_API) {
    let updatedTip;
    tipStore = tipStore.map((tip) => {
      if (tip.id !== id) {
        return tip;
      }

      updatedTip = {
        ...tip,
        verificationCount: tip.verificationCount + 1,
        credibilityScore: Math.min(99, tip.credibilityScore + 2),
        verifiedBy: [
          ...tip.verifiedBy,
          { name: "Campus Contributor", year: "3rd Year", branch: tip.branch },
        ],
      };

      return updatedTip;
    });

    return wait(updatedTip);
  }

  const response = await apiClient.post(`/api/tips/${id}/verify`);
  return response.data;
};

export const getCalendar = async () => {
  // Backend CORS note: allow localhost:5173 in FastAPI CORSMiddleware, flask-cors, or Go cors middleware.
  if (USE_MOCK_API) {
    return wait([...calendarStore]);
  }

  const response = await apiClient.get("/api/calendar");
  return response.data;
};

export const reviewTip = async (id, status) => {
  if (USE_MOCK_API) {
    let updatedTip;
    tipStore = tipStore.map((tip) => {
      if (tip.id !== id) {
        return tip;
      }

      updatedTip = { ...tip, status };
      return updatedTip;
    });
    return wait(updatedTip);
  }

  const response = await apiClient.post(`/api/tips/${id}/review`, { status });
  return response.data;
};

export const flagTip = async (id) => {
  if (USE_MOCK_API) {
    let updatedTip;
    tipStore = tipStore.map((tip) => {
      if (tip.id !== id) {
        return tip;
      }

      updatedTip = { ...tip, status: "flagged" };
      return updatedTip;
    });
    return wait(updatedTip);
  }

  const response = await apiClient.post(`/api/tips/${id}/flag`);
  return response.data;
};
