/**
 * App-wide React error boundary.
 *
 * Catches render-time crashes in any descendant component and shows a
 * recovery screen instead of a white screen of death. Errors are logged
 * via the centralised logger.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EHColors } from '@/constants/colors';
import { logger } from '@/utils/logger';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error('Uncaught render error:', error.message);
    logger.error('Component stack:', info.componentStack);
  }

  private handleRetry = () => {
    logger.info('User tapped "Try again" — resetting error boundary');
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>!</Text>
          </View>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </Text>
          <Pressable
            onPress={this.handleRetry}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Try again</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EHColors.pageBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: EHColors.redBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 28,
    fontWeight: '700',
    color: EHColors.red,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: EHColors.ink,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    lineHeight: 21,
    color: EHColors.inkMuted,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    marginTop: 24,
    height: 50,
    paddingHorizontal: 32,
    borderRadius: 14,
    backgroundColor: EHColors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: EHColors.navyDark,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: EHColors.white,
  },
});
