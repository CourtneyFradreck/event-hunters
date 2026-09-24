/**
 * Centralised logger for EventHunters.
 *
 * Every message is prefixed with `[EventHunters]` so it's easy to filter in
 * the Metro console. The `debug` level is silenced in production builds.
 */

const PREFIX = '[EventHunters]';

export const logger = {
  /** General informational messages. */
  info: (...args: unknown[]) => console.log(PREFIX, ...args),

  /** Warnings — something unexpected but recoverable. */
  warn: (...args: unknown[]) => console.warn(PREFIX, '⚠', ...args),

  /** Errors — something broke. */
  error: (...args: unknown[]) => console.error(PREFIX, '✖', ...args),

  /** Debug — only printed in __DEV__ mode (local dev server). */
  debug: (...args: unknown[]) => {
    if (__DEV__) {
      console.debug(PREFIX, '🔍', ...args);
    }
  },
};
