import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MainmenuService {

	private readonly MILISECONDS_TO_RESPONSE = 1000;

	private readonly menu: any[] = [
		{
			title: 'Usuarios',
			icon: 'leaderboard',
			modules: [
				{
					title: 'Motor de Reglas',
					items: [
						{ 
							title: 'Normativas', 
							path: '/parametros/motor-reglas/normativas' 
						},
						{
							title: 'Reglas de Sistema',
							path: '/parametros/motor-reglas/reglas-sistema',
						},
						{ 
							title: 'Calendario', 
							path: '/parametros/motor-reglas/calendario' 
						},
						{ 
							title: 'Multas', 
							path: '/parametros/motor-reglas/multas' 
						},
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
