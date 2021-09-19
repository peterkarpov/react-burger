(this["webpackJsonpreact-burger"]=this["webpackJsonpreact-burger"]||[]).push([[0],{138:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(25),i=a.n(r),s=(a(65),a(3)),o=a(11),d=a(12),l=a(15),p=a(14),u=a(13),m=a(4),b=a(9),g=a.n(b),_=a(0),h={width:"calc(var(--offset-base-size) * 320)",marginLeft:"auto",marginRight:"auto"};var j=function(){return Object(_.jsx)("header",{className:g.a["app-header"]+" pt-4 pb-4",children:Object(_.jsxs)("div",{className:g.a.wrapper,style:h,children:[Object(_.jsxs)("ul",{className:g.a["navigation-bar"],children:[Object(_.jsxs)("li",{className:g.a["navigation-link"]+" p-5",children:[Object(_.jsx)(m.BurgerIcon,{type:"primary"}),Object(_.jsx)("span",{className:g.a["navigation-text"]+" text text_type_main-default ml-2",children:"\u041a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440"})]}),Object(_.jsxs)("li",{className:g.a["navigation-link"]+" p-5",children:[Object(_.jsx)(m.ListIcon,{type:"secondary"}),Object(_.jsx)("span",{className:g.a["navigation-text"]+" text text_type_main-default text_color_inactive ml-2",children:"\u041b\u0435\u043d\u0442\u0430 \u0437\u0430\u043a\u0430\u0437\u043e\u0432"})]})]}),Object(_.jsx)("div",{className:g.a["logo-wrapper"],children:Object(_.jsx)(m.Logo,{})}),Object(_.jsx)("ul",{className:g.a["navigation-bar"],children:Object(_.jsxs)("li",{className:g.a["navigation-link"]+" p-5",children:[Object(_.jsx)(m.ProfileIcon,{type:"secondary"}),Object(_.jsx)("span",{className:g.a["navigation-text"]+" text text_type_main-default text_color_inactive ml-2",children:"\u041b\u0438\u0447\u043d\u044b\u0439 \u043a\u0430\u0431\u0438\u043d\u0435\u0442"})]})})]})})},x=a(8),y=a.n(x),f=a(26),O=a.n(f);var v=function(e){return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)("div",{className:y.a["counter-wrapper"],children:e.count>0?Object(_.jsx)(m.Counter,{count:e.count,size:"default"}):null}),Object(_.jsx)("div",{className:"".concat(y.a.illustration," pl-4 pr-4"),children:Object(_.jsx)("img",{alt:"illustration",src:e.item.image})}),Object(_.jsxs)("div",{className:"".concat(y.a["price-block"]," pt-1 pb-1"),children:[Object(_.jsx)("span",{className:"".concat(y.a.price," text text_type_digits-medium"),children:e.item.price}),Object(_.jsx)(m.CurrencyIcon,{type:"primary"})]}),Object(_.jsx)("div",{className:"".concat(y.a["item-name"]," text text_type_main-medium"),children:e.item.name})]})},I=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={current:"",currentItems:[]},e.setCurrent=function(t){e.setState(Object(s.a)(Object(s.a)({},e.state),{},{current:t,currentItems:Array.from(e.props.data).filter((function(t,a,n){return t.type===e.state.current}))}))},e.getUnicleType=function(e){return Array.from(e).map((function(e,t,a){return e.type})).filter((function(e,t,a){return a.indexOf(e)===t}))},e.getItemsByType=function(e,t){return t.filter((function(t){return t.type===e}))},e.getSelectedCountById=function(t){return Array.from(e.props.selectedIngredientsId).filter((function(e){return e===t})).length},e.getQuantityCountById=function(t){var a;return(null===(a=e.props.quantityData.find((function(e){return e.id===t})))||void 0===a?void 0:a.quantity)||0},e.getTitleByType=function(e){var t="";return"bun"===e?t="\u0411\u0443\u043b\u043a\u0438":"sauce"===e?t="\u0421\u043e\u0443\u0441\u044b":"main"===e&&(t="\u041d\u0430\u0447\u0438\u043d\u043a\u0430"),t},e.onClickOnItem=function(t){e.props.addIngredient(t._id)},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return Object(_.jsxs)("div",{className:y.a["burger-ingredients"],children:[Object(_.jsx)("div",{className:"text text_type_main-large mt-10 mb-5",children:"\u0421\u043e\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u0443\u0440\u0433\u0435\u0440"}),Object(_.jsx)("div",{className:y.a["tab-bar"]+" mt-5 mb-10",children:["bun","sauce","main"].map((function(t,a){return Object(_.jsx)(c.a.Fragment,{children:Object(_.jsx)(m.Tab,{value:t,active:e.state.current===t,onClick:e.setCurrent,children:e.getTitleByType(t)})},t)}))}),Object(_.jsx)("ul",{className:"".concat(y.a["tab-elements"]," ").concat(O.a.scrollable),children:this.getUnicleType(this.state.currentItems).map((function(t,a){var n=e.getItemsByType(t,e.state.currentItems);return Object(_.jsxs)("li",{children:[Object(_.jsx)("div",{className:"text text_type_main-medium",children:e.getTitleByType(t)}),Object(_.jsx)("ul",{className:"".concat(y.a["ingredients-list"]," pt-6 pl-4 pr-4 pb-10"),children:n.map((function(t,a){var n=e.getSelectedCountById(t._id),c=e.getQuantityCountById(t._id);return Object(_.jsx)("li",{className:y.a["list-item"],onClick:function(){return e.onClickOnItem(t)},children:Object(_.jsx)(v,{item:t,quantity:c,count:n,onClickOnItem:e.onClickOnItem})},t._id)}))})]},t)}))})]})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return""!==t.current?t.currentItems=Array.from(e.data).filter((function(e,a,n){return e.type===t.current})):t.currentItems=e.data,t}}]),a}(c.a.Component),N=a(16),k=a.n(N);var C=function(e){var t=Array.from(e.selectedIngredientsId).map((function(t){return e.data.find((function(e){return e._id===t}))})),a=t.filter((function(e){return"bun"===e.type})).filter((function(e,t,a){return a.indexOf(e)===t})),n=t.filter((function(e){return"bun"!==e.type})),c=Array.from(t).map((function(e){return e.price})).reduce((function(e,t){return e+t}),0),r=function(t){e.removeIngredient(t)};return Object(_.jsxs)("div",{className:k.a["burger-constructor"]+" pt-25 pl-4",children:[Object(_.jsxs)("ul",{className:k.a.top+" pr-4",children:[a.map((function(e,t){return Object(_.jsxs)("li",{children:[a.length>1?Object(_.jsx)(m.DragIcon,{type:"primary"}):null,Object(_.jsx)(m.ConstructorElement,{type:"top",isLocked:1===a.length,text:e.name,price:e.price,thumbnail:e.image,handleClose:function(){return r(e._id)}})]},"".concat(e._id,"_").concat(t))})),0===a.length?Object(_.jsx)("li",{className:"text text_type_main-default",style:{justifyContent:"center"},children:"\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043d\u0430\u0448\u0438 \u0431\u0443\u043b\u043a\u0438"}):null]}),Object(_.jsxs)("ul",{className:O.a.scrollable+" pr-2 pt-4 pb-4",children:[n.map((function(e,t){return Object(_.jsxs)("li",{children:[Object(_.jsx)(m.DragIcon,{type:"primary"}),Object(_.jsx)(m.ConstructorElement,{isLocked:!1,text:e.name,price:e.price,thumbnail:e.image,handleClose:function(){return r(e._id)}})]},"".concat(e._id,"_").concat(t))})),0===n.length?Object(_.jsx)("li",{className:"text text_type_main-default",style:{justifyContent:"center"},children:"\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043d\u0430\u0447\u0438\u043d\u043a\u0443 \u0438\u043b\u0438 \u0441\u043e\u0443\u0441"}):null]}),Object(_.jsx)("ul",{className:k.a.bottom+" pr-4",children:a.map((function(e,t){return Object(_.jsxs)("li",{children:[a.length>1?Object(_.jsx)(m.DragIcon,{type:"primary"}):null,Object(_.jsx)(m.ConstructorElement,{type:"bottom",isLocked:1===a.length,text:e.name,price:e.price,thumbnail:e.image,handleClose:function(){return r(e._id)}})]},"".concat(e._id,"_").concat(t))}))}),0!==a.length?Object(_.jsxs)("div",{className:k.a["checkout-block"]+" mt-10 pr-4",children:[Object(_.jsx)("div",{className:k.a.total,children:Object(_.jsx)("span",{className:"text text_type_digits-medium",children:c})}),Object(_.jsx)("div",{className:k.a["currency-icon-wrapper"]+" ml-2",children:Object(_.jsx)(m.CurrencyIcon,{type:"primary",onClick:void 0})}),Object(_.jsx)("div",{className:k.a["button-wrapper"]+" ml-10",children:Object(_.jsx)(m.Button,{type:"primary",size:"large",onClick:function(){var t={orderNumber:Math.floor(999999*Math.random()),selectedIngredientsId:e.selectedIngredientsId,total:c};e.completeCheckout(t)},children:"\u041e\u0444\u043e\u0440\u043c\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437"})})]}):null]})},w=a(6),B=a.n(w);var D=function(e){return Object(_.jsxs)("div",{className:B.a["ingredient-info"],children:[Object(_.jsx)("div",{className:B.a["icon-wrapper"]+" mb-4",children:Object(_.jsx)("img",{src:e.element.image_large,alt:"icon-wrapper-img"})}),Object(_.jsx)("div",{className:B.a.title+" text text_type_main-medium mt-4 mb-8",children:e.element.name}),Object(_.jsxs)("ul",{className:B.a["composition-list"]+" text_color_inactive",children:[Object(_.jsxs)("li",{className:B.a["composition-item"],children:[Object(_.jsx)("div",{className:B.a.title+" text text_type_main-medium",children:"\u041a\u0430\u043b\u043e\u0440\u0438\u0438, \u043a\u043a\u0430\u043b"}),Object(_.jsx)("div",{className:B.a.value+" text text_type_digits-default mt-2",children:e.element.calories})]}),Object(_.jsxs)("li",{className:B.a["composition-item"],children:[Object(_.jsx)("div",{className:B.a.title+" text text_type_main-medium",children:"\u0411\u0435\u043b\u043a\u0438, \u0433"}),Object(_.jsx)("div",{className:B.a.value+" text text_type_digits-default mt-2",children:e.element.proteins})]}),Object(_.jsxs)("li",{className:B.a["composition-item"],children:[Object(_.jsx)("div",{className:B.a.title+" text text_type_main-medium",children:"\u0416\u0438\u0440\u044b, \u0433"}),Object(_.jsx)("div",{className:B.a.value+" text text_type_digits-default mt-2",children:e.element.fat})]}),Object(_.jsxs)("li",{className:B.a["composition-item"],children:[Object(_.jsx)("div",{className:B.a.title+" text text_type_main-medium",children:"\u0423\u0433\u043b\u0435\u0432\u043e\u0434\u044b, \u0433"}),Object(_.jsx)("div",{className:B.a.value+" text text_type_digits-default mt-2",children:e.element.carbohydrates})]})]})]})},P=a(23),S=a(60),A=a.n(S);var F=function(e){return Object(_.jsx)("div",{className:A.a["modal-background"],onClick:e.onClick,children:e.children})},M=a(20),T=a.n(M),q=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).closeModal=function(e){e.stopPropagation(),("Escape"===e.code||e.currentTarget.className===e.target.className||"".concat(e.currentTarget.className).includes(T.a["close-icon-wrapper"]))&&(n.props.onCloseModalCallback(),n.setState(Object(s.a)(Object(s.a)({},n.state),{},{enable:!1})))},n.state={enable:!0},n.closeModal=n.closeModal.bind(Object(l.a)(n)),n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.closeModal)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.closeModal)}},{key:"render",value:function(){var e=document.getElementById("for-modal");return i.a.createPortal(this.state.enable?Object(_.jsx)(F,{onClick:this.closeModal,children:Object(_.jsxs)("div",{className:"".concat(T.a["modal-body"]," pt-10 pl-10 pr-10 pb-15"),children:[Object(_.jsxs)("div",{className:T.a["modal-header"],children:[Object(_.jsx)("span",{className:T.a["modal-title"]+" text text_type_main-large",children:this.props.title}),Object(_.jsx)("div",{className:T.a["close-icon-wrapper"],onClick:this.closeModal,children:Object(_.jsx)(m.CloseIcon,{type:"primary"})})]}),this.props.children]})}):null,e)}}]),a}(c.a.Component),L=a(17),E=a.n(L),H=a.p+"static/media/done.dc2f52b0.png",z=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e,t=null===(e=this.props.orderInfo)||void 0===e?void 0:e.orderNumber;return Object(_.jsxs)("div",{className:E.a["checkout-info"],children:[Object(_.jsx)("div",{className:E.a["checkout-number"]+"text text_type_digits-large",children:t}),Object(_.jsx)("div",{className:E.a["checkout-title"]+" text text_type_main-medium mt-8",children:"\u0418\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u0437\u0430\u043a\u0430\u0437\u0430"}),Object(_.jsx)("div",{className:E.a["checkout-icon-wrapper"]+" mt-15 mb-15",children:Object(_.jsx)("img",{src:H,alt:""})}),Object(_.jsx)("div",{className:E.a["checkout-status"]+" text text_type_main-medium mb-2",children:"\u0412\u0430\u0448 \u0437\u0430\u043a\u0430\u0437 \u043d\u0430\u0447\u0430\u043b\u0438 \u0433\u043e\u0442\u043e\u0432\u0438\u0442\u044c"}),Object(_.jsx)("div",{className:E.a["checkout-text"]+" text text_type_main-medium text_color_inactive mb-15",children:"\u0414\u043e\u0436\u0434\u0438\u0442\u0435\u0441\u044c \u0433\u043e\u0442\u043e\u0432\u043d\u043e\u0441\u0442\u0438 \u043d\u0430 \u043e\u0440\u0431\u0438\u0442\u0430\u043b\u044c\u043d\u043e\u0439 \u0441\u0442\u0430\u043d\u0446\u0438\u0438"})]})}}]),a}(c.a.Component),Q=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).addIngredient=function(e){var t=n.state.quantityData.map((function(t){return t.id===e&&(t.quantity=t.quantity-1),t})),a=Array.from(n.state.selectedIngredientsId),c=n.state.data.find((function(t){return t._id===e}));"bun"===(null===c||void 0===c?void 0:c.type)?((a=a.filter((function(e,t,a){var c;return"bun"!==(null===(c=n.state.data.find((function(t){return t._id===e})))||void 0===c?void 0:c.type)}))).push(e),a.push(e)):a.push(e),n.setState(Object(s.a)(Object(s.a)({},n.state),{},{selectedIngredientsId:a,quantityData:t,idForPopup:e}))},n.removeIngredient=function(e){var t=n.state.quantityData.map((function(t){return t.id===e&&(t.quantity=t.quantity+1),t})),a=n.state.selectedIngredientsId,c=n.state.selectedIngredientsId.indexOf(e);a.splice(c,1),n.setState(Object(s.a)(Object(s.a)({},n.state),{},{selectedIngredientsId:a,quantityData:t}))},n.setIdForPopup=function(e){n.setState(Object(s.a)(Object(s.a)({},n.state),{},{idForPopup:e}))},n.getIngredientById=function(e){return n.state.data.find((function(t){return t._id===e}))},n.clearIdForPopup=function(){n.setState(Object(s.a)(Object(s.a)({},n.state),{},{idForPopup:null}))},n.setOrderInfo=function(e){n.setState(Object(s.a)(Object(s.a)({},n.state),{},{orderInfo:e}))},n.clearOrderInfo=function(){var e=[],t=n.state.data.filter((function(e){return"bun"===e.type}))[0]._id;e.push(t),e.push(t),n.setState(Object(s.a)(Object(s.a)({},n.state),{},{orderInfo:null,selectedIngredientsId:e}))},n.mainWrapperStyle={display:"flex",gap:"calc(var(--offset-base-size) * 10)",justifyContent:"space-evenly",width:"calc(var(--offset-base-size) * 320)",marginLeft:"auto",marginRight:"auto"},n.state={data:P,idForPopup:null,selectedIngredientsId:function(){var e=Array.from([]),t=Array.from(P).filter((function(e){return"bun"===e.type}))[0]._id;return e.push(t),e.push(t),e}(),quantityData:Array.from(P).map((function(e){return{id:e._id,quantity:Math.floor(10*Math.random())}})),orderInfo:null},n.setIdForPopup=n.setIdForPopup.bind(Object(l.a)(n)),n.addIngredient=n.addIngredient.bind(Object(l.a)(n)),n.removeIngredient=n.removeIngredient.bind(Object(l.a)(n)),n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://norma.nomoreparties.space/api/ingredients").then((function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430 ".concat(e.status))})).then((function(t){var a=Array.from([]);e.setState(Object(s.a)(Object(s.a)({},e.state),{},{data:Array.from(t.data),selectedIngredientsId:a}))}),(function(t){console.log(t),e.setState(Object(s.a)(Object(s.a)({},e.state),{},{data:P}))})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(j,{}),Object(_.jsx)("section",{className:"main",children:Object(_.jsxs)("div",{className:"wrapper",style:this.mainWrapperStyle,children:[Object(_.jsx)(I,{data:this.state.data,selectedIngredientsId:this.state.selectedIngredientsId,setIdForPopup:this.setIdForPopup,addIngredient:this.addIngredient,quantityData:this.state.quantityData}),Object(_.jsx)(C,{data:this.state.data,selectedIngredientsId:this.state.selectedIngredientsId,removeIngredient:this.removeIngredient,completeCheckout:this.setOrderInfo})]})}),null!=this.state.orderInfo?Object(_.jsx)(q,{title:null,onCloseModalCallback:this.clearOrderInfo,children:Object(_.jsx)(z,{orderInfo:this.state.orderInfo})}):null,null!=this.state.idForPopup?Object(_.jsx)(q,{title:"\u0414\u0435\u0442\u0430\u043b\u0438 \u0438\u043d\u0433\u0440\u0438\u0434\u0438\u0435\u043d\u0442\u0430",onCloseModalCallback:this.clearIdForPopup,children:Object(_.jsx)(D,{element:this.getIngredientById(this.state.idForPopup)})}):null]})}}]),a}(c.a.Component),U=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,139)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;a(e),n(e),c(e),r(e),i(e)}))};i.a.render(Object(_.jsx)(c.a.StrictMode,{children:Object(_.jsx)(Q,{})}),document.getElementById("root")),U()},16:function(e,t,a){e.exports={"burger-constructor":"BurgerConstructor_burger-constructor__3rKtC",top:"BurgerConstructor_top__hj2qs",bottom:"BurgerConstructor_bottom__1NNuQ","checkout-block":"BurgerConstructor_checkout-block__3f2fs",total:"BurgerConstructor_total__bL-Pa","currency-icon-wrapper":"BurgerConstructor_currency-icon-wrapper__2IQb3"}},17:function(e,t,a){e.exports={"checkout-info":"OrderDetails_checkout-info__1mI_9","checkout-number":"OrderDetails_checkout-number__1gR5y","checkout-title":"OrderDetails_checkout-title__15Klg","checkout-icon-wrapper":"OrderDetails_checkout-icon-wrapper__3gAlt","checkout-status":"OrderDetails_checkout-status__2lL88","checkout-text":"OrderDetails_checkout-text__3IS3s"}},20:function(e,t,a){e.exports={"modal-body":"Modal_modal-body__lQTj_","modal-header":"Modal_modal-header__2Oi5e","close-icon-wrapper":"Modal_close-icon-wrapper__2lzDA"}},23:function(e){e.exports=JSON.parse('[{"_id":"60666c42cc7b410027a1a9b1","name":"\u041a\u0440\u0430\u0442\u043e\u0440\u043d\u0430\u044f \u0431\u0443\u043b\u043a\u0430 N-200i","type":"bun","proteins":80,"fat":24,"carbohydrates":53,"calories":420,"price":1255,"image":"https://code.s3.yandex.net/react/code/bun-02.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9b5","name":"\u0413\u043e\u0432\u044f\u0436\u0438\u0439 \u043c\u0435\u0442\u0435\u043e\u0440\u0438\u0442 (\u043e\u0442\u0431\u0438\u0432\u043d\u0430\u044f)","type":"main","proteins":800,"fat":800,"carbohydrates":300,"calories":2674,"price":3000,"image":"https://code.s3.yandex.net/react/code/meat-04.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9b6","name":"\u0411\u0438\u043e\u043a\u043e\u0442\u043b\u0435\u0442\u0430 \u0438\u0437 \u043c\u0430\u0440\u0441\u0438\u0430\u043d\u0441\u043a\u043e\u0439 \u041c\u0430\u0433\u043d\u043e\u043b\u0438\u0438","type":"main","proteins":420,"fat":142,"carbohydrates":242,"calories":4242,"price":424,"image":"https://code.s3.yandex.net/react/code/meat-01.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9b7","name":"\u0421\u043e\u0443\u0441 Spicy-X","type":"sauce","proteins":30,"fat":20,"carbohydrates":40,"calories":30,"price":90,"image":"https://code.s3.yandex.net/react/code/sauce-02.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9b4","name":"\u041c\u044f\u0441\u043e \u0431\u0435\u0441\u0441\u043c\u0435\u0440\u0442\u043d\u044b\u0445 \u043c\u043e\u043b\u043b\u044e\u0441\u043a\u043e\u0432 Protostomia","type":"main","proteins":433,"fat":244,"carbohydrates":33,"calories":420,"price":1337,"image":"https://code.s3.yandex.net/react/code/meat-02.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9b9","name":"\u0421\u043e\u0443\u0441 \u0442\u0440\u0430\u0434\u0438\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u0433\u0430\u043b\u0430\u043a\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439","type":"sauce","proteins":42,"fat":24,"carbohydrates":42,"calories":99,"price":15,"image":"https://code.s3.yandex.net/react/code/sauce-03.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9b8","name":"\u0421\u043e\u0443\u0441 \u0444\u0438\u0440\u043c\u0435\u043d\u043d\u044b\u0439 Space Sauce","type":"sauce","proteins":50,"fat":22,"carbohydrates":11,"calories":14,"price":80,"image":"https://code.s3.yandex.net/react/code/sauce-04.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9bc","name":"\u041f\u043b\u043e\u0434\u044b \u0424\u0430\u043b\u043b\u0435\u043d\u0438\u0430\u043d\u0441\u043a\u043e\u0433\u043e \u0434\u0435\u0440\u0435\u0432\u0430","type":"main","proteins":20,"fat":5,"carbohydrates":55,"calories":77,"price":874,"image":"https://code.s3.yandex.net/react/code/sp_1.png","image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9bb","name":"\u0425\u0440\u0443\u0441\u0442\u044f\u0449\u0438\u0435 \u043c\u0438\u043d\u0435\u0440\u0430\u043b\u044c\u043d\u044b\u0435 \u043a\u043e\u043b\u044c\u0446\u0430","type":"main","proteins":808,"fat":689,"carbohydrates":609,"calories":986,"price":300,"image":"https://code.s3.yandex.net/react/code/mineral_rings.png","image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png","image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9ba","name":"\u0421\u043e\u0443\u0441 \u0441 \u0448\u0438\u043f\u0430\u043c\u0438 \u0410\u043d\u0442\u0430\u0440\u0438\u0430\u043d\u0441\u043a\u043e\u0433\u043e \u043f\u043b\u043e\u0441\u043a\u043e\u0445\u043e\u0434\u0446\u0430","type":"sauce","proteins":101,"fat":99,"carbohydrates":100,"calories":100,"price":88,"image":"https://code.s3.yandex.net/react/code/sauce-01.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9bd","name":"\u041a\u0440\u0438\u0441\u0442\u0430\u043b\u043b\u044b \u043c\u0430\u0440\u0441\u0438\u0430\u043d\u0441\u043a\u0438\u0445 \u0430\u043b\u044c\u0444\u0430-\u0441\u0430\u0445\u0430\u0440\u0438\u0434\u043e\u0432","type":"main","proteins":234,"fat":432,"carbohydrates":111,"calories":189,"price":762,"image":"https://code.s3.yandex.net/react/code/core.png","image_mobile":"https://code.s3.yandex.net/react/code/core-mobile.png","image_large":"https://code.s3.yandex.net/react/code/core-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9be","name":"\u041c\u0438\u043d\u0438-\u0441\u0430\u043b\u0430\u0442 \u042d\u043a\u0437\u043e-\u041f\u043b\u0430\u043d\u0442\u0430\u0433\u043e","type":"main","proteins":1,"fat":2,"carbohydrates":3,"calories":6,"price":4400,"image":"https://code.s3.yandex.net/react/code/salad.png","image_mobile":"https://code.s3.yandex.net/react/code/salad-mobile.png","image_large":"https://code.s3.yandex.net/react/code/salad-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9b3","name":"\u0424\u0438\u043b\u0435 \u041b\u044e\u043c\u0438\u043d\u0435\u0441\u0446\u0435\u043d\u0442\u043d\u043e\u0433\u043e \u0442\u0435\u0442\u0440\u0430\u043e\u0434\u043e\u043d\u0442\u0438\u043c\u0444\u043e\u0440\u043c\u0430","type":"main","proteins":44,"fat":26,"carbohydrates":85,"calories":643,"price":988,"image":"https://code.s3.yandex.net/react/code/meat-03.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9bf","name":"\u0421\u044b\u0440 \u0441 \u0430\u0441\u0442\u0435\u0440\u043e\u0438\u0434\u043d\u043e\u0439 \u043f\u043b\u0435\u0441\u0435\u043d\u044c\u044e","type":"main","proteins":84,"fat":48,"carbohydrates":420,"calories":3377,"price":4142,"image":"https://code.s3.yandex.net/react/code/cheese.png","image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png","image_large":"https://code.s3.yandex.net/react/code/cheese-large.png","__v":0},{"_id":"60666c42cc7b410027a1a9b2","name":"\u0424\u043b\u044e\u043e\u0440\u0435\u0441\u0446\u0435\u043d\u0442\u043d\u0430\u044f \u0431\u0443\u043b\u043a\u0430 R2-D3","type":"bun","proteins":44,"fat":26,"carbohydrates":85,"calories":643,"price":988,"image":"https://code.s3.yandex.net/react/code/bun-01.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png","__v":0}]')},26:function(e,t,a){e.exports={scrollable:"scrollable_scrollable__1gWpr"}},6:function(e,t,a){e.exports={"ingredient-info":"IngredientDetails_ingredient-info__6loXl","modal-header":"IngredientDetails_modal-header__3PDwV","close-icon-wrapper":"IngredientDetails_close-icon-wrapper__13OnE","icon-wrapper":"IngredientDetails_icon-wrapper__1D8lD","composition-list":"IngredientDetails_composition-list__1xeOY","composition-item":"IngredientDetails_composition-item__20BeZ",title:"IngredientDetails_title__18oGt",value:"IngredientDetails_value__2tnGs"}},60:function(e,t,a){e.exports={"modal-background":"ModalOverlay_modal-background__qk80X"}},65:function(e,t,a){},8:function(e,t,a){e.exports={"burger-ingredients":"BurgerIngredients_burger-ingredients__1h0mI","tab-bar":"BurgerIngredients_tab-bar__3k5WR","tab-elements":"BurgerIngredients_tab-elements__2wyZB","ingredients-list":"BurgerIngredients_ingredients-list__34aTE","list-item":"BurgerIngredients_list-item__3kXX2","counter-wrapper":"BurgerIngredients_counter-wrapper__2yOQI","counter-wrapper-left":"BurgerIngredients_counter-wrapper-left__2mKUi",illustration:"BurgerIngredients_illustration__3lBLO","price-block":"BurgerIngredients_price-block__2tXN0",price:"BurgerIngredients_price__1P54H","item-name":"BurgerIngredients_item-name__1xCT1"}},9:function(e,t,a){e.exports={"app-header":"AppHeader_app-header__dUb6i",wrapper:"AppHeader_wrapper__1q47x","logo-wrapper":"AppHeader_logo-wrapper__vhf3S","navigation-bar":"AppHeader_navigation-bar__1ipd5","navigation-link":"AppHeader_navigation-link__2YojT","navigation-text":"AppHeader_navigation-text__3cjTU"}}},[[138,1,2]]]);
//# sourceMappingURL=main.013850ed.chunk.js.map