import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { MessageService } from "../../services/message.service";
import { Message } from "../../interface/message";
import { Observable } from 'rxjs';
import { GridOptions } from "ag-grid/main";

@Component({
  selector: 'app-message-grid',
  templateUrl: './message-grid.component.html',
  styles: []
})
export class MessageGridComponent implements OnInit {

  public results = [];

  private gridOptions: GridOptions;
  private initialRowDataLoad$;
  public showGrid: boolean;
  private columnDefs: any[];

  constructor(private messageService: MessageService) {

    this.initialRowDataLoad$ = this.messageService.getMessages();
    this.gridOptions = <GridOptions>{
      enableRangeSelection: true,
      enableColResize: true,
      columnDefs: this.createColumnDefs(),

      deltaRowDataMode: true,
      getRowNodeId: function (data) {
        return data.code;
      },
      onGridReady: () => {
        this.initialRowDataLoad$.subscribe(
          rowData => {
            if (rowData != null || rowData != undefined) {
            }
            this.gridOptions.api.setRowData(rowData);
          }
        );
        this.gridOptions.api.sizeColumnsToFit();
      }
    };
  }


  ngOnInit() { }

  private createColumnDefs() {
    return [
      { headerName: "UserId", field: "userId", width: 70 },
      { headerName: "MessageSummary", field: "summary", width: 70 },
      { headerName: "MessageDate", field: "messageDate", width: 70 }
    ]
  }

}

