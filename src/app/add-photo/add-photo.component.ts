import { Component, inject } from '@angular/core';
import { ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.css',
})
export class AddPhotoComponent {
  file!: File;
  private readonly _dataStorage = inject(Storage);
  addFile(event: Event) {
    console.log(this._dataStorage);
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
      this.uploadFile();
    }
  }
  uploadFile(): void {
    const storageRef = ref(this._dataStorage, `files/${this.file.name}`);
    uploadBytesResumable(storageRef, this.file);
  }
}
