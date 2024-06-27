import { exec } from 'child_process'
import util from 'util'
const execPromise = util.promisify(exec)

const executeCommand = async (command: string) => {
  try {
    const { stdout, stderr } = await execPromise(command)
    console.log(stdout)
    console.log(stderr)
    console.log(`Successfully ran command: ${command}`)
  } catch (error) {
    console.log(`Error running the command: ${command}`)
    console.log(error)
    throw new Error()
  }
}

export { executeCommand }
