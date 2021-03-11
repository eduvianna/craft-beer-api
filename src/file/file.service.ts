import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { extname } from 'path';
import { GraphQLError } from 'graphql';
import * as crypto from 'crypto-js';

import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  public async getAllFiles(): Promise<File[]> {
    return this.fileRepository.find();
  }

  public async uploadFile({
    createReadStream,
    filename,
    mimetype,
  }: Omit<FileUpload, 'encoding'>): Promise<File | boolean> {
    const generatedFilename = crypto.lib.WordArray.random(16).toString(
      crypto.enc.Hex,
    );

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      throw new GraphQLError('Type of file extension not accepted.');
    }

    const writeOnServer = new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(
          createWriteStream(
            './uploads/profiles/' + generatedFilename + extname(filename),
          ),
        )
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );

    await writeOnServer;

    if (!writeOnServer) {
      return false;
    }

    const file = await this.fileRepository.create({
      name: filename,
      path: generatedFilename,
    });

    return this.fileRepository.save(file);
  }
}
