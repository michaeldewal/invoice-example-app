invoices = new Mongo.Collection("invoices");
invoices.limit_results_by = 50;
invoices.limit_increase_by = 50;
invoices.byTimeRange = function(timeRange = "today", queryParams) {
  let limit = invoices.limit_results_by;

  if (queryParams !== undefined && queryParams.hasOwnProperty('limit')) {
    limit = parseInt(queryParams.limit);
    delete queryParams['limit'];
  }

  queryParams = (isEmpty(queryParams)) ? {sortCreatedAt: "DESC", sortTotal: "ASC"} : queryParams;

  console.log(queryParams);
  const sort = {};
  const filter = {};
  for (let k in queryParams) {
    console.log('k', k);
    if(k.indexOf('sort') > -1) {
      sort[k.replace('sort', '').firstToType('lower')] = (queryParams[k] === 'DESC') ? -1 : 1;
    } else if(k.indexOf('filter') > -1) {
      filter[k.replace('filter', '').firstToType('lower')] = invoices.createFilter(queryParams[k]);
    }
  }
  console.log('first',filter);

  const getTimeRange = function(timeRange, date=false) {
    const today = new Date();
    const timeRanges = {
      today(){
        today.setSeconds(0);
        today.setMinutes(0);
        today.setHours(0);
        return today;
      },
      week(){
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      },
      month(){
        return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      },
      all(){
        return false;
      }
    };

    if(timeRanges[timeRange]) {
      if(false !== date) {
        return timeRanges[timeRange](date);
      }
      return timeRanges[timeRange]();
    } else {
      return timeRanges['today']();
    }
  };

  const selectedDate = getTimeRange(timeRange);


  if(selectedDate !== false && typeof filter.createdAt === "undefined") filter.createdAt = { '$gte': selectedDate };
  console.log('filter', filter);
  return invoices.find(filter, {sort: sort});
};

invoices.createFilter = function(param){

  const typeCaster = function(type, variable) {
    const types = {
      text(v) {
        return v;
      },
      number(v) {
        return parseInt(v);
      },
      date(v) {
        const date = new Date(v);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    };
    if(types[type]) {
      return types[type](variable);
    } else {
      return types['text'](variable);
    }
  };
  if(param !== "") {
    // is it a date?
    if(isNaN(Date.parse(param))) {
      //is integer?
      if(isNaN(parseInt(param))) {
        return typeCaster('test', param);
      } else {
        return typeCaster('number', param);
      }
    } else {
      return typeCaster('date', param);
    }
  }
};