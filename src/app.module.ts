import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    // Just to recap, what happens here is that we need the config module to finish
    // its initialization and be available before we're able to use dependency
    // injection.
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    // That is why we're setting the type module to initialize asynchronously.
    TypeOrmModule.forRootAsync({
      // That is all I need to do to make my config service available for dependency
      // injection in my factory method.
      imports: [ConfigModule], // That means it depends on the config module
      // So NestJS will wait for the config module to finish its initialization 
      // because we've defined it here 👆
      //
      // We want to inject the config service and then in the useFactory method we
      // define in asynchronous function.
      inject: [ConfigService],
      // Essentially what's going to happen is that this is going to be a function
      // that is called by NestJS. Whenever we want to initialize this module
      // asynchronously and whatever this function returns is going to be the
      // configuration for this module.
      //
      // The most important thing here is that you can do dependency injection in
      // this arrow function
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        // I can actually do anything in this asynchronous function
        // I can perform HTTP calls if I have to grab my configuration from some
        // server or whatever.
        //
        // This object will be passed onto my module.
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    //   // What is it synchronous? Because we don't have to wait for anything.
    //   // We have all of the data written in plain text and it's immediately
    //   // available. That is what we had before.
    //   //
    //   // But if we want to consume the configuration values using the config
    //   // module, we need to wait for that module to initialize and be available.
    //   //
    //   // So then we want to do is called asynchronous initialization of a module.
    //   //
    //   // And again, why is it a asynchronous? It's because we don't have these
    //   // values immediately when the application starts, we need to wait for the
    //   // config module to initialize.
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
