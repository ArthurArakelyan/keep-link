import type { Meta, StoryObj } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { DropdownComponent } from './dropdown.component';

const meta: Meta<DropdownComponent> = {
  title: 'Shared/Dropdown',
  component: DropdownComponent,
  render: (args: DropdownComponent) => ({
    props: args,
    template: `
      <div style="width: 100%; display: flex; justify-content: center;">
        <app-dropdown style="width: fit-content; display: flex;" [options]="options" [id]="id" [label]="label" [position]="position" [trigger]="trigger">
          <app-avatar name="John Doe" style="width: 48px; height: 48px;"></app-avatar>
        </app-dropdown>
      </div>
    `,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule, BrowserAnimationsModule],
    }),
  ],
  argTypes: {
    options: {
      control: { type: 'object' },
      defaultValue: [],
    },
    id: {
      type: 'string',
      defaultValue: '',
    },
    label: {
      type: 'string',
      defaultValue: '',
      description: 'aria-label',
    },
    position: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' },
      defaultValue: 'left',
    },
    trigger: {
      options: ['hover', 'click'],
      control: { type: 'radio' },
      defaultValue: 'hover',
    },
  },
};

export default meta;

type Story = StoryObj<DropdownComponent>;

const options = [
  {
    name: 'Edit',
    action: () => {},
    icon: 'edit',
  },
  {
    name: 'Delete',
    action: () => {},
    icon: 'delete',
  },
  {
    name: 'Copy',
    action: () => {},
    icon: 'copy',
  },
  {
    name: 'Logout',
    action: () => {},
    icon: 'logout',
  },
];

export const Dropdown: Story = {
  args: {
    options,
    id: 'dropdown',
    label: 'Label',
    position: 'left',
    trigger: 'hover',
  },
};

export const ClickTrigger: Story = {
  args: {
    options,
    id: 'dropdown',
    label: 'Label',
    position: 'left',
    trigger: 'click',
  },
};

export const CenterPosition: Story = {
  args: {
    options,
    id: 'dropdown',
    label: 'Label',
    position: 'center',
    trigger: 'hover',
  },
};

export const RightPosition: Story = {
  args: {
    options,
    id: 'dropdown',
    label: 'Label',
    position: 'right',
    trigger: 'hover',
  },
};
