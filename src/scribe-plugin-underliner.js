module.exports = function(config) {
    "use strict";


  return function(scribe) {
      const template = (cssClass, term) => {
          return ['<span class="', cssClass, '">', term, '</span>'].join('');
      };

      const {cssClass} = config;
      const underlinerCommand = new scribe.api.Command('underliner');
      underlinerCommand.queryEnabled = () => { return true; };


      underlinerCommand.execute = (terms) => {
          const html = scribe.el.innerHTML;

          // filter the already wrapped terms
          const notWrapped = terms.filter((term) => {
              const tmp = document.createElement('div');
              tmp.innerHTML = html;
              const spans = tmp.querySelectorAll('.' + cssClass);

              // if the term is in the spans, return false
              const isWrapped = !!Array.prototype.filter.call(spans, (span) => {
                  return span.innerText === term;
              }).length;

              return !isWrapped;
          });

          const replaced = notWrapped.reduce((current, term) => {
              return html.replace(term, template(cssClass, term));
          }, html);

          scribe.setHTML(replaced);
      };

      scribe.commands['underliner'] = underlinerCommand;
  };
};
