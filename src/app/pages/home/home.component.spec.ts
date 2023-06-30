import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';

// Modules
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { HomeComponent } from './home.component';
import { FoldersComponent } from './folders/folders.component';
import { LinksComponent } from './links/links.component';
import { FolderComponent } from './folders/folder/folder.component';
import { LinkComponent } from './link/link.component';

// Store
import { appReducer, AppStore } from '../../store/app.reducer';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: HTMLElement;
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, FoldersComponent, LinksComponent, FolderComponent, LinkComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, HomeRoutingModule, SharedModule, RouterTestingModule, StoreModule.forRoot(appReducer)],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);
  });

  it('should create the home', () => {
    expect(compiled.querySelector('app-folders')).toBeInstanceOf(HTMLElement);
    expect(compiled.querySelector('app-links')).toBeInstanceOf(HTMLElement);
  });
});
