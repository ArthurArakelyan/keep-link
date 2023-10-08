import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Shared/Input',
  component: InputComponent,
  tags: ['autodocs'],
  render: (args: InputComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 300px;">${story}</div>`,
    ),
  ],
  argTypes: {
    placeholder: {
      type: 'string',
      defaultValue: '',
    },
    name: {
      type: 'string',
      defaultValue: '',
    },
    inputId: {
      type: 'string',
      defaultValue: '',
    },
    type: {
      type: 'string',
      defaultValue: 'text',
    },
    inputMode: {
      type: 'string',
      defaultValue: 'text',
    },
    error: {
      type: 'string',
      defaultValue: null,
    },
    showError: {
      type: 'boolean',
      defaultValue: false,
    },
    placeholderBackgroundColor: {
      type: 'string',
      defaultValue: 'var(--background-color)',
    },
  },
};

export default meta;

type Story = StoryObj<InputComponent>;

export const Input: Story = {
  args: {
    placeholder: 'Placeholder',
    name: 'name',
    inputId: 'name',
    type: 'text',
    inputMode: 'text',
    error: null,
    showError: false,
    placeholderBackgroundColor: '#ffffff',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Placeholder',
    name: 'name',
    inputId: 'name',
    type: 'text',
    inputMode: 'text',
    error: {
      required: '',
    },
    showError: true,
    placeholderBackgroundColor: '#ffffff',
  },
};
