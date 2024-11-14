import { api } from "@/shared/api/interceptors";

export const getreport = () => {
  return api({
    url: '/api/vital/bloodsugar/report?nickname=어린이 서원&startDate=2024-02-26&endDate=2024-03-03',
    method: 'get',
  });
};