import { IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
    // npm >> class-validator, class-tranformer download
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;

    @IsString({ each: true })
    readonly genres: string[];
}