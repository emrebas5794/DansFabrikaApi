import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';

@Catch()
export class ServerErrorFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const statusName = "Internal Server Error";
    console.log(exception);
    

    if (res.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      // set httpException res to res


      fs.writeFile('err.txt', "\n\n-----------------------------------------------------------------------------------------\n\n" + JSON.stringify({
        // e: exception,
        msg: exception.message,
        stack: exception.stack,
        name: exception.name,
        statusCode: res.statusCode,
        statusName,
        // req
      }, null, 2), () => { })

      res.render("Error.ejs", {
        e: exception,
        msg: exception.message,
        stack: exception.stack,
        name: exception.name,
        statusCode: res.statusCode,
        statusName,
        req
      });

      res.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    if (exception instanceof HttpException) {
      res.status(exception.getStatus()).json(exception.getResponse());
      return;
    }
  }
}
