const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;
  if(!value) {
    throw new Error(`Environment variable ${key} is not set and no default value provided.`);
  }
  return value;
}

export const PORT = getEnv('PORT', '4000');
export const MONGO_URI = getEnv('MONGO_URI');