import {IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsOptional()
    id: string;

    @IsNotEmpty({message: "Zadanie musi zawirać tytuł."})
    @IsString()
    @Length(3, 50, { message: 'Pole tytuł musi zawierać od 3 do 50 znaków.' })
    title: string;

    @IsDateString()
    @IsOptional()
    startDate: string;

    @IsDateString()
    @IsOptional()
    endDate: string;

    @IsString()
    type: 'soft'|'hard';

    @IsBoolean()
    @IsOptional()
    reminder: boolean;

    @IsBoolean()
    @IsOptional()
    done: boolean;
}
