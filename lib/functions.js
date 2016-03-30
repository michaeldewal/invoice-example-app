String.prototype.firstToType = function(type = 'lower') {
    switch(type) {
        case 'lower':
            return this.charAt(0).toLowerCase() + this.slice(1);
        break;
        case 'upper':
            return this.charAt(0).toUpperCase() + this.slice(1);
        break;
    }
};

isEmpty = function(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
};