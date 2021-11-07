import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class HelpersService {

    constructor(
        private platformLocation: PlatformLocation
    ) {}

    public assetsUrl() {
        const path = this.platformLocation.getBaseHrefFromDOM();
        return `${path}assets`;
    }
}