import { ChangeDetectorRef, Component, Inject, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-dialog-overview-example-dialog',
    templateUrl: 'dialog.html',
})
export class DialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>) { }

    close(value) {
        this.dialogRef.close(value);
    }
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent {
    all_categories: FormGroup;
    months: string[];
    total_incomes = [];
    total_expenses = [];
    selectedItem = '0';


    @Input() set formData(data) {
        this.all_categories = data;
    }

    @Output() public needSave = new EventEmitter<FormGroup>();

    income_categories_data: any[];

    constructor(
        public dataService: DataService,
        public dialog: MatDialog) {
        this.months = dataService.monts;

        const timerId = setInterval(() => {
            this.needSave.emit(this.all_categories);
        }, 10000);
    }



    onChangeValue(m) {
        const newValue = m.value[1] - m.value[0];
        m.controls[2].setValue(newValue);

        this.needSave.emit(this.all_categories);

    }

    checkChange(v) {
        if (v.value > 0) {
            return;
        }
        v.setValue(0);
        this.needSave.emit(this.all_categories);
    }

    changeName() {
        this.needSave.emit(this.all_categories);
    }

    addCategory($event, type) {

        if (!$event || !$event.target.value || $event.target.value.length < 3) {
            return;
        }
        const newCategory = {
            name: $event.target.value,
            values: []
        };

        for (let index = 0; index < 12; index++) {
            newCategory.values.push([0, 0, 0]);
        }

        this[type].push(new FormGroup({
            name: new FormControl(newCategory.name),
            values: new FormArray(this.dataService.getArrayData(newCategory.values, true)),
            openMenu: new FormControl(false)
        }));

        $event.target.value = '';
        this.needSave.emit(this.all_categories);
    }


    get income_categories() {
        return <FormArray>this.all_categories.get('income_categories');
    }
    get expense_categories() {
        return <FormArray>this.all_categories.get('expense_categories');
    }

    getTotal(type, month, valueIndex) {
        let res = 0;
        this[type].controls.map(cat => {
            res += cat.value.values[month][valueIndex];
        });
        return res;
    }

    openMenu(e, type?, i?) {
        e.preventDefault();

        this.income_categories.controls.map((control, index) => {
            const item = control.value;
            if (type && type === 'income_categories' && i === index) {
                item['openMenu'] = true;
            } else {
                item['openMenu'] = false;
            }
            control.setValue(item);
        });
        this.expense_categories.controls.map((control, index) => {
            const item = control.value;
            if (type && type === 'expense_categories' && i === index) {
                item['openMenu'] = true;
            } else {
                item['openMenu'] = false;
            }
            control.setValue(item);
        });
    }

    remove(type, i) {
        const dialogRef = this.dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this[type].removeAt(i);
            }
        });
    }

}
