import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Exhibitor {
  id: string;
  eventId: string;
  companyName: string;
  hallNo: string;
  stallNo: string;
  registrationCode: string;
  phone?: string;
  email?: string;
  socialMedia?: {
    blogRss: boolean;
    facebook: boolean;
    twitter: boolean;
  };
  blogRssUrl?: string;
  facebookUrl?: string;
  exhibitorsFor?: string;
  website?: string;
  description?: string;
  companyLogo?: string;
  documentName?: string;
  productImageNames?: string[];
}

@Injectable({
  providedIn: "root",
})
export class ExhibitorService {
  private readonly STORAGE_KEY = "eventtan_exhibitors";
  private exhibitorsSubject = new BehaviorSubject<Exhibitor[]>(
    this.loadFromStorage(),
  );

  private loadFromStorage(): Exhibitor[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const exhibitors = stored ? JSON.parse(stored) : [];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(exhibitors));
    return exhibitors;
  }

  getExhibitors(): Exhibitor[] {
    return this.exhibitorsSubject.value;
  }

  getExhibitorsByEvent(eventId: string): Exhibitor[] {
    return this.getExhibitors().filter(
      (exhibitor) => exhibitor.eventId === eventId,
    );
  }

  addExhibitor(
    eventId: string,
    exhibitor: Omit<Exhibitor, "id" | "eventId">,
  ): Exhibitor {
    const newExhibitor: Exhibitor = {
      ...exhibitor,
      id: this.generateId(),
      eventId: eventId,
    };

    const exhibitors = this.getExhibitors();
    exhibitors.push(newExhibitor);
    this.exhibitorsSubject.next(exhibitors);
    this.saveToStorage(exhibitors);
    return newExhibitor;
  }

  updateExhibitor(
    id: string,
    updates: Partial<Omit<Exhibitor, "id" | "eventId">>,
  ): void {
    const exhibitors = this.getExhibitors().map((exhibitor) => {
      if (exhibitor.id === id) {
        return { ...exhibitor, ...updates };
      }
      return exhibitor;
    });
    this.exhibitorsSubject.next(exhibitors);
    this.saveToStorage(exhibitors);
  }

  deleteExhibitor(id: string): void {
    const exhibitors = this.getExhibitors().filter(
      (exhibitor) => exhibitor.id !== id,
    );
    this.exhibitorsSubject.next(exhibitors);
    this.saveToStorage(exhibitors);
  }

  private saveToStorage(exhibitors: Exhibitor[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(exhibitors));
  }

  private generateId(): string {
    return `exhibitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
