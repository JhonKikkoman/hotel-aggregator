import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import {
  ReservationDto,
  ReservationSearchOptions,
} from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: ReservationDto) {
    return this.reservationService.addReservation(createReservationDto);
  }

  @Get()
  findAll(@Query() params: ReservationSearchOptions) {
    return this.reservationService.getReservations(params);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.removeReservation(id);
  }
}
