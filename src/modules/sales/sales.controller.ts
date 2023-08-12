import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, Inject, All } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ERoles } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { InstallmentDto } from './dto/installment.dto';
import { PaymentDto } from './dto/payment.dto';
import { UseCreditDto } from './dto/use-credit.dto';

@Controller({ path: 'sales', version: '1' })
export class SalesController {

  constructor(private readonly salesService: SalesService) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Post('installments')
  checkInstallment(@Body() installmentDto: InstallmentDto) {
    return this.salesService.checkInstallment(installmentDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Post('payment')
  payment(@Body() paymentDto: PaymentDto, @Req() req) {
    return this.salesService.payment(paymentDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.STUDENT)
  @Post('credit')
  useCredit(@Body() dto: UseCreditDto, @Req() req) {
    return this.salesService.useCredit(dto, req.user);
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(ERoles.STUDENT)
  @Post('return')
  returnPayment(@Body() paymentDto: any) {
    return this.salesService.returnPayment(paymentDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN, ERoles.STUDENT) 
  @Get()
  findAll(@Req() req) {
    if (req.user.role === undefined) {
      return this.salesService.findAllForStudent(req.user.id);
    }
    return this.salesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Get('student/:id')
  findByStudent(@Param('id') id: string) {
    return this.salesService.findByStudent(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Put()
  update(@Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(updateSaleDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ERoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
