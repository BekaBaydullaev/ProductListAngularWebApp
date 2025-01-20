import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NotificationDialogData, NotificationType } from "../interfaces/notification-dialog-data.interface";
import { NotificationDialogComponent } from "../shared/notification-dialog/notification-dialog.component";

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private dialog: MatDialog) {}

  showNotification(
    type: NotificationType,
    message: string,
    header?: string
  ): void {
    this.dialog.open(NotificationDialogComponent, {
      width: 'auto',
      panelClass: 'notification-dialog',
      disableClose: false,
      data: { type, message, header } as NotificationDialogData
    });
  }

  showConfirmation(message: string, header: string = 'Confirm') {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      width: 'auto',
      panelClass: 'notification-dialog',
      disableClose: true,
      data: { 
        type: NotificationType.Confirm, 
        message, 
        header 
      } as NotificationDialogData
    });

    return dialogRef.afterClosed();
  }
}