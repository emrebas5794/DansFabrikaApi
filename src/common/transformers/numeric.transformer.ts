
export class ColumnNumericTransformer {
    to(data: number): number {
        return data;
    }
    from(data: string | any) {
        return parseFloat(data);
    }
}