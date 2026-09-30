/**
 * Advanced structured logger for EventHunters.
 * Ready for backend/analytics integration (e.g. Sentry, PostHog, or Datadog).
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogMeta = Record<string, unknown>;

class Logger {
  private prefix = '[EventHunters]';
  private logs: Array<{ level: LogLevel; message: string; meta?: LogMeta; timestamp: Date }> = [];

  private formatMeta(meta?: LogMeta): string {
    if (!meta || Object.keys(meta).length === 0) return '';
    try {
      return `\n    ↳ ${JSON.stringify(meta)}`;
    } catch {
      return ' [meta formatting error]';
    }
  }

  private pushLog(level: LogLevel, message: string, meta?: LogMeta) {
    this.logs.push({ level, message, meta, timestamp: new Date() });
    // Keep memory bounded
    if (this.logs.length > 500) this.logs.shift();
  }

  public debug(message: string, meta?: LogMeta) {
    if (__DEV__) {
      console.debug(`${this.prefix} 🐛 [DEBUG] ${message}${this.formatMeta(meta)}`);
      this.pushLog('debug', message, meta);
    }
  }

  public info(message: string, meta?: LogMeta) {
    console.info(`${this.prefix} ℹ️ [INFO] ${message}${this.formatMeta(meta)}`);
    this.pushLog('info', message, meta);
  }

  public warn(message: string, meta?: LogMeta) {
    console.warn(`${this.prefix} ⚠️ [WARN] ${message}${this.formatMeta(meta)}`);
    this.pushLog('warn', message, meta);
  }

  public error(message: string, error?: Error | unknown, meta?: LogMeta) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const combinedMeta = { ...meta, error: errMsg, stack: error instanceof Error ? error.stack : undefined };
    console.error(`${this.prefix} 🚨 [ERROR] ${message}${this.formatMeta(combinedMeta)}`);
    this.pushLog('error', message, combinedMeta);
    // TODO: Send to Sentry (e.g., Sentry.captureException(error))
  }

  /**
   * Analytics - track user actions/events
   */
  public trackEvent(eventName: string, properties?: LogMeta) {
    console.log(`${this.prefix} 📊 [EVENT] ${eventName}${this.formatMeta(properties)}`);
    // TODO: Send to PostHog/Mixpanel
  }

  /**
   * Analytics - track screen views
   */
  public trackScreen(screenName: string, properties?: LogMeta) {
    console.log(`${this.prefix} 📱 [SCREEN] ${screenName}${this.formatMeta(properties)}`);
    // TODO: Send to PostHog/Mixpanel
  }

  /**
   * Analytics - identify user for telemetry
   */
  public identifyUser(userId: string, traits?: LogMeta) {
    console.log(`${this.prefix} 👤 [IDENTIFY] User: ${userId}${this.formatMeta(traits)}`);
    // TODO: Sentry.setUser({ id: userId }), PostHog.identify(userId)
  }

  /**
   * Retrieve in-memory logs (useful for a hidden Dev Settings screen)
   */
  public getLogs() {
    return this.logs;
  }
}

export const logger = new Logger();
