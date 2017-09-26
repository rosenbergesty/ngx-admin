import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ModalComponent } from '../../ui-features/modals/modal/modal.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      ID: {
        title: 'ID',
        type: 'number',
        addable: false,
        editable: false,
        filter: false
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      email: {
        title: 'E-mail',
        type: 'string',
        filter: false
      },
      total: {
        title: 'Stops',
        type: 'number',
        addable: false,
        editable: false,
        filter: false
      },
    },
  };

  constructor(private service: SmartTableService, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers(){
    this.source.empty();
    var drivers = [];
    this.service.getDrivers().subscribe(data=>{
      drivers = data;

      for(var i = 0; i < data.length; i++){
        this.getStops(drivers[i]);
      }
    });    
  }

  getStops(driver) {
    this.service.getStops(driver.ID).subscribe(resp=>{
      console.log(resp);
      if(resp != '0 results'){
        driver.total = resp.length;
      } else {
        driver.total = 0;
      }
      this.source.append(driver);
    });
  }

  onDeleteConfirm(event): void {
    console.log('delete');
  }

  onCreateConfirm(event): void{
    // Check if valid
    var valid = true;
    var name = event.newData.name;
    if(name.length <= 0){
      console.log('error');
      valid = false;
    }

    var email = event.newData.email;
    if(!this.validateEmail(email)){
      console.log('error');
      valid = false;
    }

    const activeModal = this.modalService.open(ModalComponent, { size: 'sm', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Small Modal';

  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  onSaveConfirm(event): void{
    console.log('save');
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'username',
        search: query
      },
      {
        field: 'email',
        search: query
      }
    ], false); 
  }

}
