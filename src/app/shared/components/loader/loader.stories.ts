import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { LoaderComponent } from './loader.component';

const meta: Meta<LoaderComponent> = {
  title: 'Shared/Loader',
  component: LoaderComponent,
  tags: ['autodocs'],
  render: (args: LoaderComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
  argTypes: {
    size: {
      options: ['small', 'normal', 'large'],
      control: { type: 'radio' },
      defaultValue: 'normal',
    },
  },
};

export default meta;

type Story = StoryObj<LoaderComponent>;

export const Loader: Story = {
  args: {
    size: 'normal',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};
