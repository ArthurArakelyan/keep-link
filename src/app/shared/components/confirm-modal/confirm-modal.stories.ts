import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { ConfirmModalComponent } from './confirm-modal.component';

const meta: Meta<ConfirmModalComponent> = {
  title: 'Shared/ConfirmModal',
  component: ConfirmModalComponent,
  tags: ['autodocs'],
  render: (args: ConfirmModalComponent) => ({
    props: args,
    template: `
      <div style="height: 300px;"></div>

      <app-confirm-modal [title]="title" [submitText]="submitText" [cancelText]="cancelText" [loading]="loading">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam aspernatur blanditiis eveniet explicabo, facilis harum laudantium optio rem voluptas?
      </app-confirm-modal>
    `,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
  argTypes: {
    title: {
      type: 'string',
      defaultValue: 'Confirm Delete',
    },
    submitText: {
      type: 'string',
      defaultValue: 'Confirm',
    },
    cancelText: {
      type: 'string',
      defaultValue: 'Cancel',
    },
    loading: {
      type: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<ConfirmModalComponent>;

export const ConfirmModal: Story = {
  args: {
    title: 'Confirm Delete',
    submitText: 'Confirm',
    cancelText: 'Cancel',
    loading: false,
  },
};

export const Loader: Story = {
  args: {
    title: 'Confirm Delete',
    submitText: 'Confirm',
    cancelText: 'Cancel',
    loading: true,
  },
};
