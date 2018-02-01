import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    private scItemCountChangeSource=new Subject<any>();//shopping cart item count
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    scItemCountChangeEmitted$=this.scItemCountChangeSource.asObservable();//shopping cart item count
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

    //shopping cart item count
    scItemCountChange(change:any){
        this.scItemCountChangeSource.next(change);
    }
    // Service message commands end    
}