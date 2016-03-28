invoices = new Mongo.Collection("invoices");
Meteor.publish("invoiceCollection", function(filter, sort){
    if(sort) {
        return invoices.find(filter, {sort: sort});
    }

    return invoices.find(filter);
});

Meteor.methods({generateInvoices: function() {
    const total = 100;
    for(let i=0;i<total;i++) {

        const curDate = new Date().getTime();
        let lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
        lastMonthDate = lastMonthDate.getTime();
        let date = new Date(lastMonthDate + Math.random() * (curDate - lastMonthDate));
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        invoices.insert({
            invoiceNr: Math.floor(Math.random() * (1000000 + 1)),
            total: Math.floor(Math.random() * (100000 + 1)),
            createdAt: date
        });
    }
}});