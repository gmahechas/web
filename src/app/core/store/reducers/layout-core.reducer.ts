import { LayoutActionTypes, LayoutActions } from '@web/app/core/store/actions/layout-core.actions';

import { UserOffice } from '@web/app/features/c/user-office/models';
import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';

export interface State {
  lang: string;
  showSidebar: boolean;
  blockedDocument: boolean;
  showSpinner: boolean;
  progressBar: boolean;
  userOffice: UserOffice;
  userOfficeProject: UserOfficeProject;
}

export const initialState: State = {
  lang: null,
  showSidebar: false,
  blockedDocument: false,
  showSpinner: false,
  progressBar: false,
  userOffice: null,
  userOfficeProject: null
};

export function reducer(state: State = initialState, action: LayoutActions): State {
  switch (action.type) {

    case LayoutActionTypes.SetDefaultLang:
    case LayoutActionTypes.ChangeLang:
      return {
        ...state,
        lang: action.payload.lang
      };

    case LayoutActionTypes.OpenSidebar:
      return {
        ...state,
        showSidebar: true
      };

    case LayoutActionTypes.CloseSidebar:
      return {
        ...state,
        showSidebar: false
      };

    case LayoutActionTypes.BlockedDocument:
      return {
        ...state,
        blockedDocument: true
      };

    case LayoutActionTypes.UnblockedDocument:
      return {
        ...state,
        blockedDocument: false
      };

    case LayoutActionTypes.ShowSpinner:
      return {
        ...state,
        showSpinner: true,
      };

    case LayoutActionTypes.CloseSpinner:
      return {
        ...state,
        showSpinner: false,
      };

    case LayoutActionTypes.ShowProgressBar:
      return {
        ...state,
        progressBar: true,
      };

    case LayoutActionTypes.CloseProgressBar:
      return {
        ...state,
        progressBar: false,
      };

    case LayoutActionTypes.SetUserOffice:
      return {
        ...state,
        userOffice: action.payload.userOffice
      };

      case LayoutActionTypes.SetUserOfficeProject:
      return {
        ...state,
        userOfficeProject: action.payload.userOfficeProject
      };

    default:
      return state;
  }
}

export const getLang = (state: State) => state.lang;
export const getShowSidebar = (state: State) => state.showSidebar;
export const getBlockedDocument = (state: State) => state.blockedDocument;
export const getShowSpinner = (state: State) => state.showSpinner;
export const getProgressBar = (state: State) => state.progressBar;
export const getUserOffice = (state: State) => state.userOffice;
export const getUserOfficeProject = (state: State) => state.userOfficeProject;
