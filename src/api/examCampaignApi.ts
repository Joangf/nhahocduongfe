import { api } from "./api";

export const examCampaignApi = {
  getStudentsByCampaignId: (campaignId: number) => {
    return api.get(`/api/exam-campaigns/${campaignId}/students`).then(res => res.data);
  },
  notifyStudents: (campaignId: number) => {
    return api.post(`/api/exam-campaigns/${campaignId}/notify`).then(res => res.data);
  }
};
