import type { Meta, StoryObj } from '@storybook/angular';
import { StoreModule } from '@ngrx/store';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { SettingsModule } from '../../settings.module';

// Components
import { SettingsColorComponent } from './settings-color.component';

// Store
import { appReducer } from '../../../../store/app.reducer';

// Constants
import { colors } from '../../../../core/constants/colors';

const meta: Meta<SettingsColorComponent> = {
  title: 'Pages/Settings/Color',
  component: SettingsColorComponent,
  tags: ['autodocs'],
  render: (args: SettingsColorComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SettingsModule, StoreModule.forRoot(appReducer)],
    }),
    componentWrapperDecorator(
      (story) => `<app-root><div style="width: 260px;">${story}</div></app-root>`,
    ),
  ],
  argTypes: {
    color: {
      control: { type: 'object' },
      defaultValue: {},
    },
    currentColor: {
      options: colors.map((color) => color.name),
      control: { type: 'radio' },
      defaultValue: colors[0].name,
    },
  },
};

export default meta;

type Story = StoryObj<SettingsColorComponent>;

export const Color: Story = {
  args: {
    currentColor: colors[1].name,
    color: colors[0],
  },
};

export const Active: Story = {
  args: {
    currentColor: colors[0].name,
    color: colors[0],
  },
};
