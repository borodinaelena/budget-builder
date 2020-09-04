import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    _months: string[] = ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February'];


    constructor() { }

    public get monts() {
        return this._months;
    }

    public initData(year) {
        const data = JSON.parse(localStorage.getItem(year));

        if (!data || !data.income_categories || !data.expense_categories) {
            return new FormGroup({
                income_categories: new FormArray([]),
                expense_categories: new FormArray([]),
            });
        }
        return new FormGroup({
            income_categories: new FormArray(this.getControllers(data.income_categories)),
            expense_categories: new FormArray(this.getControllers(data.expense_categories)),
        });

    }

    getControllers(data) {
        const controllers = [];
        data.map(category => {
            controllers.push(new FormGroup({
                name: new FormControl(category.name),
                values: new FormArray(this.getArrayData(category.values, true)),
                openMenu: new FormControl(false)
            }));
        });
        return controllers;
    }


    public getArrayData(values, isArray): AbstractControl[] {
        const array: AbstractControl[] = [];
        values.map(v => {
            array.push(isArray ? new FormArray(this.getArrayData(v, false)) : new FormControl(v));
        });
        return array;
    }
}

