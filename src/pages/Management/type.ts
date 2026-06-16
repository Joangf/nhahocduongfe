export interface IOrganization {
  name: string;
  areaCode: string;
  address: any;
  classes: any;
  inputClassName: string;
}

export interface IUserInformation {
  username: string;
  name: string;
  company: string;
  province: string;
  school: string;
  password: string;
  rePassword: string;
  areaCode: string;
  classes: any;
  inputClassName: string;
}

export interface IUpdatePassword {
  password: string;
  rePassword: string;
}
