import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Urls } from './urls.entity';

/**
 *
 *
 *
 */
@Entity({ name: 'site_tracking_details' })
export class SiteTracking {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt!: Date;

  @Column({ name: 'clicks', type: 'integer', nullable: false })
  clicks!: number;

  @ManyToOne(type => Urls, url => url.siteTrackingDetails)
  @JoinColumn({ name: 'url_id' })
  url!: Urls;
}
