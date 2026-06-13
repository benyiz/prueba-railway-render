const { execSync } = require('child_process')

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' })
}

try {
  run('docker compose -f docker-compose.test.yml up -d')
  run('npx prisma migrate deploy')
  run('jest --detectOpenHandles --forceExit')
} catch (error) {
  process.exitCode = 1
} finally {
  run('docker compose -f docker-compose.test.yml down')
}