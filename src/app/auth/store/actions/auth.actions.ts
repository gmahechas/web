import { Action } from '@ngrx/store';
import { Auth } from './../../models/auth.model';
import { Token } from './../../models/token.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  Logout = '[Auth] Logout',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: Auth) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: Token) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(public payload: string) { }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;