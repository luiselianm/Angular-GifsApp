import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
    this.searchTag(this._tagsHistory[0])
  }

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'Uylz1fWPzKTYiDM6lASSs4qPMHQpWkLs';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (tag.length < 1) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifsList = resp.data;
      });
  }
}
