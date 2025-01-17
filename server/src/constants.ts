const DB_NAME = 'main'
const JWT_EXPIRY = '1h'
const MAX_FILE_SIZE_IN_MB = 100
const COOKIE_EXPIRY = 60 * 60 /* In seconds */
const BUCKET_REGION = 'ap-south-1'
const BUCKET_NAME = 'video-codec-hub-temp'
const SIGNED_URL_EXPIRY = 60 * 60 /* In seconds */
const OTP_EXPIRY_TIME = 5 /* In Minutes */
const OTP_LENGTH = 4
const RESET_PASSWORD_TIME_LIMIT = '24h'

export {
  DB_NAME,
  JWT_EXPIRY,
  COOKIE_EXPIRY,
  MAX_FILE_SIZE_IN_MB,
  BUCKET_REGION,
  BUCKET_NAME,
  SIGNED_URL_EXPIRY,
  OTP_EXPIRY_TIME,
  OTP_LENGTH,
  RESET_PASSWORD_TIME_LIMIT,
}
