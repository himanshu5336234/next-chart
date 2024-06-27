interface Listener {
  (data: any): void;
}

class WebSocketClient {
  private static instance: WebSocketClient | null = null;
  private static url: string | null = null;
  private socket: WebSocket | null = null;
  private listeners: { [key: string]: Listener[] } = {};
  private isAppInBackground = false;
  private messageQueue: string[] = [];
  private retryCount = 0;
  private maxRetries = 5;

  private constructor(url: string) {
    if (WebSocketClient.instance) {
      return WebSocketClient.instance;
    }
    WebSocketClient.url = url;
    this.connect(url);
    this.setupAppListeners(); // Setup listeners for web environment
    WebSocketClient.instance = this;
  }

  private connect(url: string): void {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log("WebSocket connected");
        this.retryCount = 0; // Reset retry count on successful connection
        if (!this.isAppInBackground) {
          this.emit("open");
        }
      };

      this.socket.onmessage = (message: MessageEvent) => {
        this.messageQueue.push(message.data);
        if (!this.isAppInBackground) {
          this.processMessageQueue();
        }
      };

      this.socket.onclose = () => {
        console.log("WebSocket closed");
        if (!this.isAppInBackground) {
          this.emit("WebSocketClosed");
          this.attemptReconnect();
        }
      };

      this.socket.onerror = (error: Event) => {
        console.error("WebSocket error:", error);
        if (!this.isAppInBackground) {
          this.emit("WebSocketError", error);
          this.attemptReconnect();
        }
      };
    }
  }

  private attemptReconnect(): void {
    if (this.retryCount < this.maxRetries) {
      setTimeout(() => {
        this.retryCount += 1;
        this.connect(WebSocketClient.url!);
      }, Math.pow(2, this.retryCount) * 1000); // Exponential backoff
    } else {
      this.emit("WebSocketFailure", "Max retries exceeded");
    }
  }

  private processMessageQueue(): void {
    if (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()!;
      setTimeout(() => {
        this.emit("WebSocketMessage", message);
        this.processMessageQueue();
      }, 700); // 700ms delay
    }
  }

  public sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.log("WebSocket is not open. ReadyState:", this.socket?.readyState);
    }
  }

  public addListener(event: string, listener: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  public removeListener(event: string, listener: Listener): void {
    if (this.listeners[event]) {
      const index: number = this.listeners[event].indexOf(listener);
      if (index !== -1) {
        this.listeners[event].splice(index, 1);
      }
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.listeners = {};
      this.messageQueue = [];
      this.socket.close();
    }
  }

  public removeAllListeners(): void {
    this.listeners = {};
  }

  private emit(event: string, data?: any): void {
    const listeners = this.listeners[event];
    if (listeners) {
      listeners.forEach((listener) => {
        listener(data);
      });
    }
  }

  private setupAppListeners(): void {
    // Simulate app state change for web environment
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.isAppInBackground = true;
      } else {
        this.isAppInBackground = false;
        this.processMessageQueue();
      }
    });
  }

  public static getInstance(url: string): WebSocketClient {
    if (!this.instance) {
      this.instance = new WebSocketClient(url);
    }
    return this.instance;
  }
}

export default WebSocketClient;
