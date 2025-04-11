import type { ParsedField } from './parseUstra.ts'

export function generateModelCode(modelName: string, fields: ParsedField[]): string {
  const fieldLines = fields.map((field) => `  ${field.name}: ${field.type}`).join('\n')

  return `export interface ${modelName} {\n${fieldLines}\n}\n`
}
