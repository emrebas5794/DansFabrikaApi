import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';

@Controller({ path: 'notification', version: '1' })
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Post(':id')
  setStatus(@Param('id') id: string, @Req() req) {
    return this.notificationService.setStatus(req.user.id, id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get('student/:id')
  findByStudent(@Param('id') id: string) {
    return this.notificationService.findByStudentId(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get('course/:id')
  findByCourse(@Param('id') id: string) {
    return this.notificationService.findByCourseId(+id);
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(ERoles.ADMIN)
  // @Put()
  // update(@Body() updateNotificationDto: UpdateNotificationDto) {
  //   return this.notificationService.update(updateNotificationDto);
  // }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
