import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

	private readonly MILISECONDS_TO_RESPONSE = 0;

	private readonly menu: any[] = [
		{
			path: '/home',
			icon: 'bx bx-grid-alt',
			linkName: 'Dashboard',
		},
		{
			icon: 'bx bx-home-smile',
			linkName: 'Propiedades',
			submenu: [
				{ title: 'Listado', path: '/home/propiedades' },
				{ title: 'Categorías', path: '/home/propiedad-categorias' },
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
