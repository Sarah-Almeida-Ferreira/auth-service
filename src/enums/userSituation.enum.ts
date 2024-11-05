type UserSituationEnumType = {
  code: number;
  description: string;
};

export const UserSituationEnum: Record<string, UserSituationEnumType> = {
  FULLY_REGISTERED: { code: 0, description: "Fully registered" },
  WAITING_CONFIRMATION_CODE: {
    code: 1,
    description: "Waiting for confirmation code",
  },
  NOT_REGISTERED: { code: 2, description: "Not registered" },
};
