import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SellerloginComponent } from './sellerlogin/sellerlogin.component';
import { SellerregistrationComponent } from './sellerregistration/sellerregistration.component';
import { ProductformComponent } from './productform/productform.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';
import { CartComponent } from './cart/cart.component';
import { BuysellComponent } from './buysell/buysell.component';
import { SellerViewComponent } from './seller-view/seller-view.component';
import { authGuard } from './auth.guard';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { SellermaintainComponent } from './sellermaintain/sellermaintain.component';
import { SellerGuideComponent } from './seller-guide/seller-guide.component';
import { LoggeduserComponent } from './loggeduser/loggeduser.component';
import { LoggedcartComponent } from './loggedcart/loggedcart.component';
import { LoggeduserproductsComponent } from './loggeduserproducts/loggeduserproducts.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'sellerlogin', component: SellerloginComponent },
  { path: 'sellerregistration', component: SellerregistrationComponent },
  { path: 'productform', component: ProductformComponent },
  { path: 'productdisplay', component: ProductdisplayComponent },
  { path: 'cart', component: CartComponent },
  { path: 'buysell', component: BuysellComponent },
  { path: 'editproductform/:id', component: EditProductFormComponent },
  {
    path: 'sellerview',
    component: SellerViewComponent,
    canActivate: [authGuard],
  },
  { path: 'sellermaintain', component: SellermaintainComponent },
  {
    path: 'sellerguide',
    component: SellerGuideComponent,
  },
  {path:'loggeduser', component: LoggeduserComponent},
  {path:'loggedcart', component: LoggedcartComponent},
  {path: 'loggeduserproducts' , component: LoggeduserproductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
