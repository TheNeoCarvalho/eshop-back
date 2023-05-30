import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity({ name: 'categoty' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('rowid')
  id?: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.category)
  products?: ProductEntity;
}
