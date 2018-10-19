import { Action } from '@ngrx/store';
import { Auth } from '@web/app/auth/models/auth.model';
import { Token } from '@web/app/auth/models/token.model';
import { User } from '@web/app/two/user/models/user.model';
import { Company } from '@web/app/one/company/models/company.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  RefreshToken = '[Auth] Refresh Token',
  RefreshTokenSuccess = '[Auth] Refresh Token Success',
  RefreshTokenFailure = '[Auth] Refresh Token Failure',
  CheckLogin = '[Auth] Check Login',
  CheckLoginSuccess = '[Auth] Check Login Success',
  CheckLoginFailure = '[Auth] Check Login Failure',
  Logout = '[Auth] Logout',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: { auth: Auth }) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: { token: Token, user: User, company: Company }) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(public payload: { errors: any }) { }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class RefreshToken implements Action {
  readonly type = AuthActionTypes.RefreshToken;
  constructor(public payload: { token: Token }) { }
}

export class RefreshTokenSuccess implements Action {
  readonly type = AuthActionTypes.RefreshTokenSuccess;
  constructor(public payload: { token: Token }) { }
}

export class RefreshTokenFailure implements Action {
  readonly type = AuthActionTypes.RefreshTokenFailure;
  constructor(public payload: { errors: any }) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | RefreshToken
  | RefreshTokenSuccess
  | RefreshTokenFailure
  | Logout;
