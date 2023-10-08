import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

// Modules
import { SharedModule } from '../../shared.module';

// Components
import { PageLoaderComponent } from './page-loader.component';

const meta: Meta<PageLoaderComponent> = {
  title: 'Shared/PageLoader',
  component: PageLoaderComponent,
  tags: ['autodocs'],
  render: (args: PageLoaderComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<PageLoaderComponent>;

export const PageLoader: Story = {};
