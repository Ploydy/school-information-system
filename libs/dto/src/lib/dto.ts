
export type LoginResponse = {
  fullName: string,
  email: string,
}
export type LoginRequest = {
  username: string,
  password: string,
}

export type UserResponse = {
  username: any;
  id: string;
  fullName: string;
  email: string;
  password: string;
}
export type UserRequest = {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

export type CourseResponse = {
  id: string,
  name: string,
  totalUnits: number,
  description: string,
}
export type CourseRequest = {
  id: string,
  name: string,
  totalUnits: number,
  description: string,
}