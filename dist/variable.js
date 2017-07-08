define("extensions/variable/util",[],function(){"use strict";function e(e,t,l){var a=document.createElement(e);return t&&(a.className=t),void 0!==l&&(a.innerHTML=l),a}function t(e,t){0===e.childNodes.length?e.appendChild(t):e.replaceChild(t,e.childNodes[0])}function l(t){var l=e("link");l.rel="stylesheet",l.type="text/css",l.href=require.toUrl(t),document.head.appendChild(l)}return{createElement:e,setChild:t,addStyleSheet:l}}),define("extensions/variable/properties",["./util","qlik"],function(e,t){"use strict";var l,a={qVariableListDef:{qType:"variable",qData:{qComment:"/qComment",qDefinition:"/qDefinition",qNumberPresentation:"/qNumberPresentation"}}},n=t.currApp().createGenericObject(a,function(e){return l=e.qVariableList.qItems.map(function(e){return{value:e.qName,label:e.qName}})});return{initialProperties:{variableValue:{},variableName:"",render:"f",alternatives:[],min:0,max:100,step:1,style:"qlik",width:"",customwidth:""},definition:{type:"items",component:"accordion",items:{settings:{uses:"settings",items:{variable:{type:"items",label:"Variable",items:{name:{ref:"variableName",label:"Name",type:"string",component:"dropdown",options:function(){return l||n},change:function(e){e.variableValue=e.variableValue||{},e.variableValue.qStringExpression='="'+e.variableName+'"'}},style:{type:"string",component:"dropdown",label:"Style",ref:"style",options:[{value:"qlik",label:"Qlik"},{value:"bootstrap",label:"Bootstrap"},{value:"material",label:"Material"}]},width:{type:"string",component:"dropdown",label:"Width",ref:"width",options:[{value:"",label:"Default"},{value:"fill",label:"Fill"},{value:"custom",label:"Custom"}]},customwidth:{type:"string",ref:"customwidth",label:"Custom width",expression:"optional",show:function(e){return"custom"===e.width}},render:{type:"string",component:"dropdown",label:"Render as",ref:"render",options:[{value:"b",label:"Button"},{value:"s",label:"Select"},{value:"f",label:"Field"},{value:"l",label:"Slider"}],defaultValue:"f"},vert:{type:"boolean",label:"Vertical",ref:"vert",defaultValue:!1,show:function(e){return"l"===e.render}},alternatives:{type:"array",ref:"alternatives",label:"Alternatives",itemTitleRef:"label",allowAdd:!0,allowRemove:!0,addTranslation:"Add Alternative",items:{value:{type:"string",ref:"value",label:"Value",expression:"optional"},label:{type:"string",ref:"label",label:"Label",expression:"optional"}},show:function(e){return"b"===e.render||"s"===e.render}},min:{ref:"min",label:"Min",type:"number",defaultValue:0,expression:"optional",show:function(e){return"l"===e.render}},max:{ref:"max",label:"Max",type:"number",defaultValue:100,expression:"optional",show:function(e){return"l"===e.render}},step:{ref:"step",label:"Step",type:"number",defaultValue:1,expression:"optional",show:function(e){return"l"===e.render}},rangelabel:{ref:"rangelabel",label:"Slider label",type:"boolean",defaultValue:!1,show:function(e){return"l"===e.render}}}}}}}}}}),define(["qlik","./util","./properties"],function(e,t,l){"use strict";function a(e){return 100*(e.value-e.min)/(e.max-e.min)}function n(e,t,l){switch(e){case"material":case"bootstrap":if(l)return"selected";break;default:switch(t){case"button":return l?"qui-button-selected lui-button lui-button--success":"qui-button lui-button";case"select":return"qui-select lui-select";case"input":return"qui-input lui-input"}}}function i(e){return"l"===e.render?"98%":"custom"===e.width?e.customwidth:"fill"===e.width?"b"!==e.render?"100%":"calc( "+100/e.alternatives.length+"% - 3px)":void 0}function r(e,t){e.label?(t?e.label.style.bottom=a(e)+"%":e.label.style.left=a(e)+"%",e.label.textContent=e.value):e.title=e.value}return t.addStyleSheet("extensions/variable/variable.css"),{initialProperties:l.initialProperties,definition:l.definition,paint:function(l,a){var o=t.createElement("div",a.style||"qlik"),u=i(a),s=this;if(a.vert&&o.classList.add("vert"),"b"===a.render)a.alternatives.forEach(function(l){var i=t.createElement("button",n(a.style,"button",l.value===a.variableValue),l.label);i.onclick=function(){e.currApp(s).variable.setContent(a.variableName,l.value)},i.style.width=u,o.appendChild(i)});else if("s"===a.render){var d=t.createElement("select",n(a.style,"select"));d.style.width=u,a.alternatives.forEach(function(e){var l=t.createElement("option",void 0,e.label);l.value=e.value,l.selected=e.value===a.variableValue,d.appendChild(l)}),d.onchange=function(){e.currApp(s).variable.setContent(a.variableName,this.value)},o.appendChild(d)}else if("l"===a.render){var p=t.createElement("input");if(a.vert?(p.style.width=l.height()+"px",p.style.left="-"+(l.height()-l.width())/2+"px"):p.style.width=u,p.type="range",p.min=a.min||0,p.max=a.max||100,p.step=a.step||1,p.value=a.variableValue,p.onchange=function(){r(this,a.vert),e.currApp(s).variable.setContent(a.variableName,this.value)},p.oninput=function(){r(this,a.vert)},o.appendChild(p),a.rangelabel){var c=t.createElement("div","labelwrap");p.label=t.createElement("div","rangelabel",a.variableValue),c.appendChild(p.label),o.appendChild(c)}r(p,a.vert)}else{var b=t.createElement("input",n(a.style,"input"));b.style.width=u,b.type="text",b.value=a.variableValue,b.onchange=function(){e.currApp(s).variable.setContent(a.variableName,this.value)},o.appendChild(b)}t.setChild(l[0],o)}}});