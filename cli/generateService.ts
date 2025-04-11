import type { ParsedField } from './parseUstra.ts'

export function generateServiceCode(modelName: string, fields: ParsedField[]): string {
  const lcName = modelName.charAt(0).toLowerCase() + modelName.slice(1)
  const pkField = fields.find((f) => f.name === 'id')?.name || 'id'

  return (
    `import type { ${modelName} } from './${modelName}'\n\n` +
    `const baseUrl = '/api/${lcName}'\n\n` +
    `export async function get${modelName}List(): Promise<${modelName}[]> {
  return await fetch(\`\${baseUrl}/list\`).then(r => r.json())
}\n\n` +
    `export async function create${modelName}(data: ${modelName}): Promise<void> {
  await fetch(\`\${baseUrl}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}\n\n` +
    `export async function update${modelName}(data: ${modelName}): Promise<void> {
  await fetch(\`\${baseUrl}/\${data.${pkField}}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}\n\n` +
    `export async function delete${modelName}(${pkField}: number): Promise<void> {
  await fetch(\`\${baseUrl}/\${${pkField}}\`, {
    method: 'DELETE'
  })
}
`
  )
}
