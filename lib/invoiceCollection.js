invoices = new Mongo.Collection("invoices");
invoices.byTimeRange = function(timeRange = "today", queryParams) {
        let limit = 100;
        if(queryParams.hasOwnProperty('limit')) {
            limit = parseInt(queryParams.limit);
            delete queryParams['limit'];
        }
        console.log('limit', limit);

        queryParams = (isEmpty(queryParams))?{sortCreatedAt: "DESC", sortTotal: "ASC"}:queryParams;

        const sort = {};
        for (let k in queryParams) {
            sort[k.replace('sort', '').firstToType('lower')] = (queryParams[k] === 'DESC')?-1:1;
        }

        let selectedDate;
        const today = new Date();
        switch(timeRange) {
            case 'week':
                selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
                break;
            case 'month':
                selectedDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                break;
            case 'all':
                selectedDate = false;
            break;
            default:
            case 'today':
                selectedDate = today;
                selectedDate.setSeconds(0);
                selectedDate.setHours(0);
                selectedDate.setMinutes(0);
                break;
        }

        const filter = (selectedDate !== false)?{ createdAt: { '$gte': selectedDate }}:{};

    return invoices.find(filter, {sort: sort, limit: limit});
};