import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MainmenuService {

	private readonly MILISECONDS_TO_RESPONSE = 0;

	private readonly menu: any[] = [
		{
			title: 'Usuarios',
			icon: 'group',
			submenu: [
				{
					title: 'Motor de Reglas',
					items: [
						{ 
							title: 'Normativas', 
							path: '/' 
						}
					],
				}
			]
		}
	];

    getMenu(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.menu);
                observer.complete();
            }, this.MILISECONDS_TO_RESPONSE)
        });
    }

	constructor() {}
}
