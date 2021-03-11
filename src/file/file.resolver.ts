import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { File } from './file.entity';
import { FileService } from './file.service';

@Resolver()
export class FileResolver {
  constructor(private fileService: FileService) {}

  @Query(() => [File])
  public async files(): Promise<File[]> {
    return this.fileService.getAllFiles();
  }

  @Mutation(() => File)
  public async uploadProfile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, mimetype }: FileUpload,
  ): Promise<File | boolean> {
    return this.fileService.uploadFile({
      createReadStream,
      filename,
      mimetype,
    });
  }
}
