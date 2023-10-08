import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Shared/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  render: (args: AvatarComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width: 48px; height: 48px;">${story}</div>`,
    ),
  ],
  argTypes: {
    name: {
      type: 'string',
      defaultValue: '',
    },
    src: {
      type: 'string',
      defaultValue: '',
    },
    alt: {
      type: 'string',
      defaultValue: '',
    },
    width: {
      type: 'number',
      defaultValue: 0,
    },
    height: {
      type: 'number',
      defaultValue: 0,
    },
  },
};

export default meta;

type Story = StoryObj<AvatarComponent>;

export const AvatarImage: Story = {
  args: {
    src: 'https://keep-link.vercel.app/assets/logo.svg',
    alt: 'Avatar',
    name: 'John Doe',
    width: 48,
    height: 48,
  },
};

export const AvatarLetter: Story = {
  args: {
    src: '',
    alt: 'Avatar',
    name: 'John Doe',
    width: 48,
    height: 48,
  },
};
