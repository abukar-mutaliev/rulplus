import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envContent = `# Environment Configuration
NODE_ENV=development
PORT=5000

# Database Configuration - PostgreSQL + Prisma
DATABASE_URL=postgresql://postgres:bmw@localhost:5432/rulplus_db

# JWT Configuration
JWT_SECRET=rulplus_super_secret_jwt_key_change_in_production_2024
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DESTINATION=./uploads

# Security Configuration
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=true
LOG_MAX_FILES=14d
LOG_MAX_SIZE=20m
`;

const envPath = path.join(__dirname, '.env');
fs.writeFileSync(envPath, envContent, 'utf8');
console.log('✅ Файл .env создан успешно!');
