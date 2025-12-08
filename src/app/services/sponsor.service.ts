import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Sponsor {
  id: string;
  eventId: string;
  companyName: string;
  email: string;
  phone: string;
  track: string;
  sequence: number;
  companyLogo?: string;
}

@Injectable({
  providedIn: "root",
})
export class SponsorService {
  private readonly STORAGE_KEY = "eventtan_sponsors";
  private sponsorsSubject = new BehaviorSubject<Sponsor[]>(
    this.loadFromStorage(),
  );

  private loadFromStorage(): Sponsor[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const sponsors = stored ? JSON.parse(stored) : [];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sponsors));
    return sponsors;
  }

  getSponsors(): Sponsor[] {
    return this.sponsorsSubject.value;
  }

  getSponsorsByEvent(eventId: string): Sponsor[] {
    return this.getSponsors()
      .filter((sponsor) => sponsor.eventId === eventId)
      .sort((a, b) => a.sequence - b.sequence);
  }

  addSponsor(
    eventId: string,
    sponsor: Omit<Sponsor, "id">,
  ): Sponsor {
    const newSponsor: Sponsor = {
      ...sponsor,
      id: this.generateId(),
    };

    const sponsors = this.getSponsors();
    sponsors.push(newSponsor);
    this.sponsorsSubject.next(sponsors);
    this.saveToStorage(sponsors);
    return newSponsor;
  }

  updateSponsor(
    id: string,
    updates: Partial<Omit<Sponsor, "id" | "eventId">>,
  ): void {
    const sponsors = this.getSponsors().map((sponsor) => {
      if (sponsor.id === id) {
        return { ...sponsor, ...updates };
      }
      return sponsor;
    });
    this.sponsorsSubject.next(sponsors);
    this.saveToStorage(sponsors);
  }

  deleteSponsor(id: string): void {
    const sponsors = this.getSponsors().filter((sponsor) => sponsor.id !== id);
    this.sponsorsSubject.next(sponsors);
    this.saveToStorage(sponsors);
  }

  private saveToStorage(sponsors: Sponsor[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sponsors));
  }

  private generateId(): string {
    return `sponsor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
