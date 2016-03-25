if(Meteor.isServer) {
    invoices = new Mongo.Collection("invoices");
    Meteor.publish("invoiceCollection", function(filter, sort, limit){
        if(!filter) {
            filter = {};
        }
        console.log("server-filter", filter, sort);

        if(sort) {
            return invoices.find(filter, {sort: sort});
        }

        return invoices.find(filter);
    });
}