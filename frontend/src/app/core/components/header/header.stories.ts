import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Header } from './header';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth-service/auth-service';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

export default {
  title: 'Core/Header',
  component: Header,
  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule,
        MatIconButton,
        MatButton,
        MatToolbarModule,
        MatDividerModule,
        MatIconModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            logout: () => of(void 0),
          },
        },
      ],
    }),
  ],
} as Meta<Header>;

type Story = StoryObj<Header>;
export const Default: Story = {};