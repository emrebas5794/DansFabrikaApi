import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

export class PageMetaDtoOrders {
    column: string;
    type: Order;
}


export class PageOptionsDto {
    @Type(() => PageMetaDtoOrders)
    @IsOptional()
    order?: PageMetaDtoOrders

    @ApiPropertyOptional({
        minimum: 1,
        default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    readonly take?: number = 10;
}

export class VerifyOrderData {
    whitelist: any;
    order: PageMetaDtoOrders;

    constructor(whitelist: any, order: PageMetaDtoOrders) {
        this.whitelist = whitelist;
        this.order = order;
    }

    public async verify(): Promise<boolean> {
        return this.convertToObjectForOrder() && this.verifyColumn() && this.verifyDirection();
    }

    private verifyColumn(): boolean {
        return this.whitelist.includes(this.order.column);
    }

    private verifyDirection(): boolean {
        return ['ASC', 'DESC'].includes(this.order.type);
    }

    private convertToObjectForOrder() {
        try {
            this.order = JSON.parse(String(this.order));
            return true;
        } catch (error) {
            return false;
        }        
    }

    get orderData(): PageMetaDtoOrders{
        return this.order;
    }
}