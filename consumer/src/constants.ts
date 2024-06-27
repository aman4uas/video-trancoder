const DB_NAME = 'main'
const POOLING_DELAY = 15 /* In seconds */

const SQS_REGION = 'ap-south-1'
const MESSAGE_VISIBILITY_TIMEOUT = 5 * 60 * 60 /* In seconds */
const MESSAGE_WAIT_TIME = 0 /* In seconds */

const CLUSTER_REGION = 'ap-south-1'
const CLUSTER_SUBNET_1 = 'subnet-0b19535b96ee099a3'
const CLUSTER_SUBNET_2 = 'subnet-0ef53c6e8cd3143c8'
const CLUSTER_SUBNET_3 = 'subnet-0fb2b209f891136c6'
const CLUSTER_SECURITY_GROUP = 'sg-01744aac12357ee0e'

const BUCKET_REGION = 'ap-south-1'
const MAIN_BUCKET_NAME = 'video-codec-hub'
const TEMP_BUCKET_NAME = 'video-codec-hub-temp'

export {
  DB_NAME,
  POOLING_DELAY,
  SQS_REGION,
  MESSAGE_VISIBILITY_TIMEOUT,
  MESSAGE_WAIT_TIME,
  CLUSTER_REGION,
  CLUSTER_SUBNET_1,
  CLUSTER_SUBNET_2,
  CLUSTER_SUBNET_3,
  CLUSTER_SECURITY_GROUP,
  MAIN_BUCKET_NAME,
  TEMP_BUCKET_NAME,
  BUCKET_REGION,
}
