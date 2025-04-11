import fs from 'fs'
import path from 'path'

export interface ParsedField {
  name: string
  type: string
}

const typeMap: Record<string, string> = {
  text: 'string',
  number: 'number',
  boolean: 'boolean',
  date: 'string', // ISO string
}

export function parseUstraFile(filePath: string): ParsedField[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const modelBlock = content.match(/model\s*{([\s\S]*?)}/)

  if (!modelBlock) {
    throw new Error(`❌ 'model { ... }' 블록을 찾을 수 없습니다: ${filePath}`)
  }

  const lines = modelBlock[1]
    .split('\\n')
    .map((line) => line.trim())
    .filter((line) => line)

  const fields: ParsedField[] = lines.map((line) => {
    const [name, rawType] = line.split(/\\s+/)
    const type = typeMap[rawType] || 'string'
    return { name, type }
  })

  return fields
}
