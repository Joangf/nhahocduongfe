import { api } from "./api";

export interface Dentist {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  status?: boolean;
}

export const dentistApi = {
  /** Lấy danh sách tất cả bác sĩ từ bảng nhahocduong_dentist */
  getAll: () => api.get<Dentist[]>("/api/dentists"),
};
