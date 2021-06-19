import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

	private readonly MILISECONDS_TO_RESPONSE = 0;

	private readonly menu: any[] = [
		{
			path: '/',
			icon: 'bx bx-grid-alt',
			linkName: 'Dashboard',
		},
		{
			
			icon: 'bx bx-collection',
			linkName: 'Category',
			submenu: [
				{ title: 'HTML & CSS', path: '/' },
				{ title: 'JavaScript', path: '/' },
				{ title: 'PHP & MySQL', path: '/' }
			]
		}
	];

    read(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.menu);
                observer.complete();
            }, this.MILISECONDS_TO_RESPONSE)
        });
    }

	constructor() {}
}
