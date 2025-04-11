#!/usr/bin/env tsx
import fs from 'fs'
import path from 'path'
import { parseUstraFile } from './parseUstra'
import { generateModelCode } from './generateModel'
import { generateGridCode } from './generateGrid'
import { generateServiceCode } from './generateService'
import { generateOpenApiSchema } from './generateSchema'
import { zipGeneratedFolder } from './zipOutput'

const inputDir = path.resolve('models')
const outputDir = path.resolve('src/generated')
const schemaDir = path.resolve(outputDir, 'schemas')

if (!fs.existsSync(inputDir)) {
  console.error(`❌ 입력 폴더가 존재하지 않습니다: ${inputDir}`)
  process.exit(1)
}
// 🔧 생성 폴더 정리
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
if (!fs.existsSync(schemaDir)) fs.mkdirSync(schemaDir, { recursive: true })

const files = fs.readdirSync(inputDir).filter((f) => f.endsWith('.ustra'))

for (const file of files) {
  const name = path.basename(file, '.ustra')
  const pascalName = name.charAt(0).toUpperCase() + name.slice(1)
  const filePath = path.join(inputDir, file)

  const fields = parseUstraFile(filePath)

  // 📄 생성
  fs.writeFileSync(path.join(outputDir, `${pascalName}.ts`), generateModelCode(pascalName, fields))
  fs.writeFileSync(
    path.join(outputDir, `${pascalName}Grid.vue`),
    generateGridCode(pascalName, fields),
  )
  fs.writeFileSync(
    path.join(outputDir, `${pascalName}Service.ts`),
    generateServiceCode(pascalName, fields),
  )
  fs.writeFileSync(
    path.join(schemaDir, `${pascalName}.openapi.json`),
    generateOpenApiSchema(pascalName, fields),
  )

  console.log(`✅ [${file}] → ${pascalName}.* 생성 완료`)
}

// 📦 ZIP 압축
await zipGeneratedFolder()
