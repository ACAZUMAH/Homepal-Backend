import createError from "http-errors";
import { upsertUser } from "../user";
import { createAuth } from "./index";
import { isDevelopment } from "src/common/contants";
import { sendSms } from "../notifications/nalo";
import { upsertUserInput } from "src/common/interfaces";

/**
 * the logic with phone number logic
 * @param data - user info
 * @returns success message
 */
export const loginWithPhoneNumber = async (data: upsertUserInput) => {
  const { phoneNumber } = data;
  const user = await upsertUser({ phoneNumber });
  const token = await createAuth(user._id, 5);

  const message = `Your Homepal verification code is ${token}`;

  if (!(await sendSms({ to: phoneNumber, content: message }))) {
    throw createError.InternalServerError(
      "Failed to send OTP code at the moment, please try again later"
    );
  }

  if (isDevelopment) return { message };

  return { message: "OTP send successfully" };
};
