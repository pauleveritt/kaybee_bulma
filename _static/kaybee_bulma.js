parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({10:[function(require,module,exports) {
"use strict";function e(e,n){for(var t=[],r=[],o=arguments.length;o-- >2;)t.push(arguments[o]);for(;t.length;){var u=t.pop();if(u&&u.pop)for(o=u.length;o--;)t.push(u[o]);else null!=u&&!0!==u&&!1!==u&&r.push(u)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}}function n(e,n,t,r){var o,u=[].map,l=r&&r.children[0]||null,i=l&&function e(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:u.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:e(n)})}}(l),a=[],f=!0,c=p(e),s=function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){var u=o(e);return"function"==typeof u&&(u=u(g(n,c),r)),u&&u!==(t=g(n,c))&&!u.then&&h(c=m(n,p(t,u),c)),u}}(o,r[o]):e(n.concat(o),t[o]=p(t[o]),r[o]=p(r[o]));return r}([],c,p(n));return h(),s;function v(e){return"function"==typeof e?v(e(c,s)):null!=e?e:""}function d(){o=!o;var e=v(t);for(r&&!o&&(l=function e(n,t,r,o,u){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var l=function e(n,t){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(t=t||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName);var o=n.attributes;if(o){o.oncreate&&a.push(function(){o.oncreate(r)});for(var u=0;u<n.children.length;u++)r.appendChild(e(n.children[u]=v(n.children[u]),t));for(var l in o)b(r,l,o[l],null,t)}return r}(o,u);n.insertBefore(l,t),null!=r&&k(n,t,r),t=l}else if(null==r.nodeName)t.nodeValue=o;else{!function(e,n,t,r){for(var o in p(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var u=f?t.oncreate:t.onupdate;u&&a.push(function(){u(e,n)})}(t,r.attributes,o.attributes,u=u||"svg"===o.nodeName);for(var i={},c={},s=[],d=r.children,h=o.children,m=0;m<d.length;m++){s[m]=t.childNodes[m];var g=y(d[m]);null!=g&&(i[g]=[s[m],d[m]])}for(var m=0,N=0;N<h.length;){var g=y(d[m]),w=y(h[N]=v(h[N]));if(c[g])m++;else if(null==w||w!==y(d[m+1]))if(null==w||f)null==g&&(e(t,s[m],d[m],h[N],u),N++),m++;else{var x=i[w]||[];g===w?(e(t,x[0],x[1],h[N],u),m++):x[0]?e(t,t.insertBefore(x[0],s[m]),x[1],h[N],u):e(t,s[m],null,h[N],u),c[w]=h[N],N++}else null==g&&k(t,s[m],d[m]),m++}for(;m<d.length;)null==y(d[m])&&k(t,s[m],d[m]),m++;for(var m in i)c[m]||k(t,i[m][0],i[m][1])}return t}(r,l,i,i=e)),f=!1;a.length;)a.pop()()}function h(){o||(o=!0,setTimeout(d))}function p(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function m(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?m(e.slice(1),n,t[e[0]]):n,p(t,r)):n}function g(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function y(e){return e?e.key:null}function N(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)for(var u in p(r,t)){var l=null==t||null==t[u]?"":t[u];"-"===u[0]?e[n].setProperty(u,l):e[n][u]=l}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},e.events[n]=t,t?r||e.addEventListener(n,N):e.removeEventListener(n,N)):n in e&&"list"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.h=e,exports.app=n;
},{}],3:[function(require,module,exports) {

},{}],20:[function(require,module,exports) {
module.exports={resources:{about:{docname:"about",title:"About",parent_docnames:["index"],rtype:"article",props:{references:{category:["typescript","react"],author:["ernsthaagsman"]},published:"2017-10-01T00:00:00",excerpt:"Four score and a coupla years ago, our forefathers brought forth on this continent a new land, conceived in liberty, and dedicated to the proposition that all men are created equal.",primary_reference:"categories/react"},excerpt:"Four score and a coupla years ago, our forefathers brought forth on this continent a new land, conceived in liberty, and dedicated to the proposition that all men are created equal."},"articles/customizing/index":{docname:"articles/customizing/index",title:"Customizing",parent_docnames:["articles/index","index"],rtype:"section",props:{references:{category:["typescript","angular"],author:["pauleveritt"]},published:"2017-04-04T00:00:00",excerpt:"This section is about customizing. Meaning, customizing this package. The section is a subsection of the articles section, which has some other content in it.",primary_reference:"categories/react"},excerpt:"This section is about customizing. Meaning, customizing this package. The section is a subsection of the articles section, which has some other content in it.",section:"articles/index",toctree:["articles/customizing/resources","articles/customizing/widgets","articles/customizing/references","articles/customizing/layout"]},"articles/customizing/layout":{docname:"articles/customizing/layout",title:"Customizing Layout",parent_docnames:["articles/customizing/index","articles/index","index"],rtype:"article",props:{references:{category:["angular","typescript"],author:["pauleveritt"]},published:"2017-10-01T00:00:00",excerpt:"Change the look of a single page, a class of pages, a part of the site, or the entire site.",primary_reference:"categories/angular"},excerpt:"Change the look of a single page, a class of pages, a part of the site, or the entire site.",section:"articles/customizing/index"},"articles/customizing/references":{docname:"articles/customizing/references",title:"Customizing References",parent_docnames:["articles/customizing/index","articles/index","index"],rtype:"article",props:{references:{category:["react","angular"],author:["pauleveritt"]},published:"2017-10-01T00:00:00",excerpt:"References let you make a taxonomy scheme and link content.",primary_reference:"categories/react"},excerpt:"References let you make a taxonomy scheme and link content.",section:"articles/customizing/index"},"articles/customizing/resources":{docname:"articles/customizing/resources",title:"Customizing Resources",parent_docnames:["articles/customizing/index","articles/index","index"],rtype:"article",props:{references:{category:["react"],author:["pauleveritt"]},published:"2017-10-01T00:00:00",excerpt:"All the ways to make your own resources, from simple to in-depth.",primary_reference:"categories/angular"},excerpt:"All the ways to make your own resources, from simple to in-depth.",section:"articles/customizing/index"},"articles/customizing/widgets":{docname:"articles/customizing/widgets",title:"Customizing Widgets",parent_docnames:["articles/customizing/index","articles/index","index"],rtype:"article",props:{references:{author:["pauleveritt"]},published:"2017-10-01T00:00:00",excerpt:"Custom widgets let you re-use HTML snippets in the middle of your documents.",primary_reference:"categories/typescript"},excerpt:"Custom widgets let you re-use HTML snippets in the middle of your documents.",section:"articles/customizing/index"},"articles/first_article":{docname:"articles/first_article",title:"First Article",parent_docnames:["articles/index","index"],rtype:"article",props:{references:{category:["typescript","react"],author:["pauleveritt"]},published:"2015-01-02T12:01:00",excerpt:"A fine article, about all kinds of things. One can never tell the kinds of things that it is about.",primary_reference:"categories/typescript"},excerpt:"A fine article, about all kinds of things. One can never tell the kinds of things that it is about.",section:"articles/index"},"articles/index":{docname:"articles/index",title:"Articles",parent_docnames:["index"],rtype:"section",props:{references:{author:["pauleveritt"]},published:"2009-10-21T12:23:00",featured_resource:"articles/customizing/layout",subheading:"Standalone articles and some in a series, with code examples and diagrams."},toctree:["articles/customizing/index","articles/first_article"],get_featured_resource:"articles/customizing/layout"},"authors/ernsthaagsman/index":{docname:"authors/ernsthaagsman/index",title:"Ernst Haagsman",parent_docnames:["authors/index","index"],rtype:"author",props:{references:{author:["pauleveritt"]},published:"2018-01-02T12:01:00",images:[{usage:"icon_24",filename:"paul_headshotx24.jpeg"},{usage:"icon_128",filename:"paul_headshotx128.jpeg"}],label:"ernsthaagsman"},excerpt:"Ernst is a PMM at JetBrains.",section:"authors/index"},"authors/index":{docname:"authors/index",title:"Authors",parent_docnames:["index"],rtype:"section",props:{published:"2018-01-01T12:23:00"},excerpt:"Authors are resources that act as references, just like categories etc.",toctree:["authors/pauleveritt/index","authors/ernsthaagsman/index"]},"authors/pauleveritt/index":{docname:"authors/pauleveritt/index",title:"Paul Everitt",parent_docnames:["authors/index","index"],rtype:"author",props:{references:{author:["pauleveritt"]},published:"2018-01-02T12:01:00",images:[{usage:"icon_24",filename:"paul_headshotx24.jpeg"},{usage:"icon_128",filename:"paul_headshotx128.jpeg"}],label:"pauleveritt"},excerpt:"Paul Everitt is a developer advocate at JetBrains.",section:"authors/index"},"blog/index":{docname:"blog/index",title:"The Blog",parent_docnames:["index"],rtype:"section",props:{references:{author:["pauleveritt"]},published:"2009-10-21T12:23:00"},excerpt:"Stuff goes here."},"categories/angular":{docname:"categories/angular",title:"Angular",parent_docnames:["categories/index","index"],rtype:"category",props:{references:{author:["pauleveritt"]},published:"2018-10-21T12:23:00",label:"angular",logo:"http://konpa.github.io/devicon/devicon.git/icons/angularjs/angularjs-original.svg"},excerpt:"This is a category about stuff related to Angular.",section:"categories/index"},"categories/index":{docname:"categories/index",title:"Categories",parent_docnames:["index"],rtype:"section",props:{published:"2009-10-21T12:23:00"},toctree:["categories/angular","categories/react","categories/typescript"]},"categories/react":{docname:"categories/react",title:"React",parent_docnames:["categories/index","index"],rtype:"category",props:{references:{author:["pauleveritt"]},published:"2017-10-21T12:23:00",label:"react",logo:"http://konpa.github.io/devicon/devicon.git/icons/react/react-original-wordmark.svg"},excerpt:"This is a category about stuff related to React.",section:"categories/index"},"categories/typescript":{docname:"categories/typescript",title:"TypeScript",parent_docnames:["categories/index","index"],rtype:"category",props:{references:{author:["pauleveritt"]},published:"2016-10-21T12:23:00",label:"typescript",logo:"http://konpa.github.io/devicon/devicon.git/icons/typescript/typescript-original.svg"},excerpt:"This is a category about stuff related to TypeScript.",section:"categories/index"},"features/index":{docname:"features/index",title:"Features",parent_docnames:["index"],rtype:"section",props:{references:{author:["pauleveritt"]},published:"2017-10-01T00:00:00",subheading:"Brief survey of what Kaybee is good for"},excerpt:"Lots of choices out there for generating static sites. What makes Kaybee\ndifferent? As an author or a customizer, Kaybee has a number of compelling\nfeatures.",toctree:["features/theme"]},"features/theme":{docname:"features/theme",title:"Theme Features",parent_docnames:["features/index","index"],rtype:"article",props:{references:{category:["typescript","react"],author:["pauleveritt"]},published:"2017-10-01T00:00:00",excerpt:"The templating and CSS features for Kaybee, in detail."},excerpt:"The templating and CSS features for Kaybee, in detail.",section:"features/index"},index:{docname:"index",title:"Kaybee: Knowledge Base for Static Sites",parent_docnames:[],rtype:"homepage",props:{published:"2009-10-21T12:23:00",heading:"Kaybee",subheading:"Extensible Knowledge Base for Static Sites",hero_image:"library.jpg"},toctree:["about","blog/index","articles/index","features/index","categories/index","authors/index","README"]}},references:{author:{ernsthaagsman:{count:1,docname:"authors/ernsthaagsman/index"},pauleveritt:{count:15,docname:"authors/pauleveritt/index"}},category:{angular:{count:3,docname:"categories/angular"},react:{count:5,docname:"categories/react"},typescript:{count:5,docname:"categories/typescript"}},reference:{}}};
},{}],32:[function(require,module,exports) {
"use strict";var e=this&&this.__assign||Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var o in r=arguments[t])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var t=r(require("../../docs/_build/catalog.json"));function n(r,t,n){var o={};return Object.entries(r).map(function(s){var c=s[0],u=s[1],p=n+"/../"+u.docname+".html",a=e({},u,{references:[],href:p});if(a.props.primary_reference){var i=r[a.props.primary_reference];a.primary_reference={docname:i.docname,label:i.props.label,title:i.title,logo:i.props.logo}}if(a.props.published){var l=new Date(a.props.published);a.props.published=l.toDateString()}Object.entries(u.props.references||{}).map(function(o){var s=o[0],c=o[1];if("author"===s){var u,p=c[0],i=t.author[p].docname,l=r[i],f=n+"/../"+l.docname+".html",m=l.props.images;m&&m.map(function(e){var r=e.usage,t=e.filename;"icon_24"===r&&(u=f+"/../"+t)}),l&&(a.author={docname:i,href:f,title:l.title,label:p,thumbnailUrl:u,props:e({},l.props)})}c.map(function(e){var o=t[s][e].docname,c=r[o],u=n+"/../"+c.docname+".html";a.references.push({reftype:s,href:u,label:e,docname:o,title:c.title})})}),o[c]=a}),o}function o(e,r,t){var n={rtype:{label:"resource type",value:"rtype",control:"checkbox",choices:{}}},o={};return Object.entries(r).map(function(e){var r=e[0],n=e[1];t?n.parent_docnames.includes(t)&&(o[r]=n):o[r]=n}),Object.entries(o).map(function(t){t[0];var o=t[1];n.rtype.choices[o.rtype]?n.rtype.choices[o.rtype].count++:n.rtype.choices[o.rtype]={label:o.rtype,value:o.rtype,count:1},o.props&&o.props.references&&Object.entries(o.props.references).map(function(t){var o=t[0],s=t[1];n[o]||(n[o]={label:o,value:o,control:"checkbox",choices:{}});var c=n[o].choices;s.map(function(t){if(c[t])c[t].count++;else{var n=e[o][t],s=r[n.docname];c[t]={label:s.title,value:s.docname,count:1}}})})}),n}function s(e){var r=e.slice();return r.sort(function(e,r){return e.props.published>r.props.published?1:e.props.published===r.props.published?-1:0}),r}function c(e){var r={};return Object.values(e).map(function(e){var t=Object.values(e.choices).map(function(e){return!!e.checked&&e.value}).filter(function(e){return e});t&&(r[e.value]=t)}),r}function u(e,r,t){var n=e[r];if(0===n.length)return!0;var o=[];"rtype"===r?o=[t.rtype]:o=t.references.filter(function(e){return e.reftype===r}).map(function(e){return e.docname});return o.some(function(e){return n.includes(e)})}function p(e,r){var t=[];return Object.entries(e).map(function(e){var r=e[0];e[1].length&&t.push(r)}),!t.map(function(t){return u(e,t,r)}).includes(!1)}function a(e,r,t,n){var o=Object.values(r);return t&&(o=o.filter(function(e){return(e.title+" "+e.excerpt).toLowerCase().includes(t.toLowerCase())})),n&&(o=o.filter(function(e){return e.parent_docnames.includes(n)})),o=o.filter(function(r){return p(e,r)})}exports.sampleResources=t.default.resources,exports.sampleReferences=t.default.references,exports.setResources=n,exports.setFilterGroups=o,exports.sortResults=s,exports.reduceFilterGroups=c,exports.filterResourceGroup=u,exports.filterResourceGroups=p,exports.filterResources=a;
},{"../../docs/_build/catalog.json":20}],12:[function(require,module,exports) {
"use strict";var t=this&&this.__assign||Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var s in e=arguments[r])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t},e=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))(function(s,i){function o(t){try{c(n.next(t))}catch(t){i(t)}}function u(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){t.done?s(t.value):new r(function(e){e(t.value)}).then(o,u)}c((n=n.apply(t,e||[])).next())})},r=this&&this.__generator||function(t,e){var r,n,s,i,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(s=2&i[0]?n.return:i[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,i[1])).done)return s;switch(n=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(s=(s=o.trys).length>0&&s[s.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=e.call(t,o)}catch(t){i=[6,t],n=0}finally{r=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};exports.__esModule=!0;var n=require("./dbjson"),s=function(){return function(){var s=this;this.setDbUrl=function(t){return{dbUrl:t}},this.setFilterParent=function(t){return{filterParent:t}},this.getState=function(){return function(t){return t}},this.setFetching=function(t){return{isFetching:t}},this.setNotification=function(t){return{notification:t}},this.filterResults=function(){return function(t,e){var r=n.reduceFilterGroups(t.filterGroups),s=t.filterTerm,i=t.filterParent,o=n.filterResources(r,t.resources,s,i);return{results:o=n.sortResults(o)}}},this.setDb=function(t){return function(e,r){if(t.resources||!t.references){var s=n.setResources(t.resources,t.references,e.dbUrl),i=n.setFilterGroups(t.references,s,e.filterParent);return r.filterResults(),{resources:s,filterGroups:i}}r.setNotification("Server data missing resources or references")}},this.getJson=function(t){return function(n,i){return e(s,void 0,void 0,function(){var e,n,s;return r(this,function(r){switch(r.label){case 0:i.setDbUrl(t),i.setFetching(!0),i.setNotification(""),r.label=1;case 1:return r.trys.push([1,4,,5]),[4,fetch(t)];case 2:if(200!==(e=r.sent()).status)throw Error(e.statusText);return[4,e.json()];case 3:return n=r.sent(),i.setDb(n),i.filterResults(),[3,5];case 4:throw s=r.sent(),i.setNotification("Error: "+s.message),new Error(s.message);case 5:return i.setFetching(!1),[2]}})})}},this.setFilterTerm=function(t){return{filterTerm:t}},this.setFilterChoice=function(){return function(e){return{filterGroups:t({},e.filterGroups)}}}}}();exports.default=s;
},{"./dbjson":32}],20:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=require("hyperapp");exports.default=function(e){var r=e.actions;return t.h("p",null,t.h("button",{class:"button is-primary",onclick:function(){return console.log("State:",r.getState())}},"Dump State"))};
},{"hyperapp":10}],21:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var i=require("hyperapp");exports.default=function(t){var r=t.notification;if(r)return i.h("div",{class:"notification is-primary"},"Notification: ",r)};
},{"hyperapp":10}],22:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var a=require("hyperapp");exports.default=function(){return a.h("div",{class:"kbb-pagination"},a.h("nav",{class:"pagination",role:"navigation","aria-label":"pagination"},a.h("a",{class:"pagination-previous"},"Previous"),a.h("a",{class:"pagination-next"},"Next page"),a.h("ul",{class:"pagination-list"},a.h("li",null,a.h("a",{class:"pagination-link","aria-label":"Goto page 1"},"1")),a.h("li",null,a.h("span",{class:"pagination-ellipsis"},"…")),a.h("li",null,a.h("a",{class:"pagination-link","aria-label":"Goto page 45"},"45")),a.h("li",null,a.h("a",{class:"pagination-link is-current","aria-label":"Page 46","aria-current":"page"},"46")),a.h("li",null,a.h("a",{class:"pagination-link","aria-label":"Goto page 47"},"47")),a.h("li",null,a.h("span",{class:"pagination-ellipsis"},"…")),a.h("li",null,a.h("a",{class:"pagination-link","aria-label":"Goto page 86"},"86")))))};
},{"hyperapp":10}],59:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(r){var s=r.href,t=r.src,i=r.title;return e.h("a",{class:"level-item kbb-fl-author",href:s},e.h("figure",{class:"image is-rounded is-24x24",style:"margin: 0"},t&&e.h("img",{src:t,height:"24",width:"24"})),e.h("span",null,i))};
},{"hyperapp":10}],60:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var s=require("hyperapp");exports.default=function(a){var e=a.duration;if(e)return s.h("span",{class:"kbb-fl-duration level-item"},s.h("span",{class:"icon"},s.h("i",{class:"fas fa-video"})),s.h("span",null,e))};
},{"hyperapp":10}],71:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(r){var a=r.href,s=r.label;return e.h("span",{class:"tag is-rounded"},e.h("a",{href:a},s))};
},{"hyperapp":10}],61:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var r=require("hyperapp"),t=e(require("./Reference"));exports.default=function(e){var u=e.values;return r.h("div",{class:"tags"},u.map(function(e){return r.h(t.default,{key:e.href,href:e.href,label:e.label})}))};
},{"hyperapp":10,"./Reference":71}],62:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var o=require("hyperapp"),r="https://cdn.worldvectorlogo.com/logos/python-5.svg";exports.default=function(e){var s=e.logo;return o.h("figure",{class:"image is-64x64 }"},o.h("img",{src:s||r}))};
},{"hyperapp":10}],16:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var r=require("hyperapp"),l=e(require("./Author")),t=e(require("./Duration")),a=e(require("./References")),s=e(require("./TechLogo"));exports.default=function(e){var i=e.resource,u=i.references.map(function(e){return{key:e.docname,href:e.href,label:e.label}}),h=i.primary_reference;return r.h("div",{class:"kbb-fl-result box"},r.h("article",{class:"media"},r.h("div",{class:"media-left"},r.h(s.default,{logo:h?h.logo:void 0})),r.h("div",{class:"media-content"},r.h("div",{class:"content"},r.h("p",null,r.h("a",{href:i.href},r.h("strong",null,i.title)),r.h("br",null),r.h("span",null,i.excerpt))),r.h("nav",{class:"level is-mobile"},r.h("div",{class:"level-left"},i.author&&r.h(l.default,{href:i.author.href,src:i.author.thumbnailUrl,title:i.author.title}),r.h("span",{class:"level-item"},r.h(a.default,{values:u}))),r.h("div",{class:"level-right is-size-7 has-text-grey"},i.props.duration&&r.h(t.default,{duration:i.props.duration}),r.h("span",{class:"level-item"},i.props.published))))))};
},{"hyperapp":10,"./Author":59,"./Duration":60,"./References":61,"./TechLogo":62}],23:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var r=require("hyperapp"),u=e(require("./Result"));exports.default=function(e){var t=e.values;if(t)return r.h("div",null,t&&Object.values(t).map(function(e){return r.h(u.default,{resource:e})}))};
},{"hyperapp":10,"./Result":16}],24:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var s=require("hyperapp");exports.default=function(e){var t=e.actions;return s.h("div",{class:"field"},s.h("p",{class:"control is-expanded has-icons-left"},s.h("input",{class:"input",type:"text",placeholder:"Filter listing...",autoFocus:!0,onkeyup:function(s){var e=s.target;t.setFilterTerm(e.value),t.filterResults()}}),s.h("span",{class:"icon is-small is-left"},s.h("i",{class:"fas fa-search"}))))};
},{"hyperapp":10}],44:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(c){var t=c.choices,s=c.actions;return e.h("div",null,Object.values(t).map(function(c){return e.h("div",{class:"control"},e.h("label",{class:"checkbox is-horizontal"},e.h("input",{type:"checkbox",name:c.value,checked:c.checked,oninput:function(e){var t=e.target;c.checked=t.checked,s.setFilterChoice(),s.filterResults()}}),e.h("span",{class:"kbb-label is-size-7"},c.label," (",c.count,")")))}))};
},{"hyperapp":10}],45:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(a){var t=a.choices,l=a.actions;return e.h("div",null,Object.values(t).map(function(a){return e.h("div",{class:"control"},e.h("label",{class:"radio is-horizontal"},e.h("input",{type:"radio",value:a.value,oninput:function(e){var t=e.target;a.checked=t.checked,l.setFilterChoice()}}),e.h("span",{class:"kbb-label"},a.label)))}))};
},{"hyperapp":10}],46:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("hyperapp");exports.default=function(r){r.choices,r.actions;return e.h("div",null,"sc")};
},{"hyperapp":10}],25:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var c=require("hyperapp"),r=e(require("./SidebarCheckbox")),t=e(require("./SidebarRadio")),i=e(require("./SidebarSelect"));exports.default=function(e){var s=e.filterGroups,u=e.actions;return c.h("div",null,Object.values(s).map(function(e){if(Object.keys(e.choices).length)return c.h("div",{class:"kbb-sidebargroup"},c.h("p",{class:"menu-label"},e.label," ",e.choices),function(){switch(e.control){case"checkbox":return c.h(r.default,{choices:e.choices,actions:u});case"radio":return c.h(t.default,{choices:e.choices,actions:u});case"select":return c.h(i.default,{choices:e.choices,actions:u});default:return null}}())}))};
},{"hyperapp":10,"./SidebarCheckbox":44,"./SidebarRadio":45,"./SidebarSelect":46}],33:[function(require,module,exports) {
"use strict";function t(t){for(var e="";t.parentNode;){if(e=(t=t.parentNode).getAttribute("data-filteredlistingurl"))return e;if("body"===t.tagName.toLowerCase())return}}function e(t){for(var e="";t.parentNode;){if(e=(t=t.parentNode).getAttribute("data-filteredlisting-parent"))return e;if("body"===t.tagName.toLowerCase())return}}exports.__esModule=!0,exports.getDbUrl=t,exports.getFilterParent=e;
},{}],6:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var i=require("hyperapp"),t=e(require("./Dumpstate")),r=e(require("./Notification")),n=e(require("./Pagination")),s=e(require("./Results")),a=e(require("./Searchbox")),u=e(require("./Sidebar")),o=require("./utils"),l=function(e,i){var t=o.getDbUrl(e);t&&i.getJson(t);var r=o.getFilterParent(e);r&&"none"!==r&&i.setFilterParent(r)};exports.default=function(e,o){return i.h("div",{class:"kbb-fl container",oncreate:function(e){return l(e,o)}},i.h("div",{class:"columns is-centered"},i.h("div",{class:"column is-half"},i.h(r.default,{notification:e.notification}),i.h(a.default,{actions:o}),e.notification&&i.h("div",{class:"notification is-warning"},e.notification))),i.h("div",{class:"columns"},i.h("div",{class:"column"},i.h(u.default,{filterGroups:e.filterGroups,actions:o})),i.h("div",{class:"column is-four-fifths"},i.h(s.default,{values:e.results}),i.h(n.default,null),i.h(t.default,{actions:o}))))};
},{"hyperapp":10,"./Dumpstate":20,"./Notification":21,"./Pagination":22,"./Results":23,"./Searchbox":24,"./Sidebar":25,"./utils":33}],13:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t={isFetching:!1,notification:"Initial State",filterGroups:{},filterTerm:"",resources:{},results:[],resultInfo:{sortKey:"published",batchSize:10,start:0}};exports.default=t;
},{}],1:[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var t=require("hyperapp");require("./scss/kaybee_bulma.scss"),require("./scss/pygments.css");var r=e(require("./filteredlisting/Actions")),s=e(require("./filteredlisting/Container")),i=e(require("./filteredlisting/State"));t.app(i.default,new r.default,s.default,document.getElementById("kbb-fl"));
},{"hyperapp":10,"./scss/kaybee_bulma.scss":3,"./scss/pygments.css":3,"./filteredlisting/Actions":12,"./filteredlisting/Container":6,"./filteredlisting/State":13}]},{},[1], null)
//# sourceMappingURL=/kaybee_bulma.map