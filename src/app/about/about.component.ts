import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LoadingState, LoaderService } from '../services/loader.service';

import { Constants } from '../common/global';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})

export class AboutComponent implements OnInit, AfterViewInit {
  public model: any;
  private subject: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private loaderService: LoaderService
  ) {
    this.loaderService.beginLoading();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subject = params.get('subject') || 'passeriform';
    });


    this.http.get(`${Constants.API_URL}/about/${this.subject}`)
    .pipe(
      catchError((error) => {
        console.log("ErrorService triggered error.");
        return Observable.throw(error.message);
      })
    )
    .subscribe((model) => {
      this.model = model;

      if (this.model === undefined) {
        this.router.navigate(['/about']);
      }

      if (this.model.contributors !== undefined) {
        this.model.contributors.map(contributor => {
          contributor.showToggle = false;
        });
      }
    });
  }

  ngAfterViewInit() {
    this.loaderService.endLoading();
  }

  public showTooltip(contributor): void {
    contributor.showToggle = true;
  }
  public hideTooltip(contributor): void {
    contributor.showToggle = false;
  }
}
