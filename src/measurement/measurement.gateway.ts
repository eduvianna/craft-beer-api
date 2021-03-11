import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMeasurementInput } from './dto/create-measurement.input';
import { MeasurementService } from './measurement.service';

@WebSocketGateway({ namespace: '/measurement' })
export class MeasurementGateway implements OnGatewayInit {
  constructor(private measurementService: MeasurementService) {}

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('MeasurementGateway');

  afterInit() {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('getMeasurements')
  async getMeasurements(client: Socket, _payload: unknown) {
    const measurements = await this.measurementService.getMeasurements();

    client.emit('returnGetMeasurements', measurements);
  }

  @SubscribeMessage('saveMeasurement')
  async sendMeasurement(client: Socket, payload: CreateMeasurementInput) {
    const measurement = await this.measurementService.createMeasurement(
      payload,
    );

    client.emit('returnSaveMeasurement', measurement);
  }
}
