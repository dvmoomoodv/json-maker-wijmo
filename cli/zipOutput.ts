import fs from 'fs'
import { zip } from 'zip-a-folder'
import path from 'path'

export async function zipGeneratedFolder() {
  const input = path.resolve('src/generated')
  const outputDir = path.resolve('dist')
  const output = path.join(outputDir, 'generated.zip')

  // ✅ dist 폴더 없으면 만들기
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  await zip(input, output)
  console.log(`📦 ZIP 저장 완료: ${output}`)
}
