import type { Meta, StoryObj } from '@storybook/angular';
import { StoreModule } from '@ngrx/store';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

// Modules
import { SettingsModule } from '../../settings.module';

// Components
import { SettingsThemeComponent } from './settings-theme.component';

// Store
import { appReducer } from '../../../../store/app.reducer';

// Constants
import { themes } from '../../../../core/constants/themes';

const meta: Meta<SettingsThemeComponent> = {
  title: 'Pages/Settings/Theme',
  component: SettingsThemeComponent,
  tags: ['autodocs'],
  render: (args: SettingsThemeComponent) => ({
    props: args,
  }),
  decorators: [
    moduleMetadata({
      imports: [SettingsModule, StoreModule.forRoot(appReducer)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width: 260px;">${story}</div>`,
    ),
  ],
  argTypes: {
    theme: {
      control: { type: 'object' },
      defaultValue: {},
    },
    currentTheme: {
      options: ['default', 'light', 'dark', 'darkHighContrast'],
      control: { type: 'radio' },
      defaultValue: 'default',
    },
  },
};

export default meta;

type Story = StoryObj<SettingsThemeComponent>;

export const Default: Story = {
  args: {
    currentTheme: 'light',
    theme: themes[0],
  },
};

export const Light: Story = {
  args: {
    currentTheme: 'default',
    theme: themes[1],
  },
};

export const Dark: Story = {
  args: {
    currentTheme: 'default',
    theme: themes[2],
  },
};

export const DarkHighContrast: Story = {
  args: {
    currentTheme: 'default',
    theme: themes[3],
  },
};

export const Active: Story = {
  args: {
    currentTheme: 'default',
    theme: themes[0],
  },
};
