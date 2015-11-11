module.exports = function(config) {
    "use strict";


  return function(scribe) {
      const {cssClass} = config;
      const template = "<span class='" + cssClass + "'>$&</span>";
      const underlinerCommand = new scribe.api.Command('underliner');
      underlinerCommand.queryEnabled = () => { return true; };


      underlinerCommand.execute = function underlinerCommandExecute (terms) {
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
              const regex = new RegExp(term, 'gi');
              return html.replace(regex, template);
          }, html);

          scribe.setHTML(replaced);
      };

      scribe.commands['underliner'] = underlinerCommand;
  };
};
