import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MyJwtGuard } from 'src/auth/guard';
import { ProductsService } from './products.service';
import { GetUser } from 'src/auth/decorator';
import { InsertProductsDTO, UpdateProductsDTO } from './dto';

@Controller('products')
@UseGuards(MyJwtGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts(@GetUser('id') userId: number) {
    return this.productsService.getProducts(userId);
  }
  @Get(':id')
  getProductById(@Param('id') productsId: string) {
    const id = parseInt(productsId); // Chuyển đổi giá trị từ chuỗi sang số nguyên
    return this.productsService.getProductById(id);
  }
  @Post()
  createProduct(
    @GetUser('id') userId: number,
    @Body() insertproductsDTO: InsertProductsDTO,
  ) {
    return this.productsService.createProduct(userId, insertproductsDTO);
  }
  @Patch(':id')
  editProductById(
    @Param('id', ParseIntPipe) productsId: string,
    @Body() updateroductsDTO: UpdateProductsDTO,
  ) {
    const id = parseInt(productsId);
    return this.productsService.editProductById(id, updateroductsDTO);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteProductById(@Query('id', ParseIntPipe) productsId: number) {
    return this.productsService.deleteProductById(productsId);
  }
}
