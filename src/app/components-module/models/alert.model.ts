export enum AlertTypes {
  success = 'success',
  warning = 'warning',
  danger = 'danfer',
}

export interface AlertModel {
  message: string;
  type: AlertTypes;
}
