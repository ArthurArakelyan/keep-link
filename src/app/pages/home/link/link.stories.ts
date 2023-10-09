import type { Meta, StoryObj } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { HomeModule } from '../home.module';

// Components
import { LinkComponent } from './link.component';

const meta: Meta<LinkComponent> = {
  title: 'Pages/Home/Link',
  component: LinkComponent,
  tags: ['autodocs'],
  render: (args: LinkComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [HomeModule, RouterTestingModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width: 275px; background-color: var(--card-color); border-radius: 0.375rem; box-shadow: 0 0 5px var(--shadow-md-color);">${story}</div>`,
    ),
  ],
  argTypes: {
    link: {
      control: { type: 'object' },
      defaultValue: null,
    },
    action: {
      options: ['menu', null],
      control: { type: 'radio' },
      defaultValue: null,
    },
    imageClass: {
      type: 'string',
      defaultValue: undefined,
    },
    imageWrapperClass: {
      type: 'string',
      defaultValue: undefined,
    },
    linkClass: {
      type: 'string',
      defaultValue: undefined,
    },
    imageError: {
      type: 'boolean',
      defaultValue: false,
    },
    linkHighlight: {
      type: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<LinkComponent>;

export const Link: Story = {
  args: {
    link: {
      link: 'https://google.com/',
      name: 'Google',
      folderId: null,
      image: '',
      createdAt: Date.now(),
      userId: '1',
      id: '1',
    },
  },
};

export const LinkImage: Story = {
  args: {
    link: {
      link: 'https://stackoverflow.com/',
      name: 'Stackoverflow',
      folderId: null,
      image: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded',
      createdAt: Date.now(),
      userId: '1',
      id: '1',
    },
  },
};

export const LinkMenu: Story = {
  args: {
    link: {
      link: 'https://stackoverflow.com/',
      name: 'Stackoverflow',
      folderId: null,
      image: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded',
      createdAt: Date.now(),
      userId: '1',
      id: '1',
    },
    action: 'menu',
  },
};
