import type { Meta, StoryObj } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { StoreModule } from '@ngrx/store';

// Modules
import { HomeModule } from '../../home.module';

// Components
import { FolderComponent } from './folder.component';

// Store
import { appReducer } from '../../../../store/app.reducer';

// Constants
import { folderLinksMax } from '../../../../core/constants/count';

// Models
import { ILink } from '../../../../core/models/link.model';

const meta: Meta<FolderComponent> = {
  title: 'Pages/Home/Folder',
  component: FolderComponent,
  tags: ['autodocs'],
  render: (args: FolderComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [HomeModule, RouterTestingModule, BrowserAnimationsModule, StoreModule.forRoot(appReducer)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 345px;">${story}</div>`,
    ),
  ],
  argTypes: {
    folder: {
      control: { type: 'object' },
      defaultValue: {},
    },
    links: {
      control: { type: 'object' },
      defaultValue: [],
    },
    restLinksCount: {
      type: 'number',
      defaultValue: 0,
    },
  },
};

export default meta;

type Story = StoryObj<FolderComponent>;

const link: ILink = {
  link: 'https://stackoverflow.com/',
  name: 'Stackoverflow',
  folderId: '1',
  image: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded',
  createdAt: Date.now(),
  userId: '1',
  id: '1',
};

export const Folder: Story = {
  args: {
    folder: {
      name: 'Folder',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo labore laborum reiciendis, repellat saepe tenetur.',
      createdAt: Date.now(),
      userId: '1',
      id: '1',
    },
    links: [link, link, link],
    restLinksCount: 0,
  },
};

export const Big: Story = {
  args: {
    folder: {
      name: 'Folder',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo labore laborum reiciendis, repellat saepe tenetur.',
      createdAt: Date.now(),
      userId: '1',
      id: '1',
    },
    links: [...Array(folderLinksMax).keys()].map(() => {
      return link;
    }),
    restLinksCount: 3,
  },
};

export const Empty: Story = {
  args: {
    folder: {
      name: 'Folder',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo labore laborum reiciendis, repellat saepe tenetur.',
      createdAt: Date.now(),
      userId: '1',
      id: '1',
    },
    links: [],
    restLinksCount: 0,
  },
};
