import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DtoCleaningPipe implements PipeTransform {
  constructor(private dto: any) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // pipe =>  { metatype: [class UpdateStudentDto], type: 'body', data: undefined }
    console.log("data => ", (this.dto));
    return value;
  }
}
