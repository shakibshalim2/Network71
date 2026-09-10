import { createHash } from 'node:crypto'
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = process.cwd()
const artifacts = path.resolve(root, 'artifacts')
const stage = path.join(artifacts, 'network71-cpanel')
const publicRoot = path.join(stage, 'public_html')
const privateRoot = path.join(stage, 'network71-private')

if (!stage.startsWith(`${artifacts}${path.sep}`)) throw new Error('Unsafe package output path.')
await rm(stage, { recursive: true, force: true })
await mkdir(publicRoot, { recursive: true })
await mkdir(privateRoot, { recursive: true })

async function copy(source, destination) {
  const sourcePath = path.join(root, source)
  await stat(sourcePath)
  await cp(sourcePath, path.join(stage, destination), { recursive: true })
}

await copy('dist', 'public_html')
await mkdir(path.join(publicRoot, 'api'), { recursive: true })
await copy('backend/deploy/api-index.php', 'public_html/api/index.php')
await copy('backend/deploy/project.php', 'public_html/project.php')
await copy('backend/deploy/htaccess.example', 'public_html/.htaccess')
await copy('backend/deploy/user.ini.example', 'public_html/.user.ini')

for (const directory of ['app', 'assets', 'bin', 'content', 'database', 'vendor']) {
  await copy(`backend/${directory}`, `network71-private/${directory}`)
}
await copy('backend/public/index.php', 'network71-private/public/index.php')
await copy('backend/config/example.php', 'network71-private/config/local.php.example')
await copy('backend/composer.json', 'network71-private/composer.json')
await copy('backend/composer.lock', 'network71-private/composer.lock')
await copy('docs/deployment-checklist.md', 'DEPLOYMENT.md')

for (const directory of ['media', 'applications', 'private-documents', 'backups']) {
  const target = path.join(privateRoot, 'storage', directory)
  await mkdir(target, { recursive: true })
  await writeFile(path.join(target, '.gitkeep'), '')
}

const forbidden = [
  'network71-private/config/local.php',
  'network71-private/tests',
  'network71-private/public/router.php',
  'network71-private/storage/local-admin.txt',
  'network71-private/storage/database',
]
for (const relative of forbidden) {
  try {
    await stat(path.join(stage, relative))
    throw new Error(`Private development file entered package: ${relative}`)
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }
}

async function files(directory) {
  const result = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) result.push(...await files(fullPath))
    else result.push(fullPath)
  }
  return result
}

const manifest = {}
for (const file of (await files(stage)).sort()) {
  const relative = path.relative(stage, file).replaceAll('\\', '/')
  const contents = await readFile(file)
  for (const forbiddenValue of ['owner@network71.local', 'network71_dev', root.replaceAll('\\', '/')]) {
    if (contents.includes(Buffer.from(forbiddenValue))) throw new Error(`Development value entered package: ${relative}`)
  }
  manifest[relative] = createHash('sha256').update(contents).digest('hex')
}
await writeFile(path.join(stage, 'release-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)

const archive = path.join(artifacts, 'network71-cpanel.tar.gz')
await rm(archive, { force: true })
const tar = spawnSync('tar', ['-czf', archive, '-C', stage, '.'], { stdio: 'inherit' })
if (tar.error || tar.status !== 0) throw tar.error || new Error('Could not create cPanel archive.')
const archiveHash = createHash('sha256').update(await readFile(archive)).digest('hex')
await writeFile(`${archive}.sha256`, `${archiveHash}  ${path.basename(archive)}\n`)

console.log(`cPanel package ready: ${path.relative(root, archive)}`)
console.log(`Archive SHA-256: ${archiveHash}`)
console.log(`Manifest contains ${Object.keys(manifest).length} files; local config, credentials, tests and development database are excluded.`)
