import { VNPay, VnpCurrCode, VnpLocale } from "vnpay";
import { env } from "../env";

export const vnpay = new VNPay({
  tmnCode: env.VNPAY_TMN_CODE,
  secureSecret: env.VNPAY_SECURE_SECRET,
  vnpayHost: env.VNPAY_HOST,
  testMode: env.VNPAY_TEST_MODE,
  vnp_CurrCode: VnpCurrCode.VND,
  vnp_Locale: VnpLocale.VN,
});
