FlowRouter.route("/:type", {
    action: function(params, qParams) {
        console.log(params, qParams);
    }
});
FlowRouter.route("/", {
    action: function(params, qParams) {
        console.log(params, qParams);
    }
});