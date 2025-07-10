// utils/observer.ts
export type ListenerCallback = () => void;

class Observer {
  private listeners: ListenerCallback[] = [];

  public subscribe(listener: ListenerCallback): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export default Observer;
