import { number, object, string } from 'yup';

type EnviromentConfiguration = {
  NODE_ENV: 'development' | 'test' | 'production';
  NEXT_PUBLIC_REMOTE_URL: string;
  NEXT_PUBLIC_BASE_URL: string;
  ACCESS_TOKEN_BUFFER_TIME: number;
};

class AppConfiguration {
  private static envConfigurationCache: EnviromentConfiguration | null = null;
  public static get<T extends keyof EnviromentConfiguration>(key: T): EnviromentConfiguration[T] {
    return this.validatedEnv[key];
  }

  private static get validatedEnv(): EnviromentConfiguration {
    if (this.envConfigurationCache) return this.envConfigurationCache;
    this.envConfigurationCache = this.validateEnv();
    return this.envConfigurationCache;
  }

  private static validateEnv(): EnviromentConfiguration {
    const envConfiguration = object()
      .shape({
        NODE_ENV: string().oneOf(['development', 'test', 'production']).required(),
        NEXT_PUBLIC_REMOTE_URL: string().required(),
        NEXT_PUBLIC_BASE_URL: string().required(),
        ACCESS_TOKEN_BUFFER_TIME: number().default(60),
      })
      .validateSync(process.env, {
        stripUnknown: true,
      });
    return envConfiguration;
  }
}

export default AppConfiguration;
