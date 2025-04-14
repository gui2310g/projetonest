export function generateSku(nome: string): string {
  const slug = nome.toUpperCase().replace(/\s+/g, '-');
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${slug}-${timestamp}-${random}`;
}