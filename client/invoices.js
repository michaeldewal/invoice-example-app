if(Meteor.isClient) {
    console.log("invoices.js")
    Template.invoicestemplate.helpers({
        invoices: function() {
            let filter = Session.get("invoiceFilter", {});
            let sort = Session.get("invoiceSort", {});
            if(!filter) {
                filter = {};
            }
            console.log(sort);
            if(sort) {
                console.log("sorting", filter, sort);
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
                    '$lt': evening,
                }
            });
        },
        'click .week': function() {
            var today = new Date();
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            Session.set("invoiceFilter", {
                createdAt: {
                    '$gte': new Date(lastWeek.toISOString()),
                    '$lt': new Date(today.toISOString())
                }
            });
        },
        'click .month': function() {
            var today = new Date();
            var lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            Session.set("invoiceFilter", {
                createdAt: {
                    '$gte': new Date(lastMonth.toISOString()),
                    '$lt': new Date(today.toISOString())
                }
            });
        },
        'click .all': function() {
            Session.set("invoiceFilter", {});
        },
        'click .generate': function() {
            console.log("generating data");
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
            console.log("filter nr")
            let sort = Session.get("invoiceSort", {});
            if(!sort) {
                sort = {

                };
            }
            if(sort)
            {
                if(sort.invoiceNr === 1) {
                    sort["invoiceNr"] = -1;
                } else {
                    sort["invoiceNr"] = 1;
                }
            }
            Session.set("invoiceSort", sort);
        },
        'click .filterTotal': function() {
            console.log("filter total")
            let sort = Session.get("invoiceSort", {});
            if(!sort) {
                sort = {};
            }
            if(sort)
            {
                if(sort.total === 1) {
                    sort["total"] = -1;
                } else {
                    sort["total"] = 1;
                }
            }
            Session.set("invoiceSort", sort);
        },
        'click .filterCreatedAt': function() {
            console.log("filter date")

            let sort = Session.get("invoiceSort", {});
            if(!sort) {
                sort = {};
            }
            if(sort)
            {
                if(sort.createdAt === 1) {
                    sort["createdAt"] = -1;
                } else {
                    sort["createdAt"] = 1;
                }
            }
            Session.set("invoiceSort", sort);
        }
    });
}