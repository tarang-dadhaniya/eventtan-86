import { Injectable } from "@angular/core";

export interface WebView {
  id: string;
  eventId: string;
  srNo: number;
  title: string;
  type: string;
  floorPlanTypes: string[]; // Can have multiple: mobile, desktop, or both
  floorPlanFor?: string; // Floor plan location/area
  fileName?: string; // Uploaded file name (for Standard type)
  url?: string; // URL (for External type)
}

@Injectable({
  providedIn: "root",
})
export class WebViewService {
  private webViews: WebView[] = [
    {
      id: "1",
      eventId: "event1",
      srNo: 1,
      title: "IFEX Layout Plan",
      type: "Standard",
      floorPlanTypes: ["mobile", "desktop"],
    },
    {
      id: "2",
      eventId: "event1",
      srNo: 2,
      title: "Auxiliary Equipment",
      type: "External",
      floorPlanTypes: ["desktop"],
    },
  ];

  getWebViewsByEvent(eventId: string): WebView[] {
    return this.webViews.filter((webView) => webView.eventId === eventId);
  }

  addWebView(
    eventId: string,
    webViewData: Omit<WebView, "id" | "eventId" | "srNo">,
  ): void {
    const existingWebViews = this.getWebViewsByEvent(eventId);
    const newSrNo =
      existingWebViews.length > 0
        ? Math.max(...existingWebViews.map((w) => w.srNo)) + 1
        : 1;

    const newWebView: WebView = {
      id: Date.now().toString(),
      eventId,
      srNo: newSrNo,
      ...webViewData,
    };
    this.webViews.push(newWebView);
  }

  updateWebView(id: string, webViewData: Partial<WebView>): void {
    const index = this.webViews.findIndex((w) => w.id === id);
    if (index !== -1) {
      this.webViews[index] = { ...this.webViews[index], ...webViewData };
    }
  }

  deleteWebView(id: string): void {
    const index = this.webViews.findIndex((w) => w.id === id);
    if (index !== -1) {
      this.webViews.splice(index, 1);
    }
  }
}
