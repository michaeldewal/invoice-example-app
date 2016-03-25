
if(Meteor.isClient) {
    invoices = new Mongo.Collection("invoices");
    Template.invoicestemplate.helpers({
        invoices: function() {
            console.log("invoices helper")
            let filter = Session.get("invoiceFilter");
            let sort = Session.get("invoiceSort");
            if(!filter) {
                filter = {};
            }
            Meteor.subscribe("invoiceCollection", filter, sort);
            if(sort) {
                return invoices.find(filter, {sort: sort});
            }

            return invoices.find(filter);
        }
    });

    Template.registerHelper('formatDate', function(date) {
        return moment(date).format('DD-MM-YYYY');
    });

    Template.invoicestemplate.events({
        'click .today': function() {
            var morning = new Date();
            morning.setSeconds(0);
            morning.setHours(0);
            morning.setMinutes(0);

            var evening = new Date();
            evening.setSeconds(59);
            evening.setHours(23);
            evening.setMinutes(59);

            Session.set("invoiceFilter", {
                createdAt: {
                    '$gte': morning,
                    '$lt': evening
                }
            });
        },
        'click .week': function() {
            var today = new Date();
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            Session.set("invoiceFilter", {
                createdAt: {
                    '$gte': lastWeek,
                    '$lt': today
                }
            });
        },
        'click .month': function() {
            var today = new Date();
            var lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            Session.set("invoiceFilter", {
                createdAt: {
                    '$gte': lastMonth,
                    '$lt': today
                }
            });
        },
        'click .all': function() {
            Session.set("invoiceFilter", {});
        },
        'click .generate': function() {
            var total = 100;
            for(var i=0;i<total;i++) {

                var curDate = new Date().getTime();
                var lastMonthDate = new Date();
                lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
                lastMonthDate = lastMonthDate.getTime();

                invoices.insert({
                    invoiceNr: Math.floor(Math.random() * (1000000 + 1)),
                    total: Math.floor(Math.random() * (100000 + 1)),
                    createdAt: new Date(lastMonthDate + Math.random() * (curDate - lastMonthDate))
                });
            }
        },
        'click .filterInvoiceNr': function() {
            let sort = Session.get("invoiceSort", {});
            let newSort = {};
            if(sort)
            {
                if(sort.invoiceNr === 1) {
                    newSort["invoiceNr"] = -1;
                } else {
                    newSort["invoiceNr"] = 1;
                }
            }
            Session.set("invoiceSort", newSort);
        },
        'click .filterTotal': function() {
            console.log("filter total")
            let sort = Session.get("invoiceSort", {});
            let newSort = {};
            if(sort)
            {
                if(sort.total === 1) {
                    newSort["total"] = -1;
                } else {
                    newSort["total"] = 1;
                }
            }
            Session.set("invoiceSort", newSort);
        },
        'click .filterCreatedAt': function() {
            console.log("filter date")

            let sort = Session.get("invoiceSort", {});
            let newSort = {};

            if(sort)
            {
                if(sort.createdAt === 1) {
                    newSort["createdAt"] = -1;
                } else {
                    newSort["createdAt"] = 1;
                }
            }
            Session.set("invoiceSort", newSort);
        }
    });
}
