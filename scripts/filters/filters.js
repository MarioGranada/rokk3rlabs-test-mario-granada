var filters = angular.module('filters',[]);

filters.filter('CheckoutTotalFilter', function () {
    return function (data, key1,key2) {        
        if (typeof (data) === 'undefined' && typeof (key1) === 'undefined' && typeof (key2) === 'undefined') {
            return 0;
        }
        // console.log(data);
        // console.log(key1);
        // console.log(data[key2]);
        // data.splice(key2,1);
        // console.log(key2)
        if (!(typeof (key2) === 'undefined')) {
            data.splice(key2,1);
        };
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum = sum +  parseInt(data[i][key1]);
        }
        // console.log("filtered");
        return sum;
    }
})