import { api } from "./api";

export const examApi = {
  getReExams: () => {
    return api.get(`/api/exams/re-exams`).then(res => res.data);
  },
  getDashboardStats: () => {
    return api.get(`/api/dashboard/campaign-stats`).then(res => res.data);
  }
};
