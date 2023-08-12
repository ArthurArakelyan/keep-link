import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

// Store
import { AppStore } from '../../../store/app.reducer';
import { deleteUserAvatar, editUserAvatar, selectUser } from '../../../store/user';

// Utilities
import { compressImage } from '../../../core/utilities/compress-image';

// Animations
import { modalTranslateAnimation } from '../../../core/animations/modal-translate.animation';

// Constants
import { maximumFileSize, minimumCompressFileSize } from '../../../core/constants/size';
import { imageFileMessage, maximumFileSizeMessage } from '../../../core/constants/error-messages';

// Models
import { IUser } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: 'profile-avatar.component.html',
  styleUrls: ['profile-avatar.component.scss'],
  animations: [modalTranslateAnimation],
})
export class ProfileAvatarComponent {
  user: IUser | null = null;
  isDeleteAvatarOpen: boolean = false;
  uploadLoading: boolean = false;
  deleteLoading: boolean = false;

  private userSubscription: Subscription | undefined;
  private queryParamsSubscription: Subscription | undefined;

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private toast: ToastrService,
    private store: Store<AppStore>,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select(selectUser).subscribe((userState) => {
      if (this.deleteLoading && !userState.loading.deleteUserAvatar) {
        this.onDeleteCancel();
      }

      this.user = userState.user;
      this.uploadLoading = userState.loading.editUserAvatar;
      this.deleteLoading = userState.loading.deleteUserAvatar;
    });

    this.queryParamsSubscription = this.route.queryParams.subscribe((queryParams) => {
      this.isDeleteAvatarOpen = typeof queryParams['deleteAvatar'] === 'string';
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.queryParamsSubscription?.unsubscribe();
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
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {
          deleteAvatar: '',
        },
      },
    );
  }

  onDeleteSubmit() {
    this.store.dispatch(deleteUserAvatar());
  }

  onDeleteCancel() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        replaceUrl: true,
        queryParams: {
          deleteAvatar: undefined,
        },
      },
    );
  }
}
