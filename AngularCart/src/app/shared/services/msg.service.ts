import { Injectable } from "@angular/core";
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class MsgService {

  constructor( private messageService: MessageService ) { }

  errorHandle (err:any) {

    if ( err.status !== 500 ) {

      if (err.error.summary) {
        this.msg('error', err.error.summary, err.error.detail, 5000);
      } else if (err.error.vError) {
        this.msg('error', err.error.vError, '', 5000);
      } else {
        this.msg('error', err.statusText, '', 5000);
      }

    } else {

      this.msg('error', 'Error', 'Something went wrong!');

    }

  }

  msg( severity: any, summary: any, detail: any, life?:any ) {

    this.messageService.add({severity, summary, detail});

    if ( life ) {
      setTimeout(() => {
        this.messageService.clear();
      }, life);
    }

  }
  
}
