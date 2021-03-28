import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../interfaces/categories/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/categories';
  }

  getJSONCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url);
  }

  postJSONCategory(category: ICategory): Observable<void> {
    return this.http.post<void>(this.url, category);
  }

  deleteJSONCategory(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  editJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.url}/${category.id}`, category);
  }
}
