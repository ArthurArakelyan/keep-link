import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Shared/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  render: (args: ModalComponent) => ({
    template: `
      <div style="height: 300px;"></div>

      <app-modal [title]="title" [fullscreen]="fullscreen">
        <p style="font-size: 16px; line-height: 24px; color: var(--primary-text-color);">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam aspernatur blanditiis eveniet explicabo, facilis harum laudantium optio rem voluptas?
        </p>
      </app-modal>
    `,
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
  argTypes: {
    title: {
      type: 'string',
      defaultValue: '',
    },
    fullscreen: {
      type: 'boolean',
      defaultValue: false,
      description: 'Works only on mobile',
    },
  },
};

export default meta;

type Story = StoryObj<ModalComponent>;

export const Modal: Story = {
  args: {
    title: 'Title',
    fullscreen: false,
  },
};

export const Fullscreen: Story = {
  args: {
    title: 'Title',
    fullscreen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};
