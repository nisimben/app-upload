import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UploadFile } from './upload-file.model';
import { UploadFilesStore, UploadFilesState } from './upload-files.store';

@Injectable({ providedIn: 'root' })
export class UploadFilesQuery extends QueryEntity<UploadFilesState, UploadFile> {
  constructor(protected override store: UploadFilesStore) {
    super(store);
  }
}
