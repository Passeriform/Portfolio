import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoaderService } from '../services/loader.service';

import { Constants } from '../common/global';

import { AboutModel } from './about.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit, AfterViewInit {
  public model: AboutModel;
  private subject: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private loaderService: LoaderService
  ) {
    // TODO: Improve this loader flushing
    // this.loaderService.flushJobs();
    this.loaderService.beginLoading('[page] load');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subject = params.get('subject') ?? 'passeriform';
    });

    this.loaderService.beginLoading('[http] about');

    this.http.get<AboutModel>(`${Constants.API_URL}/about/${this.subject}`)
    .pipe(
      catchError((error) => {
        console.log('ErrorService triggered error.');
        return Observable.throw(error.message);
      })
    )
    .subscribe((model) => {
      this.model = model;

      this.loaderService.endLoading('[http] about');

      if (!this.model) {
        this.router.navigate(['/about']);
      }
    });
  }

  ngAfterViewInit() {
    this.loaderService.endLoading('[page] load');
  }
}
