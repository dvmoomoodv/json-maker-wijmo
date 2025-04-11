import type { ParsedField } from './parseUstra.ts'

const swaggerTypeMap: Record<string, { type: string; format?: string }> = {
  string: { type: 'string' },
  number: { type: 'number' },
  boolean: { type: 'boolean' },
  date: { type: 'string', format: 'date-time' },
}

export function generateOpenApiSchema(modelName: string, fields: ParsedField[]): string {
  const properties = fields
    .map((f) => {
      const { type, format } = swaggerTypeMap[f.type] || { type: 'string' }
      return `    "${f.name}": { "type": "${type}"${format ? `, "format": "${format}"` : ''} }`
    })
    .join(',\n')

  return `{
  "title": "${modelName}",
  "type": "object",
  "properties": {
${properties}
  },
  "required": [${fields.map((f) => `"${f.name}"`).join(', ')}]
}`
}
