import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { SiteTracking } from './site_tracking_details.entity';

/**
 *
 *
 *
 */
@Entity({ name: 'urls' })
export class Urls {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'original_url', type: 'text' })
  originalUrl!: string;

  @Column({ name: 'shortern_url', type: 'text' })
  shorternUrl!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt!: Date;

  @OneToMany(type => SiteTracking, siteTracking => siteTracking.url, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  siteTrackingDetails!: SiteTracking[];
}
