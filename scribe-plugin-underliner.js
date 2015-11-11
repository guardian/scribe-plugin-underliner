(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.scribePluginUnderliner = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function (config) {
    "use strict";

    return function (scribe) {
        var cssClass = config.cssClass;

        var template = "<span class='" + cssClass + "'>$&</span>";
        var underlinerCommand = new scribe.api.Command("underliner");
        underlinerCommand.queryEnabled = function () {
            return true;
        };

        underlinerCommand.execute = function underlinerCommandExecute(terms) {
            var html = scribe.el.innerHTML;

            // filter the already wrapped terms
            var notWrapped = terms.filter(function (term) {
                var tmp = document.createElement("div");
                tmp.innerHTML = html;
                var spans = tmp.querySelectorAll("." + cssClass);

                // if the term is in the spans, return false
                var isWrapped = !!Array.prototype.filter.call(spans, function (span) {
                    return span.innerText === term;
                }).length;

                return !isWrapped;
            });

            var replaced = notWrapped.reduce(function (current, term) {
                var regex = new RegExp(term, "gi");
                return html.replace(regex, template);
            }, html);

            scribe.setHTML(replaced);
        };

        scribe.commands.underliner = underlinerCommand;
    };
};

},{}]},{},[1])(1)
});