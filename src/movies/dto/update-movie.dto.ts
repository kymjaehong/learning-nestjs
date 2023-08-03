import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto";

// npm >> @nestjs/mapped-types : null이 아닌 프로퍼티만 사용 가능
export class UpdateMovieDto extends PartialType(
    // base dto가 필요하다.
    CreateMovieDto
) {
    // 아래와 같은 형태가 된다. 

    // @IsString()
    // readonly title?: string;
    // @IsNumber()
    // readonly year?: number;

    // @IsString({ each: true })
    // readonly genres?: string[];
}