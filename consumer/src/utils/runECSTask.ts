import { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs'
import {
  DB_NAME,
  CLUSTER_REGION,
  CLUSTER_SUBNET_1,
  CLUSTER_SUBNET_2,
  CLUSTER_SUBNET_3,
  CLUSTER_SECURITY_GROUP,
  MAIN_BUCKET_NAME,
  TEMP_BUCKET_NAME,
  BUCKET_REGION,
} from '../constants'

const ecsClient = new ECSClient({
  region: CLUSTER_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

async function runECSTask(arrEnv: Array<Object>) {
  const arrConfig = [
    { name: 'MONGO_URI', value: process.env.MONGO_URI },
    { name: 'DB_NAME', value: DB_NAME },
    { name: 'TEMP_BUCKET_NAME', value: TEMP_BUCKET_NAME },
    { name: 'MAIN_BUCKET_NAME', value: MAIN_BUCKET_NAME },
    { name: 'BUCKET_REGION', value: BUCKET_REGION },
    { name: 'ACCESS_KEY', value: process.env.AWS_ACCESS_KEY_ID },
    { name: 'SECRET_ACCESS_KEY', value: process.env.AWS_SECRET_ACCESS_KEY },
    { name: 'MAIN_BUCKET_URL', value: process.env.MAIN_BUCKET_URL },
  ]

  const arr = [...arrConfig, ...arrEnv]

  const command = new RunTaskCommand({
    cluster: process.env.CLUSTER_ID,
    taskDefinition: process.env.CLUSTER_TASK_ID,
    launchType: 'FARGATE',
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: 'ENABLED',
        subnets: [CLUSTER_SUBNET_1, CLUSTER_SUBNET_2, CLUSTER_SUBNET_3],
        securityGroups: [CLUSTER_SECURITY_GROUP],
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: process.env.CLUSTER_IMAGE_NAME,
          environment: arr,
        },
      ],
    },
  })

  await ecsClient.send(command)
}

export { runECSTask }
