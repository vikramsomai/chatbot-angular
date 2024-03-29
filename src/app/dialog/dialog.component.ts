import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(public dialogref:MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data:ChatComponent){
  }
  close(){
    this.dialogref.close()
  }
}
