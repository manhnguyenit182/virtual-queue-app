/**
 * App Constants and Configuration
 */

export const COLORS = {
  primary: '#266DD3',
  secondary: '#6366f1',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    light: '#9ca3af',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    card: '#ffffff',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const VALIDATION = {
  phoneRegex: /^[0-9]{10,11}$/,
  nameMinLength: 2,
  nameMaxLength: 50,
};

export const FIREBASE = {
  paths: {
    queue: '/queue',
    current: '/current',
    lastNumber: '/lastNumber',
  },
  status: {
    waiting: 'waiting',
    called: 'called',
  },
};
