import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

expand(config());

const schema = z.object({
  HOST: z.string().trim().min(1),
  PORT: z.coerce.number().int().positive(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DB_URI: z.string().trim().min(1),
  JWT_REFRESH_SECRET: z.string().trim().min(1),
  JWT_ACCESS_SECRET: z.string().trim().min(1),
});

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(parsedEnv.error.format(), null, 4));
  process.exit(1);
}

export default parsedEnv.data;
