import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { LandingModule } from './landing/landing.module';
import { WorkModule } from './work/work.module';
import { AboutModule } from './about/about.module';
import { SharedModule } from './shared/shared.module';

import { HttpErrorInterceptor } from '@app/core/interceptors/http-error.interceptor';

@NgModule({
	imports: [
		FormsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,

		CoreModule,
		LandingModule,
		WorkModule,
		AboutModule,
		SharedModule,
	],
	declarations: [AppComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
