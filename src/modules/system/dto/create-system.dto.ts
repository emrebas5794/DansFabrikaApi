import { IsJSON, IsNotEmpty } from "class-validator";
import { IConfig } from "src/common/models/config.model";

export class CreateSystemDto {

    @IsJSON()
    @IsNotEmpty()
    config: boolean;
}
