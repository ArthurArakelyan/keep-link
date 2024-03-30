import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

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
    componentWrapperDecorator(
      (story) => `<app-root>${story}</app-root>`,
    ),
  ],
};

export default meta;

type Story = StoryObj<PageLoaderComponent>;

export const PageLoader: Story = {};
