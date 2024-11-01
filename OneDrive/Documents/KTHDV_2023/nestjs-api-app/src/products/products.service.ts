import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertProductsDTO, UpdateProductsDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  async createProduct(userId: number, insertproductsDTO: InsertProductsDTO) {
    const product = await this.prismaService.product.create({
      data: {
        ...insertproductsDTO,
        userId,
      },
    });
    return product;
  }

  getProducts(userId: number) {
    const products = this.prismaService.product.findMany({
      where: {
        userId,
      },
    });
    return products;
  }
  getProductById(productsId: number) {
    return this.prismaService.product.findFirst({
      where: {
        id: productsId,
      },
    });
  }
  async editProductById(
    productId: number,
    updateroductsDTO: UpdateProductsDTO,
  ) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new ForbiddenException('Cannot update product');
    }

    return this.prismaService.product.update({
      where: {
        id: productId,
      },
      data: { ...updateroductsDTO },
    });
  }
  async deleteProductById(productsId: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productsId,
      },
    });
    if (!product) {
      throw new ForbiddenException('Cannot delete product ');
    }
    return this.prismaService.product.delete({
      where: {
        id: productsId,
      },
    });
  }
}
