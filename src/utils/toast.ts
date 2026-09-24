type ToastType = "success" | "error" | "info";

interface ToastEvent {
  message: string;
  type: ToastType;
  id: string;
}

type ToastListener = (event: ToastEvent) => void;
const listeners = new Set<ToastListener>();

export const toast = {
  success: (message: string) => {
    toast.show(message, "success");
  },
  error: (message: string) => {
    toast.show(message, "error");
  },
  info: (message: string) => {
    toast.show(message, "info");
  },
  show: (message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2, 9);
    listeners.forEach((listener) => listener({ message, type, id }));
  },
  subscribe: (listener: ToastListener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};
