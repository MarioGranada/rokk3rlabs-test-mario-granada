'use strict';

var services = angular.module('services',[]);



services.factory("Book",function($scope,$http){
    var Book=function(titleItem,artistName,price,image) {
        this.titleItem=titleItem;
        this.artistName=artistName;
        this.price=price;
        this.image=image;
    };

    return Book;
});

services.factory("Checkout",function(){
    var Checkout=function(){
        this.checkoutItems=[];
        this.total=0.0;
    }
    Checkout.prototype.addItem = function(item) {
        this.checkoutItems.push(item);
        this.updateTotal(item.price);
    };
    Checkout.prototype.setItemsList=function(itemsList){
        this.checkoutItems=[];//Reseting the Checkout List in order to avoid duplicates
        this.checkoutItems=itemsList;
        for (var i = 0; i < itemsList.length ; i++) {
            this.updateTotal(itemsList[i].price);
        };
    }
    Checkout.prototype.getItems=function(){
        return this.checkoutItems;
    };
    Checkout.prototype.updateTotal=function(addValue){
        this.total+=parseFloat(addValue);
        return this.total;
    };
    Checkout.prototype.getTotal=function(){
        return this.total;
    };
    Checkout.prototype.getElementsLength=function(){
        return this.checkoutItems.length;
    };
    return Checkout;
});

services.factory("Cart",function(){
    var Cart=function(){
        this.cartItems=[];
        this.total=0.0;
    }
    Cart.prototype.addItem = function(item) {
        this.cartItems.push(item);
        this.updateTotal(item.price);
    };
    Cart.prototype.getItems=function(){
        return this.cartItems;
    };
    Cart.prototype.updateTotal=function(addValue){
        this.total+=parseFloat(addValue);
        return this.total;
    };
    Cart.prototype.getTotal=function(){
        return this.total;
    };
    return Cart;
});

services.service('CheckoutService',function(Checkout) {
    
    var Checkout=new Checkout();
    return {
        Checkout: Checkout
    }
    
});
services.service('CartService',function(Cart) {
    
    var Cart=new Cart();
    return {
        Cart: Cart
    }
    
});