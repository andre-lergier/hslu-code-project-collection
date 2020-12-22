/**
 * General
 */
export interface State {
  token: string;
  user?: unknown;
}

/**
 * View elements
 */
export interface Link {
  url: string;
  title?: string;
  tags?: string[];
}

export interface HighlightedTitle {
  highlighted: string;
  prepend?: string;
  append?: string;
}

export interface ProjectData {
  title: string;
  year?: number;
  private: boolean;

  publicLink: Link;
  devLink?: Link;
  stageLink?: Link;

  repository: {
    platform: string;
    name: string;
    url: string;
  };

  database?: Link;
}

/**
 * Data
 */
export interface User {
  name?: {
    firstname?: string;
    familyname?: string;
  };
  email: string;
  authorizedByAdmin?: boolean;
}

/**
 * Errors, Input Validation
 */
export interface Error {
  name: string;
  message: string;
  errorDetails?: object;
  response?: object;
  config?: object;
}

export interface CalloutContent {
  title: string;
  message?: string;
  fieldErrors?: InputValidationError[];
}

export interface InputValidationError {
  msg: string;
  param: string;
  value: string;
  location: string;
}

export interface FieldsObject {
  [key: string]: InputField;
}

export interface InputField {
  value: string;
  error: string;
}
