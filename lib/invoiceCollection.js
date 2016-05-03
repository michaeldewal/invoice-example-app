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
      if(!isNaN(parseInt(queryParams[k])) && queryParams[k] !== "") {
        filter[k.replace('filter', '').firstToType('lower')] = (isNaN(parseInt(queryParams[k])))?queryParams[k]:parseInt(queryParams[k]);
      }
    }
  }

  const getTimeRange = function(timeRange) {
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
      return timeRanges[timeRange]();
    } else {
      return timeRanges['today']();
    }
  };

  const selectedDate = getTimeRange(timeRange);


  if(selectedDate !== false) filter.createdAt = { '$gte': selectedDate };
  console.log(filter);
  return invoices.find(filter, {sort: sort});
};

/*
TODO implement this

invoices.createFilter = function(params){
  let fn;
  const typeCaster = function(type, variable) {
    const types = {
      text(v) {
        return v;
      },
      number(v) {
        return parseInt(v);
      },
      date(v) {
        return new Date(v);
      }
    };
    if(types[type]) {
      return types[type](variable);
    } else {
      return types['text'](variable);
    }
  };
  let filter = {};
  params.forEach(function(param){
    filter[param.name] = typeCaster(params.type, params,value);
  });

  console.log(filter);
};
  */