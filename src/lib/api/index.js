import { clientApi } from './clientApi';

export const installAxiosConfig = (app) => {
  app.provide('axios', clientApi);
};
