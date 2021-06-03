import $ from '../core';

$.prototype.setAttr = function(nameAtt, value) {
    if (!nameAtt || !value) {
        return this;
    }
    for (let i = 0; i < this.length; i++) {
        this[i].setAttribute(nameAtt, value);
    }

    return this;
};

$.prototype.getAttr = function(nameAtt) {
    if (!nameAtt) {
        return this;
    }
    for (let i = 0; i < this.length; i++) {
        if (!this[i].hasAttribute(nameAtt) && this[i].getAttribute(nameAtt) != null) {
            continue;
        }
        return this[i].getAttribute(nameAtt);
    }

    return this;
};

$.prototype.toggleAttr = function(nameAtt, value) {
    if (!nameAtt || !value) {
        return this;
    }
    for (let i = 0; i < this.length; i++) {
        if (this[i].hasAttribute(nameAtt)) {
            this[i].removeAttribute(nameAtt);
        } else {
            this[i].setAttribute(nameAtt, value);
        }
    }

    return this;
};

$.prototype.removeAttr = function(nameAtt) {
    if (!nameAtt) {
        return this;
    }
    for (let i = 0; i < this.length; i++) {
        if (!this[i].hasAttribute(nameAtt)) {
            continue;
        }
        this[i].removeAttribute(nameAtt);
    }

    return this;
};