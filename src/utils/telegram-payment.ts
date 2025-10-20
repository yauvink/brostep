export interface PaymentCallbacks {
  onSuccess?: () => void;
  onFailed?: () => void;
  onCancelled?: () => void;
}

/**
 * Opens a Telegram invoice for payment
 * @param invoiceLink - The invoice link from the backend
 * @param callbacks - Callback functions for different payment statuses
 */
export function openTelegramInvoice(
  invoiceLink: string,
  callbacks?: PaymentCallbacks
): void {
  const webApp = window.Telegram?.WebApp;

  if (webApp?.openInvoice) {
    webApp.openInvoice(invoiceLink, (status) => {
      switch (status) {
        case 'paid':
          callbacks?.onSuccess?.();
          break;
        case 'failed':
          callbacks?.onFailed?.();
          break;
        case 'cancelled':
          callbacks?.onCancelled?.();
          break;
        case 'pending':
          // Do nothing for pending status
          break;
      }
    });
  } else {
    // Fallback: open in new window if WebApp API is not available
    window.open(invoiceLink, '_blank');
  }
}

