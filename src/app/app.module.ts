import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { MaterialModule } from './material-module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { SellerloginComponent } from './sellerlogin/sellerlogin.component';
import { SellerregistrationComponent } from './sellerregistration/sellerregistration.component';
import { ProductformComponent } from './productform/productform.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';
import { CartComponent } from './cart/cart.component';
import { BuysellComponent } from './buysell/buysell.component';
import { HttpClientModule } from '@angular/common/http';
import { SellerViewComponent } from './seller-view/seller-view.component';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { SellermaintainComponent } from './sellermaintain/sellermaintain.component';
import { SellerGuideComponent } from './seller-guide/seller-guide.component';
import { LoggeduserComponent } from './loggeduser/loggeduser.component';
import { LoggedcartComponent } from './loggedcart/loggedcart.component';
import { LoggeduserproductsComponent } from './loggeduserproducts/loggeduserproducts.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegistrationComponent,
    SellerloginComponent,
    SellerregistrationComponent,
    ProductformComponent,
    ProductdisplayComponent,
    CartComponent,
    BuysellComponent,
    SellerViewComponent,
    EditProductFormComponent,
    SellermaintainComponent,
    SellerGuideComponent,
    LoggeduserComponent,
    LoggedcartComponent,
    LoggeduserproductsComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
