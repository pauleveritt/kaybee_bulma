parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({10:[function(require,module,exports) {
"use strict";function e(e,n){for(var t=[],r=[],o=arguments.length;o-- >2;)t.push(arguments[o]);for(;t.length;){var u=t.pop();if(u&&u.pop)for(o=u.length;o--;)t.push(u[o]);else null!=u&&!0!==u&&!1!==u&&r.push(u)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}}function n(e,n,t,r){var o,u=[].map,l=r&&r.children[0]||null,i=l&&function e(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:u.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:e(n)})}}(l),a=[],f=!0,c=p(e),s=function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){var u=o(e);return"function"==typeof u&&(u=u(g(n,c),r)),u&&u!==(t=g(n,c))&&!u.then&&h(c=m(n,p(t,u),c)),u}}(o,r[o]):e(n.concat(o),t[o]=p(t[o]),r[o]=p(r[o]));return r}([],c,p(n));return h(),s;function v(e){return"function"==typeof e?v(e(c,s)):null!=e?e:""}function d(){o=!o;var e=v(t);for(r&&!o&&(l=function e(n,t,r,o,u){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var l=function e(n,t){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(t=t||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName);var o=n.attributes;if(o){o.oncreate&&a.push(function(){o.oncreate(r)});for(var u=0;u<n.children.length;u++)r.appendChild(e(n.children[u]=v(n.children[u]),t));for(var l in o)b(r,l,o[l],null,t)}return r}(o,u);n.insertBefore(l,t),null!=r&&k(n,t,r),t=l}else if(null==r.nodeName)t.nodeValue=o;else{!function(e,n,t,r){for(var o in p(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var u=f?t.oncreate:t.onupdate;u&&a.push(function(){u(e,n)})}(t,r.attributes,o.attributes,u=u||"svg"===o.nodeName);for(var i={},c={},s=[],d=r.children,h=o.children,m=0;m<d.length;m++){s[m]=t.childNodes[m];var g=y(d[m]);null!=g&&(i[g]=[s[m],d[m]])}for(var m=0,N=0;N<h.length;){var g=y(d[m]),w=y(h[N]=v(h[N]));if(c[g])m++;else if(null==w||f)null==g&&(e(t,s[m],d[m],h[N],u),N++),m++;else{var x=i[w]||[];g===w?(e(t,x[0],x[1],h[N],u),m++):x[0]?e(t,t.insertBefore(x[0],s[m]),x[1],h[N],u):e(t,s[m],null,h[N],u),c[w]=h[N],N++}}for(;m<d.length;)null==y(d[m])&&k(t,s[m],d[m]),m++;for(var m in i)c[m]||k(t,i[m][0],i[m][1])}return t}(r,l,i,i=e)),f=!1;a.length;)a.pop()()}function h(){o||(o=!0,setTimeout(d))}function p(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function m(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?m(e.slice(1),n,t[e[0]]):n,p(t,r)):n}function g(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function y(e){return e?e.key:null}function N(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)for(var u in p(r,t)){var l=null==t||null==t[u]?"":t[u];"-"===u[0]?e[n].setProperty(u,l):e[n][u]=l}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},e.events[n]=t,t?r||e.addEventListener(n,N):e.removeEventListener(n,N)):n in e&&"list"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.h=e,exports.app=n;
},{}],3:[function(require,module,exports) {

},{}],32:[function(require,module,exports) {
"use strict";var e=this&&this.__assign||Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var a in r=arguments[t])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e};function r(r,t,n){var a={};return Object.entries(r).map(function(o){var s=o[0],c=o[1],i=n+"/../"+c.docname,p=e({},c,{references:[],href:i});if(p.props.published){var u=new Date(p.props.published);p.props.published=u.toDateString()}Object.entries(c.props.references||{}).map(function(a){var o=a[0],s=a[1];if("author"===o){var c,i=s[0],u=t.author[i].docname,l=r[u],f=n+"/../"+l.docname,h=l.props.images;h&&h.map(function(e){var r=e.usage,t=e.filename;"icon_24"===r&&(c=f+"/../"+t)}),l&&(p.author={docname:u,href:f,title:l.title,label:i,thumbnailUrl:c,props:e({},l.props)})}else p.references=[],s.map(function(e){var a=t[o][e].docname,s=r[a],c=n+"/../"+s.docname;p.references.push({reftype:o,href:c,label:e,docname:a,title:s.title})})}),a[s]=p}),a}function t(e,r){var t=[];return Object.entries(e).map(function(e){var n=e[0],a=e[1],o={label:n,value:n,control:"checkbox",choices:{}};Object.entries(a).map(function(e){var t=e[0],n=e[1];if(n.count){var a=n.docname,s=r[a].title;o.choices[t]={label:s,value:a,checked:!1}}}),t.push(o)}),t}exports.__esModule=!0,exports.setResources=r,exports.setFilterGroups=t;
},{}],11:[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,s){function u(e){try{c(n.next(e))}catch(e){s(e)}}function o(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(u,o)}c((n=n.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var r,n,i,s,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(s){return function(o){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(i=2&s[0]?n.return:s[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,s[1])).done)return i;switch(n=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return u.label++,{value:s[1],done:!1};case 5:u.label++,n=s[1],s=[0];continue;case 7:s=u.ops.pop(),u.trys.pop();continue;default:if(!(i=(i=u.trys).length>0&&i[i.length-1])&&(6===s[0]||2===s[0])){u=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){u.label=s[1];break}if(6===s[0]&&u.label<i[1]){u.label=i[1],i=s;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(s);break}i[2]&&u.ops.pop(),u.trys.pop();continue}s=t.call(e,u)}catch(e){s=[6,e],n=0}finally{r=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,o])}}};exports.__esModule=!0;var r=require("./dbjson");function n(e){var t=[];return e&&e.map(function(e){Object.values(e.choices).map(function(r){r.checked&&t.push([e.value,r.value])})}),t}function i(e,t){var r=e.slice();return t.length&&(r=e.filter(function(e){var r=!1;return t.map(function(t){var n=t[0],i=t[1];if("author"===n)e.author&&e.author.docname===i&&(r=!0);else{var s=e.references;s&&s.map(function(e){e.reftype===n&&e.docname===i&&(r=!0)})}}),r})),r}exports.getFilterGroupValues=n,exports.filterValues=i;var s=function(){return function(){var s=this;this.setDbUrl=function(e){return{dbUrl:e}},this.getState=function(){return function(e){return e}},this.setFetching=function(e){return{isFetching:e}},this.setNotification=function(e){return{notification:e}},this.filterResults=function(){return function(e,t){var r=Object.values(e.resources);return e.filterTerm&&(r=r.filter(function(t){return(t.title+" "+t.excerpt).toLowerCase().includes(e.filterTerm.toLowerCase())})),{results:r=i(r,n(e.filterGroups))}}},this.setDb=function(e){return function(t,n){if(e.resources||!e.references){var i=r.setResources(e.resources,e.references,t.dbUrl),s=r.setFilterGroups(e.references,e.resources);return n.filterResults(),{resources:i,filterGroups:s}}n.setNotification("Server data missing resources or references")}},this.getJson=function(r){return function(n,i){return e(s,void 0,void 0,function(){var e,n,s;return t(this,function(t){switch(t.label){case 0:i.setDbUrl(r),i.setFetching(!0),i.setNotification(""),t.label=1;case 1:return t.trys.push([1,4,,5]),[4,fetch(r)];case 2:if(200!==(e=t.sent()).status)throw Error(e.statusText);return[4,e.json()];case 3:return n=t.sent(),i.setDb(n),i.filterResults(),[3,5];case 4:throw s=t.sent(),i.setNotification("Error: "+s.message),new Error(s.message);case 5:return i.setFetching(!1),[2]}})})}},this.setFilterTerm=function(e){return{filterTerm:e}},this.setFilterChoice=function(){return function(e){return{filterGroups:e.filterGroups.slice()}}}}}();exports.default=s;
},{"./dbjson":32}],20:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=require("hyperapp");exports.default=function(e){var r=e.actions;return t.h("p",null,t.h("button",{class:"button is-primary",onclick:function(){return console.log("State:",r.getState())}},"Dump State"))};
},{"hyperapp":10}],21:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var i=require("hyperapp");exports.default=function(t){var r=t.notification;if(r)return i.h("div",{class:"notification is-primary"},"Notification: ",r)};
},{"hyperapp":10}],22:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var a=require("hyperapp");exports.default=function(){return a.h("div",{class:"kbb-pagination"},a.h("nav",{class:"pagination",role:"navigation","aria-label":"pagination"},a.h("a",{class:"pagination-previous"},"Previous"),a.h("a",{class:"pagination-next"},"Next page"),a.h("ul",{class:"pagination-list"},a.h("li",null,a.h("a",{class:"pagination-link","aria-label":"Goto page 1"},"1")),a.h("li",null,a.h("span",{class:"pagination-ellipsis"},"…")),a.h("li",null,a.h("a",{class:"pagination-link","aria-label":"Goto page 45"},"45")),a.h("li",null,a.h("a",{class:"pagination-link is-current","aria-label":"Page 46","aria-current":"page"},"46")),a.h("li",null,a.h("a",{class:"pagination-link","aria-label":"Goto page 47"},"47")),a.h("li",null,a.h("span",{class:"pagination-ellipsis"},"…")),a.h("li",null,a.h("a",{class:"pagination-link","aria-label":"Goto page 86"},"86")))))};
},{"hyperapp":10}],56:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(r){var s=r.href,t=r.src,i=r.title;return e.h("a",{class:"level-item kbb-fl-author",href:s},e.h("figure",{class:"image is-rounded is-24x24",style:"margin: 0"},t&&e.h("img",{src:t,height:"24",width:"24"})),e.h("span",null,i))};
},{"hyperapp":10}],57:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var a=require("hyperapp");exports.default=function(e){var s=e.duration;if(s)return a.h("span",{className:"kbb-fl-duration level-item"},a.h("span",{className:"icon"},a.h("i",{className:"fas fa-video"})),a.h("span",null,s))};
},{"hyperapp":10}],68:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(r){var a=r.href,s=r.label;return e.h("span",{class:"tag"},e.h("a",{href:a},s))};
},{"hyperapp":10}],58:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var r=require("hyperapp"),t=e(require("./Reference"));exports.default=function(e){var u=e.values;return r.h("div",{class:"tags"},u.map(function(e){return r.h(t.default,{key:e.href,href:e.href,label:e.label})}))};
},{"hyperapp":10,"./Reference":68}],23:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var i=require("hyperapp"),t={angularjs:"http://konpa.github.io/devicon/devicon.git/icons/angularjs/angularjs-original.svg",typescript:"http://konpa.github.io/devicon/devicon.git/icons/typescript/typescript-original.svg",debugging:"http://konpa.github.io/devicon/devicon.git/icons/typescript/typescript-original.svg",react:"http://konpa.github.io/devicon/devicon.git/icons/react/react-original-wordmark.svg"};exports.default=function(e){var o=e.technology;return t[o]?i.h("figure",{className:"image is-96x96 }"},i.h("img",{src:t[o]})," ",o):i.h("div",null,o)};
},{"hyperapp":10}],47:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var l=require("hyperapp"),r=e(require("./Author")),t=e(require("./Duration")),a=e(require("./References")),s=e(require("./TechLogo"));exports.default=function(e){var u=e.resource,h=u.references.map(function(e){return{key:e.docname,href:e.href,label:e.label}}),i=h[0]?h[0].label:"";return l.h("div",{class:"kbb-fl-result box"},l.h("article",{class:"media"},l.h("div",{class:"media-left"},i&&l.h(s.default,{technology:i})),l.h("div",{class:"media-content"},l.h("div",{class:"content"},l.h("p",null,l.h("a",{href:u.docname},l.h("strong",null,u.title)),l.h("br",null),l.h("span",null,u.excerpt))),l.h("nav",{class:"level is-mobile"},l.h("div",{class:"level-left"},u.author&&l.h(r.default,{href:u.author.href,src:u.author.thumbnailUrl,title:u.author.title}),l.h("span",{class:"level-item"},l.h(a.default,{values:h}))),l.h("div",{class:"level-right is-size-7 has-text-grey"},u.props.duration&&l.h(t.default,{duration:u.props.duration}),l.h("span",{class:"level-item"},u.props.published))))))};
},{"hyperapp":10,"./Author":56,"./Duration":57,"./References":58,"./TechLogo":23}],23:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var r=require("hyperapp"),u=e(require("./Result"));exports.default=function(e){var t=e.values;if(t)return r.h("div",null,t&&Object.values(t).map(function(e){return r.h(u.default,{resource:e})}))};
},{"hyperapp":10,"./Result":47}],24:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var s=require("hyperapp");exports.default=function(e){var t=e.actions;return s.h("div",{class:"field"},s.h("p",{class:"control is-expanded has-icons-left"},s.h("input",{class:"input",type:"text",placeholder:"Filter listing...",autoFocus:!0,onkeyup:function(s){var e=s.target;t.setFilterTerm(e.value),t.filterResults()}}),s.h("span",{class:"icon is-small is-left"},s.h("i",{class:"fas fa-search"}))))};
},{"hyperapp":10}],44:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(c){var t=c.choices,l=c.actions;return e.h("div",null,Object.values(t).map(function(c){return e.h("div",{class:"control"},e.h("label",{class:"checkbox is-horizontal"},e.h("input",{type:"checkbox",name:c.value,checked:c.checked,oninput:function(e){var t=e.target;c.checked=t.checked,l.setFilterChoice(),l.filterResults()}}),e.h("span",{class:"kbb-label"},c.label)))}))};
},{"hyperapp":10}],45:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(a){var t=a.choices,l=a.actions;return e.h("div",null,Object.values(t).map(function(a){return e.h("div",{class:"control"},e.h("label",{class:"radio is-horizontal"},e.h("input",{type:"radio",value:a.value,oninput:function(e){var t=e.target;a.checked=t.checked,l.setFilterChoice()}}),e.h("span",{class:"kbb-label"},a.label)))}))};
},{"hyperapp":10}],46:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(r){r.choices,r.actions;return e.h("div",null,"sc")};
},{"hyperapp":10}],25:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var r=require("hyperapp"),c=e(require("./SidebarCheckbox")),t=e(require("./SidebarRadio")),i=e(require("./SidebarSelect"));exports.default=function(e){var s=e.filterGroups,u=e.actions;return r.h("div",null,s.map(function(e){if(Object.keys(e.choices).length)return r.h("div",{class:"kbb-sidebargroup"},r.h("p",{class:"menu-label"},e.label," ",e.choices),function(){switch(e.control){case"checkbox":return r.h(c.default,{choices:e.choices,actions:u});case"radio":return r.h(t.default,{choices:e.choices,actions:u});case"select":return r.h(i.default,{choices:e.choices,actions:u});default:return null}}())}))};
},{"hyperapp":10,"./SidebarCheckbox":44,"./SidebarRadio":45,"./SidebarSelect":46}],33:[function(require,module,exports) {
"use strict";function e(e){for(var t="";e.parentNode;){if(t=(e=e.parentNode).getAttribute("data-filteredlistingurl"))return t;if("body"===e.tagName.toLowerCase())return}}exports.__esModule=!0,exports.getDbUrl=e;
},{}],6:[function(require,module,exports) {
"use strict";var i=this&&this.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};exports.__esModule=!0;var e=require("hyperapp"),t=i(require("./Dumpstate")),r=i(require("./Notification")),s=i(require("./Pagination")),u=i(require("./Results")),a=i(require("./Searchbox")),n=i(require("./Sidebar")),o=require("./utils"),l=function(i,e){var t=o.getDbUrl(i);t&&e.getJson(t)};exports.default=function(i,o){return e.h("div",{class:"kbb-fl",oncreate:function(i){return l(i,o)}},e.h("div",{class:"columns is-centered"},e.h("div",{class:"column is-half"},e.h(r.default,{notification:i.notification}),e.h(a.default,{actions:o}),i.notification&&e.h("div",{class:"notification is-warning"},i.notification))),e.h("div",{class:"columns"},e.h("div",{class:"column"},e.h(n.default,{filterGroups:i.filterGroups,actions:o}),e.h(t.default,{actions:o})),e.h("div",{class:"column is-four-fifths"},e.h(u.default,{values:i.results}),e.h(s.default,null))))};
},{"hyperapp":10,"./Dumpstate":20,"./Notification":21,"./Pagination":22,"./Results":23,"./Searchbox":24,"./Sidebar":25,"./utils":33}],12:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e={isFetching:!1,notification:"Initial State",filterGroups:[],filterTerm:"",resources:{},results:[]};exports.default=e;
},{}],1:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var t=require("hyperapp");require("./scss/kaybee_bulma.scss"),require("./scss/pygments.css");var r=e(require("./filteredlisting/Actions")),s=e(require("./filteredlisting/Container")),i=e(require("./filteredlisting/State"));t.app(i.default,new r.default,s.default,document.getElementById("kbb-fl"));
},{"hyperapp":10,"./scss/kaybee_bulma.scss":3,"./scss/pygments.css":3,"./filteredlisting/Actions":11,"./filteredlisting/Container":6,"./filteredlisting/State":12}]},{},[1], null)
//# sourceMappingURL=/kaybee_bulma.map