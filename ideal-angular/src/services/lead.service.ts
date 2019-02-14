import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Lead } from '../models/lead.model';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

const BACKEND_URL = environment.apiUrl + '/leads';

@Injectable({providedIn: 'root'})
export class LeadService {
    private leads: Lead[] = [];
    private leadsUpdated = new Subject<{leads: Lead[]}>();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getLeads() {
        this.http
            .get<{message: string, leads: any}>(BACKEND_URL)
            .pipe(map((leadData) => {
                return {
                    leads: leadData.leads.map(lead => {
                        return {
                            email: lead.email,
                            name: lead.name,
                            phone: lead.phone,
                            comment: lead.comment,
                            car: lead.car,
                            employee: lead.employee,
                            id: lead._id
                        };
                    })
                };
            }))
            .subscribe((transformedLeadData) => {
                this.leads = transformedLeadData.leads;
                this.leadsUpdated.next({leads: [...this.leads]});
            });
    }

    getLeadUpdateListener() {
        return this.leadsUpdated.asObservable();
    }

    addCustomer(
        email: string,
        name: string,
        phone: string,
        comment: string,
        car: string,
        employee: string
    ) {
        const leadData: Lead = {
            email: email,
            name: name,
            phone: phone,
            comment: comment,
            car: car,
            employee: employee
        };
        this.http
            .post<{message: string, lead: Lead}>(BACKEND_URL, leadData)
            .subscribe((resData) => {
                window.location.reload();
            });
    }
}
