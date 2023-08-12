import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { deleteUserAvatar, editUserAvatar, selectUser } from '../../../store/user';

// Utilities
import { compressImage } from '../../../core/utilities/compress-image';

// Constants
import { maximumFileSize, minimumCompressFileSize } from '../../../core/constants/size';
import { imageFileMessage, maximumFileSizeMessage } from '../../../core/constants/error-messages';

// Models
import { IUser } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: 'profile-avatar.component.html',
  styleUrls: ['profile-avatar.component.scss'],
})
export class ProfileAvatarComponent {
  user: IUser | null = null;
  uploadLoading: boolean = false;
  deleteLoading: boolean = false;

  private userSubscription: Subscription | undefined;

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private toast: ToastrService,
    private store: Store<AppStore>,
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select(selectUser).subscribe((userState) => {
      this.user = userState.user;
      this.uploadLoading = userState.loading.editUserAvatar;
      this.deleteLoading = userState.loading.deleteUserAvatar;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  onUploadClick() {
    if (!this.fileInput?.nativeElement) {
      return;
    }

    this.fileInput.nativeElement.click();
  }

  onUpload(e: Event) {
    const file = (<HTMLInputElement>e.target).files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.includes('image')) {
      this.toast.error(imageFileMessage);
      return;
    }

    compressImage(file, { quality: 0.7, minimumSize: minimumCompressFileSize })
      .pipe(
        take(1),
      )
      .subscribe((compressedFile) => {
        if (compressedFile.size > maximumFileSize) {
          this.toast.error(maximumFileSizeMessage);
          return;
        }

        this.store.dispatch(editUserAvatar({
          payload: compressedFile,
        }));
      });
  }

  onDelete() {
    this.store.dispatch(deleteUserAvatar());
  }
}
