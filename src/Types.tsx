export interface SignUpData {
  name: string;
  username: string;
  mobileNo: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
  _id: string;
}

export interface Users extends SignUpData {
  _id: string;
  show: boolean;
}

export interface Task {
  title: string;
  description: string;
}
