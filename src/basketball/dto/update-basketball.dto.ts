import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketballDto } from './create-basketball.dto';

export class UpdateBasketballDto extends PartialType(CreateBasketballDto) {}
