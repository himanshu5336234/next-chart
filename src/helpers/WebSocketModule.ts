import { webSocketWorkerURL } from "./WebSocketWorker";

class NewWebSocketClient {
  private static instance: NewWebSocketClient | null = null;
  private worker: Worker;
  private listeners: { [key: string]: any[] } = {};

  private constructor(url: string) {
    this.worker = new Worker(webSocketWorkerURL);

    this.worker.onmessage = (e) => {
      const { type, payload } = e.data;
      if (this.listeners[type]) {
        this.listeners[type].forEach(listener => listener(payload));
      }
    };

    this.worker.postMessage({ type: 'INIT', payload: url });

    window.addEventListener('visibilitychange', this.handleVisibilityChange);
    NewWebSocketClient.instance = this;
  }

  public static getInstance(url: string): NewWebSocketClient {
    if (!this.instance) {
      this.instance = new NewWebSocketClient(url);
    }
    return this.instance;
  }

  public sendMessage(message: string): void {
    this.worker.postMessage({ type: 'SEND', payload: message });
  }

  public addListener(event: string, listener: any): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  public removeListener(event: string, listener: any): void {
    if (this.listeners[event]) {
      const index: number = this.listeners[event].indexOf(listener);
      if (index !== -1) {
        this.listeners[event].splice(index, 1);
      }
    }
  }

  public disconnect() {
    this.worker.postMessage({ type: 'DISCONNECT' });
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handleVisibilityChange = () => {
    const nextAppState = document.hidden ? 'inactive' : 'active';
    this.worker.postMessage({ type: 'APP_STATE_CHANGE', payload: nextAppState });
  };

  public removeAllListeners(): void {
    this.listeners = {};
  }
}

export default NewWebSocketClient;
