// Простой логгер для разработки
export const logger = {
  info: (message) => console.log(`ℹ️  ${message}`),
  warn: (message) => console.warn(`⚠️  ${message}`),
  error: (message) => console.error(`❌ ${message}`),
  debug: (message) => console.debug(`🐛 ${message}`)
};
