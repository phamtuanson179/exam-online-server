export const AUTH_ERROR = {
  NOT_USER: {
    statusCode: 600,
    message: "Can't find user!",
  },
  WRONG_PASSWORD: {
    statusCode: 601,
    message: "Wrong password!",
  },
  NOT_AUTHENTICATED: {
    statusCode: 602,
    message: "You are not authenticated!",
  },
  TOKEN_NOT_VALID: {
    statusCode: 603,
    message: "Token is not valid!",
  },
};

export const SUBJECT_ERROR = {
  NOT_SUBJECT: {
    statusCode: 700,
    message: "Can't find subject",
  },
};

export const USER_ERROR = {
  NOT_USER: {
    statusCode: 800,
    message: "Can't find user",
  },
};

export const QUESTION_ERROR = {
  NOT_QUESTION: {
    statusCode: 900,
    message: "Can't find question",
  },
};

export const CLASSROOM_ERROR = {
  NOT_CLASSROOM: {
    statusCode: 900,
    message: "Can't find classroom",
  },
};

export const EXAM_ERROR = {
  NOT_EXAM: {
    statusCode: 900,
    message: "Can't find exam",
  },
};
