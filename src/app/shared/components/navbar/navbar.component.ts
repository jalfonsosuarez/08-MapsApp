import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { filter, map } from 'rxjs';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  router = inject(Router);

  routes = routes
    .map((route) => ({
      path: route.path,
      title: `${route.title ?? 'Mapas en Angular 19'}`,
    }))
    .filter((route) => route.path !== '**');

  // Usando observable
  pageTitle$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    // tap((event) => console.log(event)),
    map((event) => event.url),
    map(
      (url) =>
        routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas'
    )
  );

  // Usando signal
  pageTitle = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      // tap((event) => console.log(event)),
      map((event) => event.url),
      map(
        (url) =>
          routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas'
      )
    )
  );
}
