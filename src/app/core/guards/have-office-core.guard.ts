import { Injectable } from '@angular/core';
import { CanLoad, CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HaveOfficeCoreGuard implements CanLoad, CanActivate {

  constructor(
    private store: Store<fromCore.State>
  ) { }

  canLoad(): Observable<boolean> {
    return this.store.pipe(select(fromCore.getUserOffice),
      map(userOffice => {
        if (!userOffice) {
          this.store.dispatch(new fromCore.Go({ path: ['user-office', 'select-office'] }));
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(fromCore.getUserOffice),
      map(userOffice => {
        if (!userOffice) {
          this.store.dispatch(new fromCore.Go({ path: ['user-office', 'select-office'] }));
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
