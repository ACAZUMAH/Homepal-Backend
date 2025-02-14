import createError from "http-errors";
import { logger } from "src/logger/logger";
import axios, { Axios } from "axios";

interface SendSmsNotification {
  to: string;
  content: string;
}

/**
 *
 * @param data
 * @returns
 */
export const sendSms = async (data: SendSmsNotification) => {
  const url = `${process.env.SMS_API_URL}`;
  const apiKey = `${process.env.SMS_API_KEY}`;
  const info = {
    key: apiKey,
    msisdn: data.to,
    message: data.content,
    sender_id: "findjobs",
  };
  try {

    const response = await axios.post(url, info);

    const resStringfy = JSON.stringify(response.data);

    if (!resStringfy.includes(data.to.replace("+", ""))) {
      throw new createError.InternalServerError(
        `Failed to send sms: ${resStringfy}`
      );
    }

  } catch (error) {
    logger.error("failed to send sms:", error);
    return false;
  }
  return true;
};
