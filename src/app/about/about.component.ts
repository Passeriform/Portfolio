import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FetchService } from '../services/fetch.service';
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
    private fetcher: FetchService,
    private loaderService: LoaderService
  ) {
    this.loaderService.beginLoading();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subject = params.get('subject') || 'passeriform';
    });

    this.fetcher.getResponse(`${Constants.API_URL}/about/${this.subject}`).subscribe(
      model => {
        this.model = model;

        if (this.model === undefined) {
          this.router.navigate(['/about']);
        } else {
          this.loaderService.endLoading();
        }

        if (this.model.contributors !== undefined) {
          this.model.contributors.map(contributor => {
            contributor.showToggle = false;
          });
        }
      },
      (error) => {},
      () => {
        this.loaderService.beginLoading();
      }
    );
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
