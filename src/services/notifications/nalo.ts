import createError from "http-errors";
import { logger } from "src/logger/logger";

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
  const phoneFormat = data.to.replace("+", "");
  const url = `${process.env.SMS_API_URL}`;
  const apiKey = `${process.env.SMS_API_KEY}`;
  const info = {
    key: apiKey,
    msisdn: `${phoneFormat}, 233xxxxxxxx`,
    message: data.content,
    sender_id: "findjobs",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    if (!response.ok) {
      throw new createError.BadGateway("Failed to send sms");
    }
  } catch (error) {
    logger.error('failed to send sms:', error)
    return false
  }
  return true;
};
