import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PagePermissions } from 'src/app/models/Master';
import { WaterBarge, WaterDistribution, WaterOutlet, WaterRequisition } from 'src/app/models/Water-requisition';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserSessionStoreService } from 'src/app/Services/user-session-store.service';
import { WaterRequisitionService } from 'src/app/Services/water-requisition.service';

@Component({
  selector: 'app-assign-schedule',
  templateUrl: './assign-schedule.component.html',
  styleUrls: ['./assign-schedule.component.scss']
})
export class AssignScheduleComponent implements OnInit {

  @Input() waterRequisition: WaterRequisition;
  @Input() enableBack: boolean = false;

  @Output() onBack = new EventEmitter();

  waterDistributions: WaterDistribution[] = [];
  waterOutlets: WaterOutlet[] = [];
  waterBarges: WaterBarge[] = [];
  currentDate = new Date();
  selectedBarge: WaterBarge | number;
  currentWaterDistribution: WaterDistribution;
  filteredWaterOutlets: WaterOutlet[] = [];
  permissions: PagePermissions;

  constructor(
    private _waterRequisitionService: WaterRequisitionService,
    private _toasterService: ToasterService,
    private _router: Router,
    private _sessionService: UserSessionStoreService
  ) { }

  ngOnInit(): void {
    this.permissions = this._sessionService.getPagePermissions(this.enableBack ? "/water-requisition/assign-schedule" : this._router.url)
    this.loadWaterDistributions();
    this.loadWaterBarges();
    this.loadWaterOutlets();
  }

  loadWaterDistributions() {
    this._waterRequisitionService.getAllWaterDistributions().subscribe(
      {
        next: (data) => {
          this.waterDistributions = data;
          this.waterDistributions.forEach(slot => this.formatWaterDispenseSlot(slot));
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  loadWaterBarges() {
    this._waterRequisitionService.getAllWaterBarges().subscribe({
      next: (data) => {
        this.waterBarges = data;
      }
    });
  }

  loadWaterOutlets() {
    this._waterRequisitionService.getAllWaterOutlets().subscribe({
      next: (data) => {
        this.waterOutlets = data;
        this.filteredWaterOutlets = data;
      }
    });
  }

  formatWaterDispenseSlot(Distribution: WaterDistribution) {
    Distribution.endDate = new Date(Distribution.endDate);
    Distribution.startDate = new Date(Distribution.startDate);
    Distribution.text = Distribution.remarks;
  }

  onWaterDispenseSlotAdded(e: any) {
    // console.log(this.generateWaterDistributionFromAppointment(e.appointmentData));
    this._waterRequisitionService.createWaterDistribution(
      this.generateWaterDistributionFromAppointment(e.appointmentData))
      .subscribe({
        next: (data) => {
          this._toasterService.showToaster('Successfully created', 'success');
          this.enableBack ? this.onBack.emit() : this.loadWaterDistributions();
        },
        error: (err) => {
          this._toasterService.showToaster('Failed! Please try again', 'error');
          // console.log(err);
        }
      });
  }

  generateWaterDistributionFromAppointment(appointment: any): WaterDistribution {
    return <WaterDistribution>{
      startDate: new Date(new Date(appointment.startDate).setHours(appointment.startDate.getHours() + 6)).toISOString(),
      endDate: new Date(new Date(appointment.endDate).setHours(appointment.endDate.getHours() + 6)).toISOString(),
      waterRequisitionId: this.waterRequisition?.id ?? appointment.waterRequisitionId,
      userId: this.waterRequisition?.userId ?? appointment.userId,
      uomId: this.waterRequisition?.uomId ?? appointment.uomId,
      outletId: appointment.outletId,
      rate: this.waterRequisition?.rate ?? appointment.rate,
      qty: this.waterRequisition?.qty ?? appointment.qty,
      distributionStatus: 'pending',
      remarks: appointment.text,
    };
  }

  onWaterDistributionUpdated(e: any) {
    var distributionToUpdate = this.generateWaterDistributionFromAppointment(e.appointmentData);
    distributionToUpdate.id = e.appointmentData.id;
    this._waterRequisitionService.updateWaterDistribution(distributionToUpdate).subscribe({
      next: (data) => {
        this.loadWaterDistributions();
        this._toasterService.showToaster('Successfully updated', 'success');
      },
      error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error');
      }
    });
  }

  onWaterDistributionDeleted(e: any) {
    this._waterRequisitionService.deleteWaterDistribution(e.appointmentData.id).subscribe({
      next: (data) => {
        this.loadWaterDistributions();
        this._toasterService.showToaster('Successfully deleted', 'success');
      },
      error: (err) => {
        this._toasterService.showToaster('Failed! Please try again', 'error');
      }
    });
  }


  onAppointmentFormOpening(e: any) {
    const that = this;
    let form = e.form;
    let remark = this.enableBack ? this.waterRequisition.remarks : e.appointmentData.text;
    e.popup._$content[0].classList.add("custom-popup-width")

    form.option('items', [
      {
        label: {
          text: 'Name',
        },
        cssClass: 'fix-label-position',
        colSpan: 2,
        dataField: 'text',
        editorType: 'dxTextBox',
        editorOptions: {
          stylingMode: 'outlined',
          height: 40,
          value: remark,
        },
        validationRules: [
          {
            type: 'required',
            message: 'Required'
          }
        ]
      },
      {
        label: {
          text: 'Start Date',
        },
        cssClass: 'fix-label-position',
        dataField: 'startDate',
        editorType: 'dxDateBox',
        editorOptions: {
          stylingMode: 'outlined',
          type: "datetime",
          height: 40
        },
        validationRules: [
          {
            type: 'required',
            message: 'Start Date Required'
          }
        ]
      },
      {
        label: {
          text: 'End Date',
        },
        cssClass: 'fix-label-position',
        dataField: 'endDate',
        editorType: 'dxDateBox',
        editorOptions: {
          stylingMode: 'outlined',
          type: "datetime",
          height: 40
        },
        validationRules: [
          {
            type: 'required',
            message: 'End Date Required'
          }
        ]
      },
      // {
      //   label: {
      //     text: 'Water Barge',
      //   },
      //   cssClass: 'fix-label-position',
      //   dataField: 'waterBarge',
      //   editorType: 'dxSelectBox',
      //   editorOptions: {
      //     stylingMode: 'outlined',
      //     height: 40,
      //     dataSource: that.waterBarges,
      //     displayExpr: 'name',
      //     valueExpr: 'id',
      //     onValueChanged(args: any) {
      //       that.onBargeSelected(args);
      //       console.log(form);
      //       // filterOutlets = allOutlets.filter(outlet => outlet.bargeId == args.value);
      //     }
      //   },
      //   validationRules: [
      //     {
      //       type: 'required',
      //       message: 'Water barge required'
      //     }
      //   ]
      // },
      {
        label: {
          text: 'Water Outlet',
        },
        cssClass: 'fix-label-position',
        dataField: 'outletId',
        editorType: 'dxSelectBox',
        editorOptions: {
          stylingMode: 'outlined',
          height: 40,
          dataSource: that.waterOutlets,
          displayExpr: 'name',
          valueExpr: 'id',
        },
        validationRules: [
          {
            type: 'required',
            message: 'Water outlet required'
          }
        ]
      },

    ]
    )

  }

}
