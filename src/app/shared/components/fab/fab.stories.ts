import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { FabComponent } from './fab.component';

const meta: Meta<FabComponent> = {
  title: 'Shared/FAB',
  component: FabComponent,
  tags: ['autodocs'],
  render: (args: FabComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
    componentWrapperDecorator(
      (story) => `<app-root><div style="width: 100%; min-height: 100px;">${story}</div></app-root>`,
    ),
  ],
  argTypes: {
    show: {
      type: 'boolean',
      defaultValue: false,
      description: 'Shows only on mobile',
    },
    icon: {
      type: 'string',
      defaultValue: 'plus',
    },
    label: {
      type: 'string',
      defaultValue: '',
      description: 'aria-label',
    },
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
    loading: {
      type: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<FabComponent>;

export const FAB: Story = {
  args: {
    show: true,
    icon: 'plus',
    label: 'Add',
    disabled: false,
    loading: false,
  },
};

export const Mobile: Story = {
  args: {
    show: true,
    icon: 'plus',
    label: 'Add',
    disabled: false,
    loading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Disabled: Story = {
  args: {
    show: true,
    icon: 'plus',
    label: 'Add',
    disabled: true,
    loading: false,
  },
};

export const Loader: Story = {
  args: {
    show: true,
    icon: 'plus',
    label: 'Add',
    disabled: false,
    loading: true,
  },
};
