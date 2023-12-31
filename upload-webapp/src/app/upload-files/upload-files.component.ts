import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadFilesService } from './state/upload-files.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  uploadForm!: FormGroup;
  fileTypeError = false;
  fileUploadedSuccess = false;
  fileUploadedError = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private uploadFilesService: UploadFilesService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.uploadForm = this.formBuilder.group({
      fileName: '',
      file: {},
      selectFile: '',
    });
  }

  private resetForm() {
    this.uploadForm.reset();
    this.uploadForm.markAsPristine();
  }

  private showMessage(success: boolean) {
    if (success) {
      this.fileUploadedSuccess = true;
    } else {
      this.fileUploadedError = true;
    }

    setTimeout(() => {
      this.fileUploadedSuccess = false;
      this.fileUploadedError = false;
      this.resetForm();
    }, 3000);
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileTypeError = !(
        file.type === 'application/pdf' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );

      if (!this.fileTypeError) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const content = String(reader.result).split(',')[1];
          const fileToUpload = {
            fileData: {
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModifiedDate,
              name: file.name,
              size: file.size,
              type: file.type,
              webkitRelativePath: file.webkitRelativePath,
              status: '',
            },
            content: content,
          };

          this.uploadForm.get('file')?.setValue(fileToUpload);
        };
      } else {
        setTimeout(() => {
          this.fileTypeError = false;
          this.resetForm();
        }, 3000);
      }
    }
  }

  submitFile() {
    if (!this.uploadForm.value.fileName) {
      this.uploadForm.value.fileName = this.uploadForm.value.file.fileData.name;
    } else {
      this.uploadForm.value.fileName =
        this.uploadForm.value.fileName +
        '.' +
        this.uploadForm.value.file.fileData.name.substr(
          this.uploadForm.value.file.fileData.name.lastIndexOf('.') + 1
        );
    }

    this.isLoading = true;
    this.uploadFilesService
      .uploadFile(this.uploadForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (value) => {
          this.showMessage(!!value?.status);
        },
        error: (err) => {
          console.log(err);
          this.showMessage(false);
        },
      });
  }
}
