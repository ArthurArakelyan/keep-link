import type { Meta, StoryObj } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { SelectComponent } from './select.component';

const meta: Meta<SelectComponent> = {
  title: 'Shared/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  render: (args: SelectComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 300px; height: 200px;">${story}</div>`,
    ),
  ],
  argTypes: {
    options: {
      control: { type: 'object' },
      defaultValue: [],
    },
    placeholder: {
      type: 'string',
      defaultValue: '',
    },
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
    showError: {
      type: 'boolean',
      defaultValue: false,
    },
    error: {
      type: 'string',
      defaultValue: null,
    },
    placeholderBackgroundColor: {
      type: 'string',
      defaultValue: 'var(--background-color)',
    },
    defaultValue: {
      type: 'string',
      defaultValue: '',
    },
    canSelectNothing: {
      type: 'boolean',
      defaultValue: true,
    },
    showSearch: {
      type: 'boolean',
      defaultValue: false,
    },
    emptyText: {
      type: 'string',
      defaultValue: 'No options',
    },
  },
};

export default meta;

type Story = StoryObj<SelectComponent>;

const options = [
  {
    key: 'option1',
    value: 'Option 1',
  },
  {
    key: 'option2',
    value: 'Option 2',
  },
  {
    key: 'option3',
    value: 'Option 3',
  },
];

export const Select: Story = {
  args: {
    options,
    placeholder: 'Placeholder',
    disabled: false,
    showSearch: false,
    error: null,
    placeholderBackgroundColor: '#ffffff',
    defaultValue: '',
    canSelectNothing: true,
    showError: false,
    emptyText: 'No options',
  },
};

export const Empty: Story = {
  args: {
    options: [],
    placeholder: 'Placeholder',
    disabled: false,
    showSearch: false,
    error: null,
    placeholderBackgroundColor: '#ffffff',
    defaultValue: '',
    canSelectNothing: true,
    showError: false,
    emptyText: 'No options',
  },
};

export const Disabled: Story = {
  args: {
    options,
    placeholder: 'Placeholder',
    disabled: true,
    showSearch: false,
    error: null,
    placeholderBackgroundColor: '#ffffff',
    defaultValue: '',
    canSelectNothing: true,
    showError: false,
    emptyText: 'No options',
  },
};

export const Search: Story = {
  args: {
    options,
    placeholder: 'Placeholder',
    disabled: false,
    showSearch: true,
    error: null,
    placeholderBackgroundColor: '#ffffff',
    defaultValue: '',
    canSelectNothing: true,
    showError: false,
    emptyText: 'No options',
  },
};

export const Error: Story = {
  args: {
    options,
    placeholder: 'Placeholder',
    disabled: false,
    showSearch: false,
    error: { required: '' },
    placeholderBackgroundColor: '#ffffff',
    defaultValue: '',
    canSelectNothing: true,
    showError: true,
    emptyText: 'No options',
  },
};

export const DefaultValue: Story = {
  args: {
    options,
    placeholder: 'Placeholder',
    disabled: false,
    showSearch: false,
    error: null,
    placeholderBackgroundColor: '#ffffff',
    defaultValue: 'option2',
    canSelectNothing: true,
    showError: false,
    emptyText: 'No options',
  },
};

export const CannotDeselect: Story = {
  args: {
    options,
    placeholder: 'Placeholder',
    disabled: false,
    showSearch: false,
    error: null,
    placeholderBackgroundColor: '#ffffff',
    defaultValue: 'option1',
    canSelectNothing: false,
    showError: false,
    emptyText: 'No options',
  },
};
