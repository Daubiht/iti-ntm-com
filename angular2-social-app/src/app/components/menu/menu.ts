import { Component, Input } from '@angular/core';
import { Channel } from 'models';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { Router } from '@angular/router/src/router';

/**
 * Side menu that allow to naviaget inside the differents channels
 */
@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    @Input() channels: Channel[];
}