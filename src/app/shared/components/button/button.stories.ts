import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Shared/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  render: (args: ButtonComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
  argTypes: {
    type: {
      options: ['button', 'submit'],
      control: { type: 'radio' },
      defaultValue: 'button',
    },
    variant: {
      options: ['default', 'rounded', 'circle'],
      control: { type: 'radio' },
      defaultValue: 'default',
    },
    color: {
      options: ['primary', 'red'],
      control: { type: 'radio' },
      defaultValue: 'primary',
    },
    label: {
      control: 'text',
      defaultValue: 'Button',
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    buttonClass: {
      control: 'text',
      defaultValue: '',
    },
    ariaLabel: {
      control: 'text',
      defaultValue: '',
    },
  },
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    type: 'button',
    variant: 'default',
    color: 'primary',
    label: 'Button',
    loading: false,
    disabled: false,
    ariaLabel: '',
  },
};

export const Red: Story = {
  args: {
    type: 'button',
    variant: 'default',
    color: 'red',
    label: 'Button',
    loading: false,
    disabled: false,
    ariaLabel: '',
  },
};

export const Rounded: Story = {
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="width: fit-content;">${story}</div>`,
    ),
  ],
  args: {
    type: 'button',
    variant: 'rounded',
    color: 'primary',
    label: 'Button',
    loading: false,
    disabled: false,
    ariaLabel: '',
  },
};

export const Circle: Story = {
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="width: 80px; height: 80px;">${story}</div>`,
    ),
  ],
  args: {
    type: 'button',
    variant: 'circle',
    color: 'primary',
    label: 'B',
    loading: false,
    disabled: false,
    ariaLabel: '',
  },
};

export const Disabled: Story = {
  args: {
    type: 'button',
    variant: 'default',
    color: 'primary',
    label: 'Button',
    loading: false,
    disabled: true,
    ariaLabel: '',
  },
};

export const Loader: Story = {
  args: {
    type: 'button',
    variant: 'default',
    color: 'primary',
    label: 'Button',
    loading: true,
    disabled: false,
    ariaLabel: '',
  },
};
