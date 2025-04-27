import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({
    example: 'userId123',
    description: 'ID của user sở hữu thiết bị này',
  })
  userId: string;

  @ApiProperty({
    example: 'iPhone 14 Pro Max',
    required: false,
    description: 'Tên của thiết bị này',
  })
  deviceName?: string;

  @ApiProperty({
    example: 'iOS',
    required: false,
    description: 'Loại thiết bị',
  })
  deviceType?: string;
}
